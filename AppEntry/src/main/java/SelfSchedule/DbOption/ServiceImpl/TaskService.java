package SelfSchedule.DbOption.ServiceImpl;

import SelfSchedule.Common.CachingKeys;
import SelfSchedule.Common.Constants;
import SelfSchedule.Common.Pair;
import SelfSchedule.DbOption.Mapper.*;
import SelfSchedule.DbOption.Service.ITaskService;
import SelfSchedule.Entity.*;
import SelfSchedule.Entity.Enum.*;
import SelfSchedule.Entity.VO.*;
import SelfSchedule.Model.*;
import SelfSchedule.Service.RedisCache;
import SelfSchedule.Utils.DateUtil;
import SelfSchedule.Utils.ObjectUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class TaskService extends ServiceImpl<TaskMapper, Task> implements ITaskService {
    private final TaskMapper mapper;
    private final TaskRepeatRuleMapper ruleMapper;
    private final TaskReminderMapper reminderMapper;
    private final TaskInstanceMapper instanceMapper;
    private final TaskLabelOptionMapper labelOptionMapper;

    @Autowired
    public TaskService(TaskMapper mapper,TaskRepeatRuleMapper ruleMapper,
                       TaskReminderMapper reminderMapper,TaskInstanceMapper instanceMapper,
                       TaskLabelOptionMapper labelOptionMapper)
    {
        this.mapper = mapper;
        this.ruleMapper = ruleMapper;
        this.reminderMapper = reminderMapper;
        this.instanceMapper = instanceMapper;
        this.labelOptionMapper = labelOptionMapper;
    }

    /*创建任务，从TaskModel中接受所需参数，创建任务的同时创建自己的对应实例，读取reminderInfoModels创建提醒，repeatable为真，使用所需参数创建
    规则*/
    @Transactional
    @Override
    public Long createTask(TaskModel model) {
        Task task = new Task();
        task.setCreateTime(Constants.Now());
        task.setBeginTime(model.getBeginTime());
        task.setEndTime(model.getEndTime());
        task.setPriority(model.getPriority());
        task.setDescription(model.getDescription());
        task.setTitle(model.getTitle());
        task.setState(TaskState.UNFINISHED.value());
        task.setUserId(model.getUserId());
        task.setRepeatable(model.getRepeatable());
        mapper.insert(task);
        TaskInstance instance = new TaskInstance();
        instance.setTaskId(task.getId());
        instance.setInstanceId(task.getId());
        List<TaskReminder> reminders = new ArrayList<>();
        TaskReminderInfoModel[] infoModels = model.getReminderInfoModels();
        if(infoModels.length>Constants.None) {
            for (int i = 0; i < infoModels.length; i++) {
                TaskReminderInfoModel infoModel = infoModels[i];
                TaskReminder reminder = new TaskReminder();
                reminder.setTaskId(task.getId());
                reminder.setTiming(infoModel.getTiming());
                reminder.setMode(infoModel.getMode());
                reminder.setValue(infoModel.getValue());
                reminders.add(reminder);
            }
            reminderMapper.batchInsert(reminders);
        }
        if(task.getRepeatable()) {
            TaskRepeatRule rule = new TaskRepeatRule();
            rule.setTaskId(task.getId());
            rule.setPeriod(model.getPeriod());
            rule.setPeriodUnit(model.getPeriodUnit());
            if(model.getCustom()!=null)
                rule.setCustom(model.getCustom());
            if (model.getDeadline() != null)
                rule.setDeadline(model.getDeadline());
            if(model.getCount()!=null&&model.getCount()>Constants.None)
                rule.setCount(model.getCount());
            ruleMapper.insert(rule);
        }
        instanceMapper.insert(instance);
        return task.getId();
    }

    //获取对应任务id的任务提醒
    @Override
    public List<TaskReminderVO> getTaskReminders(Long taskId) {
        return reminderMapper.getTaskReminders(taskId);
    }

    /*形式删除，取消任务，更新任务状态至3（取消状态）
    与更新任务类似,不过在‘全部’模式时会将重复规则设置截止时间到主任务的开始时间
     */
    @Override
    @Transactional
    public int cancelTask(TaskModel model, Integer mode) {
        LambdaUpdateWrapper<Task> wrapper = new LambdaUpdateWrapper<>();
        wrapper.set(Task::getState,TaskState.CANCELLED.value());

        if(mode.equals(TaskEditMode.ALL.value()))
        {
            wrapper.in(Task::getId,instanceMapper.getRepeatIds(model.getTaskId()));
            Task task = mapper.selectById(model.getTaskId());
            ruleMapper.setDeadline(task.getBeginTime(),model.getTaskId());
            return mapper.update(wrapper);
        }
        else if(mode.equals(TaskEditMode.ONLYTHIS.value())){
            wrapper.eq(Task::getId,model.getInstanceId());
            return mapper.update(wrapper);
        }
        else if(mode.equals(TaskEditMode.THISNALL.value())){
            wrapper.in(Task::getId,instanceMapper.getRepeatIdsUnder(model.getBeginTime(),model.getTaskId()));
            ruleMapper.setDeadline(model.getBeginTime(),model.getTaskId());
            return mapper.update(wrapper);
        }
        return Constants.EOF;
    }

    @Override
    @Transactional
    public int removeTask(TaskModel model,Integer mode) {
       LambdaUpdateWrapper<TaskInstance> wrapper = new LambdaUpdateWrapper<>();
       wrapper.set(TaskInstance::getFlag,true);
       if(!model.getRepeatable())
       {
           wrapper.eq(TaskInstance::getInstanceId,model.getInstanceId());
           return instanceMapper.update(wrapper);
       }
       else{
           if(mode.equals(TaskEditMode.ALL.value()))
           {
               wrapper.eq(TaskInstance::getTaskId,model.getTaskId());
               return instanceMapper.update(wrapper);
           }
           else if(mode.equals(TaskEditMode.ONLYTHIS.value())){
               wrapper.eq(TaskInstance::getInstanceId,model.getInstanceId());
               return instanceMapper.update(wrapper);
           }
           else if(mode.equals(TaskEditMode.THISNALL.value())){
               ruleMapper.setDeadline(Constants.Now(),model.getTaskId());
               wrapper.in(TaskInstance::getInstanceId,instanceMapper.getRepeatIdsUnder(model.getBeginTime(),model.getTaskId()));
               return instanceMapper.update(wrapper);
           }
       }
       return Constants.NormalState;
    }

    /*分页获取某时间下的任务，对于可重复任务，提取其规则，获取实例，如果其实例不存在则生成实例
          并使用redis缓存数据，提高响应速度
         */
    @Override
    @Transactional
    public PagedData<TaskRuleComboVO> getTasks(Integer current, Integer pageSize, String userId, Date time, Long labelId, RedisCache redis) {
        final String key1 = String.format("Caching_%s_%s",userId,CachingKeys.GetTasks);
        final String key2 = String.format("Caching_%s_%s",userId,CachingKeys.GetTasksDateValue);
        if(redis.has(key1)&&(redis.has(key2)&&
                DateUtil.onlyDateEquals((Date)redis.get(key2),time)))
            return (PagedData<TaskRuleComboVO>)redis.get(key1);
        else{
            redis.remove(key1);
            redis.remove(key2);
        }
        PagedData<TaskRuleComboVO> res = new PagedData<>();

        Page<TaskRuleComboVO> page = Page.of(current,pageSize);
        Pair<Date,Date> bound = DateUtil.bound(time);
        List<TaskRuleComboVO> tasks = mapper.getTasks(page,userId,time,bound.getItem1(),bound.getItem2(),labelId);

        boolean flag = true;
        for(TaskRuleComboVO task:tasks){
            if(task.getDeadline()!=null&&task.getDeadline().getTime()<time.getTime())
                continue;
            if(!task.getRepeatable()){
                if(DateUtil.onlyDateEquals(task.getBeginTime(),time)||DateUtil.onlyDateEquals(task.getEndTime(),time)
                ||(task.getBeginTime().getTime()<time.getTime()&&task.getEndTime().getTime()>=time.getTime())) {
                    res.getData().add(task);
                }
                continue;
            }
            TaskRuleComboVO queryTask = mapper.getTask(userId,task.getTaskId(),time,bound.getItem1(),bound.getItem2());
            if(queryTask==null) {
                if(!DateUtil.over(time,task.getBeginTime())&&!DateUtil.over(time,task.getEndTime()))
                    continue;
                if (task.getCount()!=null&&task.getCount() > Constants.None) {
                    LambdaQueryWrapper<TaskInstance> wrapper = new LambdaQueryWrapper<>();
                    wrapper.eq(TaskInstance::getTaskId,task.getTaskId());
                    Long count = instanceMapper.selectCount(wrapper);
                    if(count>=task.getCount())
                        continue;
                }
                Task instance = new Task();
                ObjectUtil.copy(task, instance);
                flag = false;
                Date beginTime = task.getBeginTime();
                Date endTime = task.getEndTime();
                long delta = endTime.getTime()-beginTime.getTime();
                if (task.getCustom() == null) {
                    Date tempDate = new Date(beginTime.getTime());
                    int i = 1;
                    if (task.getPeriodUnit().equals(PeriodUnit.DAILY.value())) {
                        if(task.getPeriod()==1) {
                            beginTime.setYear(time.getYear());
                            beginTime.setMonth(time.getMonth());
                            beginTime.setDate(time.getDate());
                            instance.setBeginTime(beginTime);
                            endTime.setTime(beginTime.getTime()+delta);
                            instance.setEndTime(endTime);
                        }
                        else{
                            while(tempDate.getTime()<time.getTime()){
                                tempDate.setDate(beginTime.getDate()+task.getPeriod()*i);
                                i++;
                            }
                            if(!DateUtil.onlyDateEquals(tempDate,time))continue;
                            instance.setBeginTime(tempDate);
                            endTime.setTime(tempDate.getTime()+delta);
                            instance.setEndTime(endTime);
                        }
                    } else if (task.getPeriodUnit().equals(PeriodUnit.WEEKLY.value())) {
                        while(tempDate.getTime()<time.getTime()){
                            tempDate.setDate(beginTime.getDate()+task.getPeriod()*i*Constants.Week);
                            i++;
                        }
                        if(!DateUtil.onlyDateEquals(tempDate,time))continue;
                        instance.setBeginTime(tempDate);
                        endTime.setTime(tempDate.getTime()+delta);
                        instance.setEndTime(endTime);

                    } else if (task.getPeriodUnit().equals(PeriodUnit.MONTHLY.value())) {
                        while(tempDate.getTime()<time.getTime()){
                            tempDate.setMonth(beginTime.getMonth()+task.getPeriod()*i);
                            i++;
                        }
                        if(!DateUtil.onlyDateEquals(tempDate,time))continue;
                        instance.setBeginTime(tempDate);
                        endTime.setTime(tempDate.getTime()+delta);
                        instance.setEndTime(endTime);
                    } else if (task.getPeriodUnit().equals(PeriodUnit.YEARLY.value())) {
                        while(tempDate.getTime()<time.getTime()){
                            tempDate.setYear(beginTime.getYear()+task.getPeriod()*i);
                            i++;
                        }
                        if(!DateUtil.onlyDateEquals(tempDate,time))continue;
                        instance.setBeginTime(tempDate);
                        endTime.setTime(tempDate.getTime()+delta);
                        instance.setEndTime(endTime);
                    }
                } else {
                    var custom = task.getCustom();
                    boolean isDayCustom = false;
                    for (String key : custom.keySet()) {
                        if (custom.get(key).equals(time.getDay())) {
                            beginTime.setYear(time.getYear());
                            beginTime.setMonth(time.getMonth());
                            beginTime.setDate(time.getDate());
                            instance.setBeginTime(beginTime);
                            endTime.setTime(beginTime.getTime() + delta);
                            instance.setEndTime(endTime);
                            isDayCustom = true;
                            break;
                        }
                    }
                    if(!isDayCustom)
                        continue;
                }
                instance.setCreateTime(Constants.Now());
                if(DateUtil.over(instance.getEndTime(),Constants.Now()))
                    instance.setState(TaskState.UNFINISHED.value());
                else
                    instance.setState(TaskState.ABANDONED.value());
                mapper.insert(instance);
                TaskInstance taskInstance = new TaskInstance();
                taskInstance.setTaskId(task.getTaskId());
                taskInstance.setInstanceId(instance.getId());
                instanceMapper.insert(taskInstance);
                List<TaskReminderVO> reminderVOs = reminderMapper.getTaskReminders(task.getTaskId());
                if (reminderVOs.size() > Constants.None) {
                    List<TaskReminder> reminders = new ArrayList<>();
                    for (TaskReminderVO reminderVO : reminderVOs) {
                        TaskReminder reminder = new TaskReminder();
                        ObjectUtil.copy(reminderVO, reminder);
                        reminder.setTaskId(instance.getId());
                        reminder.setId(null);
                        reminder.setTiming(
                                TaskReminder.reloadTiming(reminder.getMode(),reminder.getValue(),instance.getBeginTime())
                        );
                        reminders.add(reminder);
                    }
                    reminderMapper.batchInsert(reminders);
                }
                List<TaskLabelOption> options = labelOptionMapper.getTaskLabelOptios(task.getTaskId());
                if(options.size()>0){
                    for(TaskLabelOption option:options){
                        option.setId(null);
                        option.setTaskId(instance.getId());
                    }
                    labelOptionMapper.batchInsert(options);
                }
                TaskRuleComboVO toAdd = new TaskRuleComboVO();
                ObjectUtil.copy(instance, toAdd);
                toAdd.setPeriod(task.getPeriod());
                toAdd.setCount(task.getCount());
                toAdd.setPeriodUnit(task.getPeriodUnit());
                toAdd.setCustom(task.getCustom());
                toAdd.setTaskId(task.getTaskId());
                toAdd.setInstanceId(instance.getId());
                res.getData().add(toAdd);
            }
            else {
                if(queryTask.getState().equals(TaskState.CANCELLED.value()))
                    continue;
                queryTask.setPeriod(task.getPeriod());
                queryTask.setPeriodUnit(task.getPeriodUnit());
                queryTask.setDeadline(task.getDeadline());
                queryTask.setCount(task.getCount());
                queryTask.setCustom(task.getCustom());
                res.getData().add(queryTask);
            }
        }
        res.setTotal(page.getTotal());
        if(flag){
            if(!redis.has(key1)&&!redis.has(key2))
            {
                redis.set(key1,res,Constants.CachingExpire);
                redis.set(key2,time,Constants.CachingExpire);
            }
        }
        else{
            if(redis.has(key1)&&redis.has(key2)) {
                redis.remove(key1);
                redis.remove(key2);
            }
        }
        return res;
    }

    /*更新任务：
    非重复任务与重复任务的”仅此“模式是一样的直接更新对应实例；”全部“模式下，更新所有taskId值为model中taskId的实例id;
    ”此和往后“模式下，更新值为model中的instanceId值往后的实例，即任务实例开始时间在其之后的任务，将原规则设置期限为此实例的开始时间，
    并以此id生成新规则，作为新的主id模式
     */
    @Override
    @Transactional
    public int updateTask(TaskModel model,Integer mode) {
        LambdaUpdateWrapper<Task> wrapper = new LambdaUpdateWrapper<>();
        wrapper.set(Task::getTitle, model.getTitle()).set(Task::getDescription, model.getDescription())
                .set(Task::getBeginTime, model.getBeginTime()).set(Task::getEndTime, model.getEndTime())
                .set(Task::getPriority, model.getPriority());
        if (!model.getRepeatable()){
            wrapper.eq(Task::getId, model.getTaskId());
            return update(wrapper) ? Constants.NormalState : Constants.AbNormalState;
     }
        else {
            if (mode.equals(TaskEditMode.ONLYTHIS.value())) {
                if(model.getTaskId().equals(model.getInstanceId()))
                {
                    Task task = mapper.selectById(model.getTaskId());
                    Task newTask = ObjectUtil.copy(task,new Task());
                    newTask.setId(null);
                    newTask.setState(TaskState.CANCELLED.value());
                    mapper.insert(newTask);
                    TaskInstance instance = new TaskInstance();
                    instance.setTaskId(newTask.getId());
                    instance.setInstanceId(newTask.getId());
                    instance.setFlag(true);
                    instanceMapper.insert(instance);
                    instanceMapper.setTaskIdFor(newTask.getId(),task.getId());
                    LambdaUpdateWrapper<TaskRepeatRule> wrapper1 = new LambdaUpdateWrapper<>();
                    wrapper1.set(TaskRepeatRule::getTaskId,newTask.getId()).eq(TaskRepeatRule::getTaskId,task.getId());
                    ruleMapper.update(wrapper1);
                    wrapper.set(Task::getRepeatable,false).eq(Task::getId,task.getId());
                    mapper.update(wrapper);
                    return Constants.NormalState;
                }
                else {
                    wrapper.eq(Task::getId, model.getInstanceId());
                    return update(wrapper) ? Constants.NormalState : Constants.AbNormalState;
                }
            } else if (mode.equals(TaskEditMode.ALL.value())) {
               wrapper.in(Task::getId,instanceMapper.getRepeatIds(model.getTaskId()));
               return update(wrapper)? Constants.NormalState:Constants.AbNormalState;
            } else if (mode.equals(TaskEditMode.THISNALL.value())) {
                wrapper.in(Task::getId,instanceMapper.getRepeatIds(model.getTaskId())).and(q->
                        q.ge(Task::getBeginTime,model.getBeginTime()).or().ge(Task::getEndTime,model.getBeginTime()));
                TaskRepeatRule rule = ruleMapper.getRepeatRule(model.getInstanceId());
                if (rule == null)
                {
                    TaskRepeatRule repeatRule = ruleMapper.getRepeatRule(model.getTaskId());
                    repeatRule.setTaskId(model.getInstanceId());
                    repeatRule.setId(null);
                    ruleMapper.insert(repeatRule);
                    if(!model.getTaskId().equals(model.getInstanceId()))
                    {
                        ruleMapper.setDeadline(model.getBeginTime(), model.getTaskId());
                        instanceMapper.setMainTaskBeSelf(model.getInstanceId());
                    }
                }
               return update(wrapper) ? Constants.NormalState : Constants.AbNormalState;
            }
        }
        return Constants.EOF;
    }

    /*移除提醒：
    类似于模式更新任务，全部模式下需要根据model的mode,value值匹配所有实例taskId下的实例
    */
    @Override
    @Transactional
    public int removeReminder(TaskReminderModel model, Integer mode) {
        LambdaQueryWrapper<TaskReminder> wrapper = new LambdaQueryWrapper<>();
        if(mode.equals(TaskEditMode.ALL.value())){
            wrapper.in(TaskReminder::getTaskId,instanceMapper.getReminderIds(model.getTaskId(),
                    model.getMode(),model.getValue()));
            return reminderMapper.delete(wrapper);
        }
        else if(mode.equals(TaskEditMode.ONLYTHIS.value())){
            wrapper.eq(TaskReminder::getId,model.getReminderId());
            return reminderMapper.delete(wrapper);
        }
        else if(mode.equals(TaskEditMode.THISNALL.value())){
            Long mainId = model.getTaskId();
            handleTaskOptions(model.getTaskBeginTime(),mainId,model.getInstanceId(),model.getMode(),model.getValue());
            TaskRepeatRule rule = ruleMapper.getRepeatRule(model.getInstanceId());
            if (rule == null)
            {
                TaskRepeatRule repeatRule = ruleMapper.getRepeatRule(mainId);
                repeatRule.setTaskId(model.getInstanceId());
                repeatRule.setId(null);
                ruleMapper.insert(repeatRule);
            }
            if(!mainId.equals(model.getInstanceId()))
            {
                ruleMapper.setDeadline(model.getTaskBeginTime(), mainId);
                instanceMapper.setMainTaskBeSelf(model.getInstanceId());
            }
            wrapper.eq(TaskReminder::getTaskId,model.getInstanceId());
            reminderMapper.delete(wrapper);
            return Constants.NormalState;
        }
        return Constants.EOF;
    }

    /*更新规则：”全部“模式更新主任务对应的规则
     ”仅此“模式：根据model的instanceId生成新规则，并删除对应实例生成一个新的重复任务实例
     ”仅此及后“模式：类似与更新任务
     */
    @Override
    @Transactional
    public int changeRepeatRule(TaskRepeatRuleModel model, Integer mode) {
        TaskRepeatRule rule = new TaskRepeatRule();
        ObjectUtil.copy(model,rule);
        Boolean repeatable = mapper.isRepeatable(model.getTaskId());
        if(!repeatable){
            LambdaUpdateWrapper<Task> wrapper = new LambdaUpdateWrapper<>();
            wrapper.set(Task::getRepeatable,true).eq(Task::getId,model.getTaskId());
            mapper.update(wrapper);
            ruleMapper.insert(rule);
            return Constants.NormalState;
        }

        LambdaUpdateWrapper<TaskRepeatRule> wrapper = new LambdaUpdateWrapper<>();
        if(rule.getCount()!=null)
            wrapper.set(TaskRepeatRule::getCount,model.getCount());
        if(rule.getDeadline()!=null)
            wrapper.set(TaskRepeatRule::getDeadline,model.getDeadline());
        if(rule.getCustom()!=null)
            wrapper.set(TaskRepeatRule::getCustom,ObjectUtil.asJsonStr(model.getCustom()));
        wrapper.set(TaskRepeatRule::getPeriod,model.getPeriod()).set(TaskRepeatRule::getPeriodUnit,model.getPeriodUnit());
        if(mode.equals(TaskEditMode.ALL.value())){
            Task task = mapper.selectById(model.getTaskId());
            handleTaskOptions(task.getBeginTime(),model.getTaskId(),model.getInstanceId(),null,null);
            wrapper.eq(TaskRepeatRule::getTaskId,task.getId());
            return ruleMapper.update(wrapper);
        }
        else if(mode.equals(TaskEditMode.ONLYTHIS.value())){
            Task task = mapper.selectById(model.getInstanceId());
            task.setId(null);
            mapper.insert(task);
            rule.setTaskId(task.getId());
            TaskInstance instance = new TaskInstance();
            instance.setTaskId(task.getId());
            instance.setInstanceId(task.getId());
            instanceMapper.insert(instance);
            mapper.changeState(TaskState.CANCELLED.value(),model.getInstanceId());
            return ruleMapper.insert(rule);
        }
        else if(mode.equals(TaskEditMode.THISNALL.value())){
            int res;
            Long mainId = model.getTaskId();
            handleTaskOptions(model.getTaskBeginTime(),mainId,model.getInstanceId(),null,null);
            TaskRepeatRule instanceRule = ruleMapper.getRepeatRule(model.getInstanceId());
            if (instanceRule == null)
            {
                rule.setTaskId(model.getInstanceId());
                res = ruleMapper.insert(rule);
            }
            else{
                wrapper.eq(TaskRepeatRule::getTaskId,model.getInstanceId());
                res = ruleMapper.update(wrapper);
            }
            if(!mainId.equals(model.getInstanceId()))
            {
                ruleMapper.setDeadline(model.getTaskBeginTime(), mainId);
                instanceMapper.setMainTaskBeSelf(model.getInstanceId());
            }
            return res;
        }
        return Constants.EOF;
    }

    /*移除提醒：
    类似于模式更新任务，全部模式下需要根据model的taskId获取所有重复任务的id添加提醒
    */
    @Override
    @Transactional
    public Long addReminder(TaskReminderModel model, Integer mode) {
        TaskReminder reminder = new TaskReminder();
        reminder.setMode(model.getMode());
        reminder.setValue(model.getValue());
        reminder.setTiming(model.getTiming());

        if(mode.equals(TaskEditMode.ALL.value())){
            List<Long> instanceIds = instanceMapper.getRepeatIds(model.getTaskId());
            List<TaskReminder> reminders = new ArrayList<>();
            for(Long id:instanceIds){
                TaskReminder toAdd = ObjectUtil.copy(reminder,new TaskReminder());
                toAdd.setTaskId(id);
                reminders.add(toAdd);
            }
            reminderMapper.batchInsert(reminders);
            return (long)Constants.NormalState;
        }
        else if(mode.equals(TaskEditMode.ONLYTHIS.value())){
            reminder.setTaskId(model.getInstanceId());
            reminderMapper.insert(reminder);
            return reminder.getId();
        }
        else if(mode.equals(TaskEditMode.THISNALL.value())) {
            Long mainId = model.getTaskId();
            handleTaskOptions(model.getTiming(), mainId,model.getInstanceId(),model.getMode(),model.getValue());
            reminder.setTaskId(model.getInstanceId());
            TaskRepeatRule rule = ruleMapper.getRepeatRule(model.getInstanceId());
            if (rule == null)
            {
                TaskRepeatRule repeatRule = ruleMapper.getRepeatRule(mainId);
                repeatRule.setTaskId(model.getInstanceId());
                repeatRule.setId(null);
                ruleMapper.insert(repeatRule);
            }
            if(!mainId.equals(model.getInstanceId()))
            {
                ruleMapper.setDeadline(model.getTaskBeginTime(), mainId);
                instanceMapper.setMainTaskBeSelf(model.getInstanceId());
            }
            reminderMapper.insert(reminder);
            return reminder.getId();
        }
        return (long)Constants.EOF;
    }

    @Override
    @Transactional
    public void updateTask(TaskModel model) {
        Long taskId = model.getTaskId();
        Long instanceId = model.getInstanceId();
        Task task = mapper.selectById(instanceId);
        TaskRepeatRule rule = ruleMapper.selectOne(new LambdaQueryWrapper<TaskRepeatRule>()
        .eq(TaskRepeatRule::getTaskId,taskId));
        TaskRepeatRule newRule = null;
        Task newTask = null;
        Task toCompare = ObjectUtil.copy(model,new Task());
        TaskRepeatRule toCompareRule = ObjectUtil.copy(model,new TaskRepeatRule());
        if(!task.equals(toCompare)){
            toCompare.setId(taskId);
            if(model.getTaskId().equals(model.getInstanceId())&&task.getRepeatable()){
                newTask = ObjectUtil.copy(task,new Task());
                newTask.setId(null);
                newTask.setState(TaskState.CANCELLED.value());
                mapper.insert(newTask);
                TaskInstance instance = new TaskInstance();
                instance.setTaskId(newTask.getId());
                instance.setInstanceId(newTask.getId());
                instance.setFlag(true);
                instanceMapper.insert(instance);
                newRule = ObjectUtil.copy(rule,new TaskRepeatRule());
                newRule.setTaskId(newTask.getId());
                toCompare.setRepeatable(false);
            }
            mapper.updateById(toCompare);
        }
        if(rule==null&&model.getRepeatable())
        {
            ruleMapper.insert(toCompareRule);
            task.setRepeatable(true);
            mapper.updateById(task);
        }
        if(rule!=null&&!rule.equals(toCompareRule)){
            if(newRule==null){
                newTask = ObjectUtil.copy(task,new Task());
                newTask.setId(null);
                newTask.setRepeatable(true);
                newTask.setState(TaskState.CANCELLED.value());
                mapper.insert(newTask);
                toCompareRule.setId(rule.getId());
                toCompareRule.setTaskId(newTask.getId());
                TaskInstance instance = new TaskInstance();
                instance.setTaskId(newTask.getId());
                instance.setInstanceId(newTask.getId());
                instanceMapper.insert(instance);
            }
            else {
                toCompareRule.setId(newRule.getId());
                toCompareRule.setTaskId(newTask.getId());
            }
            ruleMapper.updateById(toCompareRule);
        }

        TaskReminderInfoModel[] reminderModels = model.getReminderInfoModels();
        var taskReminders = reminderMapper.getTaskReminders(instanceId);
        List<Long> toDeleteIds = new ArrayList<>();
        List<TaskReminder> toInsert = new ArrayList<>();
        for(TaskReminderVO reminder:taskReminders){
            Optional<TaskReminderInfoModel> optional = Arrays.stream(reminderModels).filter(r->
                    r.getMode().equals(reminder.getMode())&&r.getValue().equals(reminder.getValue())).findFirst();
            if(optional.isEmpty())
               toDeleteIds.add(reminder.getReminderId());
        }
        for(TaskReminderInfoModel reminderModel:reminderModels){
            Optional<TaskReminderVO> optional =taskReminders.stream().filter(r->
                    r.getMode().equals(reminderModel.getMode())&&r.getValue().equals(reminderModel.getValue()))
                    .findFirst();
            if(optional.isEmpty())
            {
                TaskReminder reminder = ObjectUtil.copy(reminderModel,new TaskReminder());
                reminder.setTaskId(taskId);
                toInsert.add(reminder);
            }
        }
        if(toDeleteIds.size()>0)
            reminderMapper.delete(new LambdaQueryWrapper<TaskReminder>().in(TaskReminder::getId,toDeleteIds));
        if(toInsert.size()>0)
            reminderMapper.batchInsert(toInsert);
    }

    @Override
    public Map<String, List<TaskRuleComboVO>> getTasks(String userId, Date time, RedisCache redis) {
        HashMap<String,List<TaskRuleComboVO>> res = new HashMap<>();
        List<TaskRuleComboVO> totalData = getTasks(1,1000,userId,time,null, redis).getData();
        for(int i = SchedulePriority.NIONU.value();i>=SchedulePriority.INU.value();i--)
            res.put(String.format("%s-%d",Constants.Quadrant,i),new ArrayList<TaskRuleComboVO>());
        for(TaskRuleComboVO item:totalData){
            String key = (String.format("%s-%d",Constants.Quadrant,item.getPriority()));
            res.get(key).add(item);
        }
        return res;
    }

    @Override
    @Transactional
    public int finishOrNot(Long taskId, Integer state) {
       LambdaUpdateWrapper<Task> wrapper = new LambdaUpdateWrapper<>();
       wrapper.set(Task::getState,state);
       if(state.equals(TaskState.FINISHED.value()))
           wrapper.set(Task::getFinishTime,Constants.Now());
       else if(state.equals(TaskState.UNFINISHED.value()))
           wrapper.set(Task::getFinishTime,null);
       wrapper.eq(Task::getId,taskId);
       return mapper.update(wrapper);
    }

    @Override
    @Transactional
    public int changePriority(TaskPriorityModel model) {
        LambdaUpdateWrapper<Task> wrapper = new LambdaUpdateWrapper<>();
        wrapper.set(Task::getPriority,model.getPriority());
        if(model.getTaskId().equals(model.getInstanceId())&&model.getRepeatable())
        {
            Task task = mapper.selectById(model.getInstanceId());
            Task newTask = ObjectUtil.copy(task,new Task());
            newTask.setId(null);
            newTask.setPriority(model.getPriority());
            newTask.setState(TaskState.CANCELLED.value());
            mapper.insert(newTask);
            TaskInstance instance = new TaskInstance();
            instance.setTaskId(newTask.getId());
            instance.setInstanceId(newTask.getId());
            instanceMapper.insert(instance);
            ruleMapper.setInstanceId(task.getId(),newTask.getId());
            wrapper.set(Task::getRepeatable,false);
        }
        wrapper.eq(Task::getId,model.getInstanceId());
        return mapper.update(wrapper);
    }

    @Override
    public List<TaskReminderInfoVO> getCurrentTaskReminders(String userId, Date currentTime) {
        Date date = new Date(currentTime.getTime());
        date.setDate(currentTime.getDate()+1);
        date.setHours(Constants.None);
        date.setMinutes(Constants.None);
        date.setSeconds(Constants.None);

        return reminderMapper.getCurrentReminders(userId,currentTime,date);
    }

    @Override
    @Transactional
    public boolean freshReminderTiming(Long taskId, Date taskBeginTime) {
        Date beginTime = mapper.getTaskBeginTime(taskId);
        if(beginTime.getTime()==taskBeginTime.getTime())
            return false;
        List<TaskReminderVO> reminders = reminderMapper.getTaskReminders(taskId);
        if(reminders.size()==0) return false;
        for(var reminder:reminders){
            Date newTiming = TaskReminder.reloadTiming(reminder.getMode(),reminder.getValue(),taskBeginTime);
            if(reminder.getTiming().getTime()!=newTiming.getTime())
            {
                LambdaUpdateWrapper<TaskReminder> wrapper = new LambdaUpdateWrapper<>();
                wrapper.set(TaskReminder::getTiming,newTiming).eq(TaskReminder::getId,reminder.getReminderId());
                reminderMapper.update(wrapper);
            }
        }
        return true;
    }

    @Override
    public void removeAllAbout(String userId) {
        List<Long> taskIds = mapper.getUserTaskIds(userId);
        instanceMapper.delete(new LambdaQueryWrapper<TaskInstance>().in(TaskInstance::getTaskId,taskIds));
        reminderMapper.delete(new LambdaQueryWrapper<TaskReminder>().in(TaskReminder::getTaskId,taskIds));
        ruleMapper.delete(new LambdaQueryWrapper<TaskRepeatRule>().in(TaskRepeatRule::getTaskId,taskIds));
        mapper.delete(new LambdaQueryWrapper<Task>().eq(Task::getUserId,userId));
    }


    @Override
    public int remove(Long taskId) {
       List<Long> taskIds = instanceMapper.getRepeatIds(taskId);
       instanceMapper.delete(new LambdaQueryWrapper<TaskInstance>().eq(TaskInstance::getTaskId,taskId));
       reminderMapper.delete(new LambdaQueryWrapper<TaskReminder>().in(TaskReminder::getTaskId,taskIds));
       ruleMapper.delete(new LambdaQueryWrapper<TaskRepeatRule>().eq(TaskRepeatRule::getTaskId,taskId));
       labelOptionMapper.delete(new LambdaQueryWrapper<TaskLabelOption>().eq(TaskLabelOption::getTaskId,taskId));
       return  mapper.delete(new LambdaQueryWrapper<Task>().eq(Task::getId,taskId));
    }

    @Override
    public int recover(Long taskId) {
        LambdaUpdateWrapper<TaskInstance> wrapper = new LambdaUpdateWrapper<>();
        wrapper.set(TaskInstance::getFlag,false).eq(TaskInstance::getInstanceId,taskId);
        return instanceMapper.update(wrapper);
    }

    @Override
    public Long getFinishedTaskCount(String userId) {
        return mapper.getTaskCount(userId,TaskState.FINISHED.value());
    }

    @Override
    public List<Pair<Date, Long>> getFinishedTaskCounts(String userId, Integer mode, Date today, RedisCache redis) {
        String key1 = String.format("Caching_%s_%s",userId,CachingKeys.GetFinishedTaskCounts);
        String key2 = String.format("Caching_%s_%s",userId,CachingKeys.GetTaskCountsMode);
        if(redis.has(key2)){
            if(!redis.get(key2).equals(mode))
            {
                redis.remove(key1);
                redis.remove(key2);
            }
        }
        ArrayDataModel<Pair<Date,Long>> model;
        if(redis.has(key1)) {
           model = (ArrayDataModel<Pair<Date,Long>>) redis.get(key1);
           return ObjectUtil.toList(model.getData());
        }
        Pair<Date,Long>[] data = new Pair[Constants.Week];
        if(mode.equals(TaskCountMode.DAY.value()))
        {
            for(int i=1;i<=Constants.Week;i++)
            {
                Date date = new Date(today.getTime());
                date.setDate(today.getDate()-Constants.Week+i);
                Pair<Date,Date> bound = DateUtil.bound(date);
                data[i-1] = Pair.makePair(date,mapper.getDurationTaskCounts(userId,bound.getItem1(),bound.getItem2()));
            }
        }
        else if(mode.equals(TaskCountMode.WEEK.value())){
            Date bound = new Date(today.getTime());
            bound.setDate(bound.getDate()-today.getDay());
            for(int i=1;i<=Constants.Week;i++)
            {
                Date leftBound = new Date(bound.getTime());
                leftBound.setDate(bound.getDate()-(Constants.Week-i)*Constants.Week);
                Date rightBound = new Date(leftBound.getTime());
                rightBound.setDate(leftBound.getDate()+Constants.Week);
                data[i-1] = Pair.makePair(rightBound,mapper.getDurationTaskCounts(userId,leftBound,rightBound));
            }
        }
        else if(mode.equals(TaskCountMode.MONTH.value())){
            Date bound = new Date(today.getTime());
            bound.setDate(1);
            for(int i=1;i<=Constants.Week;i++)
            {
                Date leftBound = new Date(bound.getTime());
                leftBound.setMonth(bound.getMonth()+i-Constants.Week);
                Date rightBound = new Date(leftBound.getTime());
                rightBound.setMonth(leftBound.getMonth()+1);
                data[i-1] = Pair.makePair(leftBound,mapper.getDurationTaskCounts(userId,leftBound,rightBound));
            }
        }
        model = new ArrayDataModel<>();
        model.setData(data);
        redis.set(key1,model,Constants.CachingExpire);
        redis.set(key2,mode,Constants.CachingExpire);
        return ObjectUtil.toList(data);
    }

    //某个时间下的任务的重复任务的提醒清除，或者更新
    private void handleTaskOptions(Date beginTime, Long taskId, Long instanceId,
                                   Integer reminderMode,Integer reminderMoveValue){
        List<Long> repeatIds = instanceMapper.getRepeatIdsUnder(beginTime,taskId);
        if(repeatIds.size()>0)
        {
            LambdaUpdateWrapper<TaskInstance> wrapper = new LambdaUpdateWrapper<>();
            wrapper.in(TaskInstance::getInstanceId, repeatIds).ne(TaskInstance::getInstanceId,instanceId)
            .set(TaskInstance::getTaskId,instanceId);
            instanceMapper.update(wrapper);
            if(reminderMode!=null&&reminderMoveValue!=null)
            {
                LambdaQueryWrapper<TaskReminder> wrapper1 = new LambdaQueryWrapper<>();
                wrapper1.in(TaskReminder::getTaskId, repeatIds).ne(TaskReminder::getTaskId, instanceId)
                .eq(TaskReminder::getMode,reminderMode).eq(TaskReminder::getValue,reminderMoveValue);
                reminderMapper.delete(wrapper1);
            }
        }
    }
}
