package SelfSchedule.DbOption.ServiceImpl;

import SelfSchedule.Common.CachingKeys;
import SelfSchedule.Common.Constants;
import SelfSchedule.Common.Pair;
import SelfSchedule.DbOption.Mapper.*;
import SelfSchedule.DbOption.Service.IHabitService;
import SelfSchedule.DbOption.Service.ITaskService;
import SelfSchedule.DbOption.Service.IndexServiceInterface;
import SelfSchedule.Entity.*;
import SelfSchedule.Entity.Enum.TaskState;
import SelfSchedule.Entity.VO.*;
import SelfSchedule.Model.ArrayDataModel;
import SelfSchedule.Service.FileService;
import SelfSchedule.Service.RedisCache;
import SelfSchedule.Utils.DateUtil;
import SelfSchedule.Utils.ObjectUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.Duration;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class IndexService implements IndexServiceInterface {
    private final ITaskService taskService;
    private final IHabitService habitService;
    private final TaskLabelMapper labelMapper;
    private final UserMapper userMapper;
    private final TaskLabelOptionMapper labelOptionMapper;
    private final UserTaskLabelMapper userTaskLabelMapper;

    @Autowired
    public IndexService(TaskService taskService,HabitService habitService,TaskLabelMapper labelMapper,
                        UserMapper userMapper,TaskLabelOptionMapper labelOptionMapper,
                        UserTaskLabelMapper userTaskLabelMapper){
       this.taskService = taskService;
       this.habitService = habitService;
       this.labelMapper = labelMapper;
       this.userMapper = userMapper;
       this.labelOptionMapper = labelOptionMapper;
       this.userTaskLabelMapper = userTaskLabelMapper;
    }

    private TaskMapper taskMapper(){
        return (TaskMapper) taskService.getBaseMapper();
    }

    private HabitMapper habitMapper(){
        return (HabitMapper) habitService.getBaseMapper();
    }

    private void setTasks(Map<String, List<IndexDisplayVO>> res, String key, List<TaskRuleComboVO> tasks) {
        for (var task : tasks) {
            res.get(key).add(task);
        }
    }

    @Override
    public Map<String, List<IndexDisplayVO>> getData(String userId, Long labelId, Date time, RedisCache redis) {
        final String key = String.format("Caching_%s_%s",userId, CachingKeys.GetIndexData);
        final String key_label = String.format("Caching_%s_%s",userId,CachingKeys.GetIndexCurrentLabelId);
        if(redis.has(key_label)&&redis.get(key_label).equals(labelId))
        {
            if(redis.has(key))
                return (Map<String, List<IndexDisplayVO>>) redis.get(key);
        }
        else
        {
            redis.remove(key);
            redis.remove(key_label);
        }
        Map<String, List<IndexDisplayVO>> res = new HashMap<>();
        String key1 = Task.class.getSimpleName().toLowerCase();
        String key2 = Habit.class.getSimpleName().toLowerCase();
        res.put(key1,new ArrayList<IndexDisplayVO>());
        res.put(key2,new ArrayList<IndexDisplayVO>());

        final int current = 1, size = 1000;
        if(TaskLabel.isBaseLabel(labelId)) {
            if(labelId.equals(TaskLabel.Finished)||labelId.equals(TaskLabel.Abandoned)||
                    labelId.equals(TaskLabel.RecycleBin)||labelId.equals(TaskLabel.Cancelled)) {
                List<TaskRuleComboVO> tasks ;
                if(labelId.equals(TaskLabel.RecycleBin))
                {
                    tasks = taskMapper().getRecycledTasks(Page.of(current,size),userId);
                    List<HabitVO> habits = habitService.getHabits(current,size,userId,time,true, redis).getData();
                    for(var habit:habits){
                        res.get(key2).add(habit);
                    }
                }
                else{
                    int state;
                    if (labelId.equals(TaskLabel.Finished))
                        state = TaskState.FINISHED.value();
                    else if (labelId.equals(TaskLabel.Abandoned))
                        state = TaskState.ABANDONED.value();
                    else
                        state = TaskState.CANCELLED.value();
                    tasks = taskMapper().getTasksWithState(Page.of(current,size),state,userId);
                }
                for (var task : tasks) {
                    res.get(key1).add(task);
                }
            }
            else{
                List<TaskRuleComboVO> tasks = taskService.getTasks(current, size, userId, time,null , redis).getData();
                setTasks(res, key1, tasks);
                List<HabitVO> habits = habitService.getHabits(current,size,userId,time,false, redis).getData();
                for(var habit:habits){
                    res.get(key2).add(habit);
                }
            }
        }
        else{
            List<TaskRuleComboVO> tasks = taskService.getTasks(current, size, userId,time,labelId,redis).getData();
            setTasks(res, key1, tasks);
        }

        redis.set(key,res,Constants.CachingExpire);
        redis.set(key_label,labelId,Constants.CachingExpire);

        return res;
    }

    @Override
    public List<TaskLabelVO> getLabels(String userId, RedisCache redis) {
        ArrayDataModel<TaskLabelVO> model;
        String key = String.format("Caching_%s_%s",userId,CachingKeys.GetTaskLabels);
        if(redis.has(key)){
            model =(ArrayDataModel<TaskLabelVO>)redis.get(key);
            return ObjectUtil.toList(model.getData());
        }

        List<TaskLabelVO> res = labelMapper.getLabels(userId);
        model = new ArrayDataModel<>();
        model.setData(ObjectUtil.toArray(res,TaskLabelVO.class));
        redis.set(key,model,Constants.CachingExpire);
        return res;
    }

    @Override
    @Transactional
    public Long createLabel(String labelName, String userId, String icon, Boolean isList) {
       TaskLabel label = new TaskLabel();
       label.setName(labelName);
       label.setIsList(isList);
       label.setCreateTime(Constants.Now());
       label.setNotCustom(false);
       label.setIcon(isList?Constants.DefaultListIcon:Constants.DefaultLabelIcon);
       labelMapper.insert(label);
       UserTaskLabel userTaskLabel = new UserTaskLabel();
       userTaskLabel.setLabelId(label.getId());
       userTaskLabel.setUserId(userId);
       userTaskLabelMapper.insert(userTaskLabel);
       return label.getId();
    }

    @Override
    @Transactional
    public int updateLabel(Long labelId, String labelName) {
        LambdaUpdateWrapper<TaskLabel> wrapper = new LambdaUpdateWrapper<>();
        wrapper.set(TaskLabel::getName,labelName).eq(TaskLabel::getId,labelId);
        return labelMapper.update(wrapper);
    }

    @Override
    public String uploadLabelIcon(Long labelId, String icon, boolean isList, MultipartFile file, FileService fileService) {
        if(isList){
            if(!icon.equals(Constants.DefaultListIcon))
                fileService.removeImage(icon);
        }
        else{
            if(!icon.equals(Constants.DefaultLabelIcon))
                 fileService.removeImage(icon);
        }
        String newIcon = fileService.uploadImage(file);
        LambdaUpdateWrapper<TaskLabel> wrapper = new LambdaUpdateWrapper<>();
        wrapper.set(TaskLabel::getIcon,newIcon).eq(TaskLabel::getId,labelId);
        labelMapper.update(wrapper);
        return newIcon;
    }

    /*
    * 用户标签名不可重复，清单可以，故需要在键入标签名检测
     */
    @Override
    public boolean checkLabelNameExists(String labelName,String userId) {
        Long labelId = labelMapper.labelExists(userId,labelName);
        return labelId!=null;
    }

    @Override
    @Transactional
    public int hideOrShowLabel(String userId, Boolean display, Long labelId) {
        LambdaUpdateWrapper<UserTaskLabel> wrapper = new LambdaUpdateWrapper<>();
        wrapper.set(UserTaskLabel::getDisplay,display).eq(UserTaskLabel::getLabelId,labelId)
                .eq(UserTaskLabel::getUserId,userId);
        return userTaskLabelMapper.update(wrapper);
    }

    @Override
    @Transactional
    public int removeLabel(Long labelId, FileService fileService) {
        TaskLabel label = labelMapper.selectById(labelId);
        String icon = label.getIcon();
        if(!icon.equals(Constants.DefaultLabelIcon)&&!icon.equals(Constants.DefaultListIcon))
            fileService.removeImage(icon);
        LambdaUpdateWrapper<TaskLabelOption> wrapper = new LambdaUpdateWrapper<>();
        if(label.getIsList())
            wrapper.set(TaskLabelOption::getListId,null).eq(TaskLabelOption::getListId,label.getId());
        else
            wrapper.set(TaskLabelOption::getLabelId,null).eq(TaskLabelOption::getLabelId,label.getId());
        labelOptionMapper.update(wrapper);
        userTaskLabelMapper.delete(new LambdaQueryWrapper<UserTaskLabel>().eq(UserTaskLabel::getLabelId,labelId));
        return labelMapper.deleteById(labelId);
    }

    @Override
    @Transactional
    public TaskLabelVO createOrCheckLabel(String labelName, String userId) {
        TaskLabel label = userTaskLabelMapper.getLabel(userId,labelName);
        if(label == null)
        {
           label = new TaskLabel();
           label.setIcon(Constants.DefaultLabelIcon);
           label.setCreateTime(Constants.Now());
           label.setIsList(false);
           label.setName(labelName);
           labelMapper.insert(label);
           UserTaskLabel userTaskLabel = new UserTaskLabel();
           userTaskLabel.setUserId(userId);
           userTaskLabel.setLabelId(label.getId());
           userTaskLabelMapper.insert(userTaskLabel);
        }
        TaskLabelVO res = ObjectUtil.copy(label,new TaskLabelVO());
        res.setLabelId(label.getId());
        res.setLabelName(labelName);
        return res;
    }

    @Override
    @Transactional
    public void checkYesterdayTask(Date yesterday, String userId, RedisCache redis) {
        String key = String.format("Caching_%s_%s",userId,CachingKeys.YesterdayTaskChecked);
        if(redis.has(key))
            return;
        Pair<Date,Date> bound = DateUtil.bound(yesterday);
        LambdaUpdateWrapper<Task> wrapper = new LambdaUpdateWrapper<>();
        wrapper.set(Task::getState,TaskState.ABANDONED.value()).
                eq(Task::getUserId,userId).and(q->q.ge(Task::getEndTime,bound.getItem1()).lt(Task::getEndTime,bound.getItem2()))
                .eq(Task::getState,TaskState.UNFINISHED.value());
        taskMapper().update(wrapper);
        Date rightBound = bound.getItem2();
        rightBound.setDate(rightBound.getDate()+1);
        long expire = bound.getItem2().getTime() - Constants.Now().getTime();
        redis.set(key,Constants.NormalState,Duration.ofMillis(expire));
    }

    @Override
    @Transactional
    public void checkHabitContinuousDays(Date yesterday, String userId, RedisCache redis) {
        String key = String.format("Caching_%s_%s",userId,CachingKeys.ContinuousDaysChecked);
        if(redis.has(key))
            return;
        List<String> habitIds = habitMapper().getUserHabitIds(userId);
        for(String habitId:habitIds){
            Date beginDate = habitMapper().getHabitBeginDate(habitId);
            if(habitService.isInFrequency(habitId,yesterday,beginDate.getTime()))
                habitService.clearContinuousDays(habitId);
        }
        Date time = new Date(yesterday.getTime());
        time.setDate(yesterday.getDate()+2);
        long expire = time.getTime() - Constants.Now().getTime();
        redis.set(key,Constants.NormalState,Duration.ofMillis(expire));
    }

    @Override
    public List<TaskLabelVO> getHiddenLabels(String userId, RedisCache redis) {
        String key = String.format("Caching_%s_%s",userId,CachingKeys.GetHiddenLabels);
        ArrayDataModel<TaskLabelVO> model;
        if(redis.has(key))
        {
            model = (ArrayDataModel<TaskLabelVO>) redis.get(key);
            return List.of(model.getData());
        }
        List<TaskLabelVO> res = labelMapper.getHiddenLabels(userId);
        model = new ArrayDataModel<>();
        model.setData(ObjectUtil.toArray(res,TaskLabelVO.class));
        redis.set(key,model,Constants.CachingExpire);
        return res;
    }

    @Override
    @Transactional
    public void logout(boolean cancelAccount, String userId, String email, RedisCache redis, FileService fileService) {
        String key = String.format("%s_token",userId);
        redis.remove(key);
        String checkCodeKey = String.format("%s_CheckCode",email);
        if(redis.has(checkCodeKey))
            redis.remove(checkCodeKey);
        if(cancelAccount){
            List<Long> userLabelIds = labelMapper.getUserTaskLabelIds(userId);
            List<String> userLabelIcons = labelMapper.getUserLabelIcons(userId);
            for (String icon:userLabelIcons){
                if(icon.equals(Constants.DefaultLabelIcon)||icon.equals(Constants.DefaultListIcon))
                    continue;
                fileService.removeImage(icon);
            }
            if(userLabelIds.size()>Constants.None) {
                labelMapper.delete(new LambdaQueryWrapper<TaskLabel>().in(TaskLabel::getId, userLabelIds));
                labelOptionMapper.delete(new LambdaQueryWrapper<TaskLabelOption>().in(TaskLabelOption::getLabelId, userLabelIds));
            }
            userTaskLabelMapper.delete(new LambdaQueryWrapper<UserTaskLabel>().eq(UserTaskLabel::getUserId,userId));

            taskService.removeAllAbout(userId,fileService);
            habitService.removeAllAbout(userId,fileService);
            String avatar = userMapper.getUserAvatar(userId);
            if(!avatar.equals(Constants.DefaultAvatar))
                fileService.removeImage(avatar);
            userMapper.deleteById(userId);
        }
    }

    @Override
    @Transactional
    public int removeOrRecoverHabit(String habitId, Boolean isRemove) {
        return isRemove ? habitService.remove(habitId):habitService.recover(habitId);
    }

    @Override
    @Transactional
    public int removeOrRecoverTask(Long taskId, Boolean isRemove) {
        return isRemove ? taskService.remove(taskId) : taskService.recover(taskId);
    }

    @Override
    @Transactional
    public void takeTaskLabelsFor(String userId, Long taskId, Long listId,
                                  Boolean isUpdate, ArrayDataModel<Long> model) {
        List<TaskLabelOption> toInsert = new ArrayList<>();
        List<Long> labelIds = ObjectUtil.toList(model.getData());
        if(labelIds.size()==0&&listId!=null){
            TaskLabelOption option = new TaskLabelOption();
            option.setListId(listId);
            option.setTaskId(taskId);
            labelOptionMapper.insert(option);
        }
        for(Long labelId:labelIds){
            LambdaQueryWrapper<TaskLabelOption> wrapper = new LambdaQueryWrapper<>();
            wrapper.eq(TaskLabelOption::getLabelId,labelId).eq(TaskLabelOption::getTaskId,taskId);
            TaskLabelOption option = labelOptionMapper.selectOne(wrapper);
            if(option==null){
                option = new TaskLabelOption();
                option.setListId(listId);
                option.setLabelId(labelId);
                option.setTaskId(taskId);
                toInsert.add(option);
            }
            else{
                if(listId==null){
                    LambdaUpdateWrapper<TaskLabelOption> wrapper1 = new LambdaUpdateWrapper<>();
                    wrapper1.set(TaskLabelOption::getListId,null).eq(TaskLabelOption::getTaskId,taskId)
                            .eq(TaskLabelOption::getLabelId,labelId);
                    labelOptionMapper.update(wrapper1);
                }
                else{
                    if(option.getListId()==null)
                    {
                        option.setListId(listId);
                        labelOptionMapper.updateById(option);
                    }
                    else{
                        if(!option.getListId().equals(listId))
                        {
                            option.setListId(listId);
                            labelOptionMapper.updateById(option);
                        }
                    }
                }
            }
        }
        if (toInsert.size() > Constants.None)
            labelOptionMapper.batchInsert(toInsert);

        if(isUpdate) {
            List<Long> taskLabelIds = labelOptionMapper.getTaskLabelIds(userId,taskId,listId);
            List<Long> toRemove = new ArrayList<>();
            for (Long labelId : taskLabelIds) {
                Optional<Long> optional = labelIds.stream().filter(id -> id.equals(labelId)).findFirst();
                if (optional.isEmpty())
                    toRemove.add(labelId);
            }
            if (toRemove.size() > Constants.None)
                labelOptionMapper.delete(new LambdaQueryWrapper<TaskLabelOption>().in(TaskLabelOption::getLabelId, toRemove));
        }
    }

    @Override
    public TaskLabelOptionVO getTaskLabels(Long taskId, String userId) {
       List<TaskLabelVO> data = labelOptionMapper.getTaskLabels(userId,taskId);
       TaskLabelOptionVO res = new TaskLabelOptionVO();
       Optional<TaskLabelVO> optional = data.stream().filter(l->l.getIsList()).findFirst();
       if(optional.isEmpty())
           res.setList(null);
       else
           res.setList(optional.get());
       res.setLabels(data.stream().filter(l->!l.getIsList()).collect(Collectors.toList()));
       return res;
    }

    @Override
    @Transactional
    public TaskLabelVO createList(String userId, String listName) {
        TaskLabel label = new TaskLabel();
        label.setIsList(true);
        label.setNotCustom(false);
        label.setCreateTime(Constants.Now());
        label.setIcon(Constants.DefaultListIcon);
        label.setName(listName);
        labelMapper.insert(label);
        UserTaskLabel userTaskLabel = new UserTaskLabel();
        userTaskLabel.setLabelId(label.getId());
        userTaskLabel.setUserId(userId);
        userTaskLabelMapper.insert(userTaskLabel);
        TaskLabelVO res = ObjectUtil.copy(label,new TaskLabelVO());
        res.setLabelName(listName);
        res.setLabelId(label.getId());
        return res;
    }
}
