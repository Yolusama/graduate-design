package SelfSchedule.DbOption.ServiceImpl;

import SelfSchedule.Common.CachingKeys;
import SelfSchedule.Common.Constants;
import SelfSchedule.DbOption.Mapper.HabitMapper;
import SelfSchedule.DbOption.Mapper.TaskMapper;
import SelfSchedule.DbOption.Service.IHabitService;
import SelfSchedule.DbOption.Service.ITaskService;
import SelfSchedule.DbOption.Service.IndexServiceInterface;
import SelfSchedule.Entity.Enum.TaskState;
import SelfSchedule.Entity.Habit;
import SelfSchedule.Entity.Task;
import SelfSchedule.Entity.VO.HabitVO;
import SelfSchedule.Entity.VO.IndexDisplayVO;
import SelfSchedule.Entity.VO.TaskRuleComboVO;
import SelfSchedule.Service.RedisCache;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class IndexService implements IndexServiceInterface {
    private final ITaskService taskService;
    private final IHabitService habitService;

    @Autowired
    public IndexService(TaskService taskService,HabitService habitService){
       this.taskService = taskService;
       this.habitService = habitService;
    }

    @Override
    public Map<String, List<IndexDisplayVO>> getData(String userId, RedisCache redis) {

        final String key = String.format("Caching_%s_%s",userId, CachingKeys.GetIndexData);
        if(redis.has(key))
            return (Map<String, List<IndexDisplayVO>>) redis.get(key);
        Map<String, List<IndexDisplayVO>> res = new HashMap<>();
        String key1 = Task.class.getSimpleName().toLowerCase();
        String key2 = Habit.class.getSimpleName().toLowerCase();
        res.put(key1,new ArrayList<IndexDisplayVO>());
        res.put(key2,new ArrayList<IndexDisplayVO>());

        Date now = Constants.Now();
        final int current = 1,size=1000;
        List<TaskRuleComboVO> tasks = taskService.getTasks(current,size,userId,now,redis).getData();
        List<HabitVO> habits = habitService.getHabits(current,size,userId,now,redis).getData();

        for(var task:tasks){
            IndexDisplayVO indexDatum = new IndexDisplayVO();
            indexDatum.setAssociatedId(task.getInstanceId());
            indexDatum.setTitle(task.getTitle());
            indexDatum.setContent(task.getDescription());
            indexDatum.setFinished(task.getState().equals(TaskState.FINISHED.value()));
            indexDatum.setPriority(task.getPriority());
            res.get(key1).add(indexDatum);
        }

        for(var habit:habits){
            IndexDisplayVO indexDatum = new IndexDisplayVO();
            indexDatum.setAssociatedId(habit.getHabitId());
            indexDatum.setTitle(habit.getName());
            indexDatum.setContent(habit.getDescription());
            indexDatum.setFinished(habit.getFinished());
            indexDatum.setThumb(habit.getThumb());
            res.get(key2).add(indexDatum);
        }

        redis.set(key,res,Constants.CachingExpire);

        return res;
    }
}
