package SelfSchedule.DbOption.Mapper;

import SelfSchedule.Entity.TaskReminder;
import SelfSchedule.Entity.VO.TaskReminderInfoVO;
import SelfSchedule.Entity.VO.TaskReminderVO;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.Date;
import java.util.List;

@Mapper
public interface TaskReminderMapper extends BaseMapper<TaskReminder> {
    Integer batchInsert(@Param("reminders") List<TaskReminder> reminders);
    List<TaskReminderInfoVO> getCurrentReminders(@Param("userId")String userId, @Param("leftBound") Date leftBound,
                                                 @Param("rightBound")Date rightBound);

    @Select("select tr.id as reminderId,tr.mode,tr.value,tr.timing from TaskReminder tr where tr.taskId=#{taskId} order by timing")
    List<TaskReminderVO> getTaskReminders(@Param("taskId")Long taskId);
    @Update("update TaskReminder set ${ew.sqlSet} ${ew.customSqlSegment}")
    int update(@Param("ew") Wrapper<TaskReminder> wrapper);
    @Update("update TaskReminder set taskId=#{newTaskId} where taskId=#{taskId}")
    int updateTaskId(@Param("newTaskId")Long newTaskId,@Param("taskId")Long taskId);
}
