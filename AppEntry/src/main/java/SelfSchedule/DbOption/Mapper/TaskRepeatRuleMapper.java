package SelfSchedule.DbOption.Mapper;

import SelfSchedule.Entity.TaskInstance;
import SelfSchedule.Entity.TaskRepeatRule;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.*;

import java.util.Date;

@Mapper
public interface TaskRepeatRuleMapper extends BaseMapper<TaskRepeatRule> {
    @Select("select r.id,r.taskId,r.period,r.periodUnit,r.count,r.custom,r.deadline from TaskRepeatRule r where r.taskId =#{taskId}")
    TaskRepeatRule getRepeatRule(@Param("taskId")Long taskId);
    @Update("update TaskRepeatRule set taskId = #{instanceId} where taskId = #{taskId}")
    Integer setInstanceId(@Param("taskId")Long taskId,@Param("instanceId")Long instanceId);
    @Update("update TaskRepeatRule set deadline = #{deadline} where taskId=#{taskId}")
    int setDeadline(@Param("deadline")Date deadline,@Param("taskId")Long taskId);
    @Update("update TaskRepeatRule SET ${ew.sqlSet} ${ew.customSqlSegment}")
    int update(@Param("ew") Wrapper<TaskRepeatRule> wrapper);
    @Delete("delete from TaskRepeatRule where taskId=#{taskId}")
    int remove(@Param("taskId")Long taskId);
}
