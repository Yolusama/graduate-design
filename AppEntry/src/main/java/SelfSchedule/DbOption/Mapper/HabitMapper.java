package SelfSchedule.DbOption.Mapper;

import SelfSchedule.Entity.Habit;
import SelfSchedule.Entity.VO.HabitVO;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.Date;
import java.util.List;

@Mapper
public interface HabitMapper extends BaseMapper<Habit> {
    List<HabitVO> getHabits(Page<HabitVO> page, @Param("userId")String userId);
    List<HabitVO> getRecycledHabit(Page<HabitVO> page,@Param("userId")String userId);

    @Update("update Habit set ${ew.sqlSet} ${ew.customSqlSegment}")
    Integer update(@Param(Constants.WRAPPER)Wrapper<Habit> wrapper);
    @Select("select id from Habit where userId=#{userId}")
    List<String> getUserHabitIds(@Param("userId")String userId);
    @Select("select beginDate from Habit where id=#{habitId}")
    Date getHabitBeginDate(@Param("habitId")String habitId);
}
