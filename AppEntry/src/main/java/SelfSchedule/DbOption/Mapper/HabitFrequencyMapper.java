package SelfSchedule.DbOption.Mapper;

import SelfSchedule.Entity.HabitFrequency;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface HabitFrequencyMapper extends BaseMapper<HabitFrequency> {
    @Update("update HabitFrequency set ${ew.sqlSet} ${ew.customSqlSegment}")
    Integer update(@Param(Constants.WRAPPER) Wrapper<HabitFrequency> wrapper);
    @Delete("delete from HabitFrequency where habitId=#{habitId}")
    int delete(@Param("habitId")String habitId);
}
