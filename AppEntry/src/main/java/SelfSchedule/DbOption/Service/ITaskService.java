package SelfSchedule.DbOption.Service;

import SelfSchedule.Common.Pair;
import SelfSchedule.Entity.Task;
import SelfSchedule.Entity.VO.*;
import SelfSchedule.Model.TaskModel;
import SelfSchedule.Model.TaskPriorityModel;
import SelfSchedule.Model.TaskReminderModel;
import SelfSchedule.Model.TaskRepeatRuleModel;
import SelfSchedule.Service.FileService;
import SelfSchedule.Service.RedisCache;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface ITaskService extends IService<Task> {
   Long createTask(TaskModel model);
   PagedData<TaskRuleComboVO> getTasks(Integer current, Integer pageSize, String userId, Date time,Long labelId, RedisCache redis);
   Map<String,List<TaskRuleComboVO>> getTasks(String userId,Date time,RedisCache redis);
   List<TaskReminderVO> getTaskReminders(Long taskId);
   int cancelTask(TaskModel model,Integer mode);
   int removeTask(TaskModel model,Integer mode);
   int updateTask(TaskModel model,Integer mode);
   void updateTask(TaskModel model);
   Long addReminder(TaskReminderModel model,Integer mode);
   int removeReminder(TaskReminderModel model,Integer mode);
   int changeRepeatRule(TaskRepeatRuleModel model,Integer mode);
   int finishOrNot(Long taskId,Integer state);
   int changePriority(TaskPriorityModel model);
   List<TaskReminderInfoVO> getCurrentTaskReminders(String userId, Date currentTime);
   boolean freshReminderTiming(Long taskId,Date taskBeginTime);
   void removeAllAbout(String userId,FileService fileService);
   int remove(Long taskId);
   int recover(Long taskId);
   Long getFinishedTaskCount(String userId);
   List<Pair<Date, Long>> getFinishedTaskCounts(String userId, Integer mode, Date today, RedisCache redis);
}
