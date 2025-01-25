package SelfSchedule.DbOption.ServiceImpl;

import SelfSchedule.Common.CachingKeys;
import SelfSchedule.Common.Constants;
import SelfSchedule.Common.Pair;
import SelfSchedule.DbOption.Mapper.HabitMapper;
import SelfSchedule.DbOption.Mapper.TaskLabelMapper;
import SelfSchedule.DbOption.Mapper.TaskMapper;
import SelfSchedule.DbOption.Service.IHabitService;
import SelfSchedule.DbOption.Service.ITaskService;
import SelfSchedule.DbOption.Service.IndexServiceInterface;
import SelfSchedule.Entity.Enum.TaskState;
import SelfSchedule.Entity.Habit;
import SelfSchedule.Entity.Task;
import SelfSchedule.Entity.TaskLabel;
import SelfSchedule.Entity.VO.HabitVO;
import SelfSchedule.Entity.VO.IndexDisplayVO;
import SelfSchedule.Entity.VO.TaskRuleComboVO;
import SelfSchedule.Model.ArrayDataModel;
import SelfSchedule.Service.FileService;
import SelfSchedule.Service.RedisCache;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
public class IndexService implements IndexServiceInterface {
    private final ITaskService taskService;
    private final IHabitService habitService;
    private final TaskLabelMapper labelMapper;

    @Autowired
    public IndexService(TaskService taskService,HabitService habitService,TaskLabelMapper labelMapper){
       this.taskService = taskService;
       this.habitService = habitService;
       this.labelMapper = labelMapper;
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
    public Map<String, List<IndexDisplayVO>> getData(String userId, Long labelId, RedisCache redis) {

        final String key = String.format("Caching_%s_%s",userId, CachingKeys.GetIndexData);
        if(redis.has(key))
            return (Map<String, List<IndexDisplayVO>>) redis.get(key);
        Map<String, List<IndexDisplayVO>> res = new HashMap<>();
        String key1 = Task.class.getSimpleName().toLowerCase();
        String key2 = Habit.class.getSimpleName().toLowerCase();
        res.put(key1,new ArrayList<IndexDisplayVO>());
        res.put(key2,new ArrayList<IndexDisplayVO>());

        Date time = Constants.Now();
        final int current = 1, size = 1000;
        if(TaskLabel.isBaseLabel(labelId)) {
            if(labelId.equals(TaskLabel.Finished)||labelId.equals(TaskLabel.Abandoned)||labelId.equals(TaskLabel.RecycleBin)) {
                int state;
                if (labelId.equals(TaskLabel.Finished))
                    state = TaskState.FINISHED.value();
                else if (labelId.equals(TaskLabel.Abandoned))
                    state = TaskState.ABANDONED.value();
                else state = TaskState.CANCELLED.value();

                var tasks = taskMapper().getTasksWithState(Page.of(current,size),state);
                for (var task : tasks) {
                    res.get(key1).add(task);
                }
            }
            else{
                if(labelId.equals(TaskLabel.Yesterday))
                    time.setDate(time.getDate()-1);
                else if(labelId.equals(TaskLabel.Tomorrow))
                    time.setDate(time.getDate()+1);
                List<TaskRuleComboVO> tasks = taskService.getTasks(current, size, userId, time,null , redis).getData();
                setTasks(res, key1, tasks);
                List<HabitVO> habits = habitService.getHabits(current,size,userId,time,redis).getData();
                for(var habit:habits){
                    res.get(key2).add(habit);
                }
            }
        }
        else{
            List<TaskRuleComboVO> tasks = taskService.getTasks(current, size, userId, time,labelId,redis).getData();
            setTasks(res, key1, tasks);
        }

        redis.set(key,res,Constants.CachingExpire);

        return res;
    }

    @Override
    public List<TaskLabel> getLabels(String userId,RedisCache redis) {
        ArrayDataModel<TaskLabel> model;
        String key = String.format("Caching_%s_%s",userId,CachingKeys.GetTaskLabels);
        if(redis.has(key)){
            model =(ArrayDataModel<TaskLabel>)redis.get(key);
            return List.of(model.getData());
        }

        LambdaQueryWrapper<TaskLabel> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(TaskLabel::getUserId,null).or().eq(TaskLabel::getUserId,userId);
        List<TaskLabel> res = labelMapper.selectList(wrapper);
        TaskLabel[] data = new TaskLabel[res.size()];
        res.toArray(data);
        model = new ArrayDataModel<>();
        model.setData(data);
        redis.set(key,model,Constants.CachingExpire);
        return res;
    }

    @Override
    @Transactional
    public Pair<Long,String> createLabel(String labelName, String userId, String icon, Boolean isList, MultipartFile file, FileService fileService) {
       TaskLabel label = new TaskLabel();
       label.setName(labelName);
       label.setIsList(isList);
       label.setCreateTime(Constants.Now());
       label.setNotCustom(false);
       label.setUserId(userId);

       if(file==null){
           if(label.getIsList()&&icon.equals(Constants.DefaultListIcon))
               label.setIcon(Constants.DefaultListIcon);
           else if(!label.getIsList()&&icon.equals(Constants.DefaultLabelIcon))
               label.setIcon(Constants.DefaultLabelIcon);
       }
       else
           label.setIcon(updateIconOptions(isList,icon,file,fileService));
       labelMapper.insert(label);
       return Pair.makePair(label.getId(),label.getIcon());
    }

    @Override
    @Transactional
    public String updateLabel(Long labelId, String labelName, String icon, Boolean isList, MultipartFile file, FileService fileService) {
        LambdaUpdateWrapper<TaskLabel> wrapper = new LambdaUpdateWrapper<>();
        wrapper.set(TaskLabel::getName,labelName);
        if(file!=null)
        {
            icon = updateIconOptions(isList,icon,file,fileService);
            wrapper.set(TaskLabel::getIcon,icon);
        }
        wrapper.eq(TaskLabel::getId,labelId);
        labelMapper.update(wrapper);
        return icon;
    }

    /*
    * 标签名不可重复，清单可以，故需要在键入标签名检测
     */
    @Override
    public boolean checkLabelNameExists(String labelName) {
        LambdaQueryWrapper<TaskLabel> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(TaskLabel::getName,labelName).eq(TaskLabel::getIsList,false);
        Long count = labelMapper.selectCount(wrapper);
        return count > 0;
    }

    private String updateIconOptions(boolean isList, String icon, MultipartFile file, FileService fileService){
        String fileName;
        if(isList){
            if(!icon.equals(Constants.DefaultListIcon))
                fileService.removeImage(icon);
        }
        else{
            if(!icon.equals(Constants.DefaultLabelIcon))
                fileService.removeImage(icon);
        }
        fileName = fileService.uploadImage(file);
        return fileName;
    }
}
