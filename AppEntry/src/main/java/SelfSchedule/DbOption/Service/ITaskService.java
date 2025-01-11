package SelfSchedule.DbOption.Service;

import SelfSchedule.Entity.Task;
import SelfSchedule.Entity.VO.*;
import SelfSchedule.Model.TaskModel;
import SelfSchedule.Model.TaskReminderModel;
import SelfSchedule.Model.TaskRepeatRuleModel;
import SelfSchedule.Service.RedisCache;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.Date;
import java.util.List;

public interface ITaskService extends IService<Task> {
   Long createTask(TaskModel model);
   PagedData<TaskRuleComboVO> getTasks(Integer current, Integer pageSize, String userId, Date time, RedisCache redis);
   List<TaskReminderVO> getTaskReminders(Long taskId);
   int cancelTask(TaskModel model,Integer mode);
   int updateTask(TaskModel model,Integer mode);
   Long addReminder(TaskReminderModel model,Integer mode);
   int removeReminder(TaskReminderModel model,Integer mode);
   int changeRepeatRule(TaskRepeatRuleModel model,Integer mode);
   TaskRuleVO getRepeatRule(Long taskId);
}
