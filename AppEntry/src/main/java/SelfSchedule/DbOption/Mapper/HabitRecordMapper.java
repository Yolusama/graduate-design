package SelfSchedule.DbOption.Mapper;

import SelfSchedule.Entity.HabitRecord;
import SelfSchedule.Entity.VO.HabitRecordVO;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface HabitRecordMapper extends BaseMapper<HabitRecord> {
    @Update("update HabitRecord set ${ew.sqlSet} ${ew.customSqlSegment}")
    int update(@Param(Constants.WRAPPER)Wrapper<HabitRecord> wrapper);
    @Delete("delete from HabitRecord where habitId=#{habitId}")
    int remove(@Param("habitId")String habitId);
    @Select("select finished from HabitRecord where habitId=#{habitId} order by day desc")
    List<Boolean> getFinishStatesOrdered(@Param("habitId")String habitId);
    @Select("select day,finished,finishTime from HabitRecord where habitId = #{habitId}")
    List<HabitRecordVO> getHabitRecords(@Param("habitId")String habitId);
}
