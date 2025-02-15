package SelfSchedule.DbOption.Mapper;

import SelfSchedule.Entity.HabitOption;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import org.apache.ibatis.annotations.*;

@Mapper
public interface HabitOptionMapper extends BaseMapper<HabitOption> {
    @Update("update HabitOption set ${ew.sqlSet} ${ew.customSqlSegment}")
    int update(@Param(Constants.WRAPPER) Wrapper<HabitOption> wrapper);
    @Delete("delete from HabitOption where habitId=#{habitId}")
    int remove(@Param("habitId")String habitId);
    @Update("update HabitOption set continuousDays = 0 where habitId=#{habitId}")
    int clearContinuousDays(@Param("habitId")String habitId);
}
