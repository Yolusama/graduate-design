package SelfSchedule.DbOption.Service;

import SelfSchedule.Entity.Habit;
import SelfSchedule.Entity.HabitGroup;
import SelfSchedule.Entity.VO.*;
import SelfSchedule.Model.HabitModel;
import SelfSchedule.Model.HabitRecordModel;
import SelfSchedule.Service.FileService;
import SelfSchedule.Service.RedisCache;
import com.baomidou.mybatisplus.extension.service.IService;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

public interface IHabitService extends IService<Habit> {
    String createHabit(HabitModel model);
    PagedData<HabitVO> getHabits(Integer current, Integer pageSize, String userId, Date time,boolean recycled, RedisCache redis);
    List<HabitGroup> getHabitGroups(String userId,RedisCache redis);
    Long createHabitGroup(String userId,String habitName);
    HabitModel updateHabit(HabitModel model);
    String uploadThumb(MultipartFile image, String habitId,String originalFileName, FileService fileService);
    int removeGroup(String userId,Long groupId,Integer code);
    HabitOptionVO finishOrNot(HabitRecordModel model);
    List<HabitReminderVO> getReminders(String habitId);
    int removeHabit(String habitId);
    boolean isInFrequency(String habitId,Date day,Long habitBeginDate);
    List<HabitRecordVO> getHabitRecords(String habitId);
    List<HabitReminderInfoVO> getCurrentReminders(String userId, Date currentTime,RedisCache redis);
    void removeAllAbout(String userId);
    int recover(String habitId);
    int remove(String habitId);
    PagedData<HabitVO> getHabits(Integer page,Integer pageSize, String userId);
}

