package SelfSchedule.DbOption.Mapper;

import SelfSchedule.Entity.HabitReminder;
import SelfSchedule.Entity.VO.HabitReminderVO;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface HabitReminderMapper extends BaseMapper<HabitReminder> {
    Integer batchInsert(@Param("reminders") List<HabitReminder> reminders);

    @Update("update HabitReminder set ${ew.sqlSet} ${ew.customSqlSegment}")
    Integer update(@Param(Constants.WRAPPER) Wrapper<HabitReminder> wrapper);
    @Select("select id as reminderId,time from HabitReminder where habitId=#{habitId}")
    List<HabitReminderVO> getHabitReminders(@Param("habitId") String habitId);
    @Delete("delete from HabitReminder where habitId=#{habitId}")
    int delete(@Param("habitId")String habitId);
}
