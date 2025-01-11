package SelfSchedule.DbOption.Mapper;

import SelfSchedule.Entity.TaskInstance;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.Date;
import java.util.List;

@Mapper
public interface TaskInstanceMapper extends BaseMapper<TaskInstance> {
    /**
     * 获取重复任务的主任务id下的所有实例id
     * @param taskId
     */
    @Select("select instanceId from TaskInstance where taskId=#{taskId}")
    List<Long> getRepeatIds(@Param("taskId")Long taskId);
    /**
     *获取某一时间下的主任务下的重复id
     */
    List<Long> getRepeatIdsUnder(@Param("timeLimit")Date timeLimit, @Param("taskId")Long taskId);
    /**
     * 根据提醒的模式获取主任务id下的所有任务实例id
     * @param taskId
     * @param mode
     * @param value
     */
    List<Long> getReminderIds(@Param("taskId")Long taskId,@Param("mode")Integer mode,@Param("value")Integer value);

    @Update("update TaskInstance SET ${ew.sqlSet}  ${ew.customsqlSegment}")
    int update(@Param(Constants.WRAPPER)Wrapper<TaskInstance> wrapper);
    @Update("update TaskInstance set taskId = #{taskId} where instanceId = #{taskId}")
    int setMainTaskBeSelf(@Param("taskId")Long taskId);
    @Update("update TaskInstance set taskId=#{newTaskId} where taskId=#{taskId} and instanceId!=#{taskId}")
    int setTaskIdFor(@Param("newTaskId")Long newTaskId,@Param("taskId")Long taskId);
}
