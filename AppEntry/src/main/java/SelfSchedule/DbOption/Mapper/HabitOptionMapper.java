package SelfSchedule.DbOption.Mapper;

import SelfSchedule.Entity.HabitOption;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface HabitOptionMapper extends BaseMapper<HabitOption> {
    @Update("update HabitOption set ${ew.sqlSet} ${ew.customSqlSegment}")
    int update(@Param(Constants.WRAPPER) Wrapper<HabitOption> wrapper);
    @Delete("delete from HabitOption where habitId=#{habitId}")
    int remove(@Param("habitId")String habitId);
}
