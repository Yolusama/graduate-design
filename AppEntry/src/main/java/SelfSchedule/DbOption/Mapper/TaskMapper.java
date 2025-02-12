package SelfSchedule.DbOption.Mapper;

import SelfSchedule.Entity.Task;
import SelfSchedule.Entity.VO.TaskRuleComboVO;
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
public interface TaskMapper extends BaseMapper<Task> {
    List<TaskRuleComboVO> getTasks(Page<TaskRuleComboVO>page, @Param("userId")String UserId,@Param("time")Date time,
                                   @Param("leftBound")Date leftBound,@Param("rightBound")Date rightBound,
                                   @Param("labelId")Long labelId);
    List<TaskRuleComboVO> getTasksWithState(Page<TaskRuleComboVO>page,@Param("state") Integer state,
                                            @Param("userId")String userId);
    TaskRuleComboVO getTask(@Param("userId")String userId,@Param("taskId")Long taskId,@Param("time")Date time,
                            @Param("leftBound")Date leftBound,@Param("rightBound")Date rightBound);
    List<TaskRuleComboVO> getRecycledTasks(Page<TaskRuleComboVO> page,@Param("userId")String userId);
    Long getTaskCount(@Param("userId")String userId,@Param("state")Integer state);
    Long getDurationTaskCounts(@Param("userId")String userId,@Param("leftBound")Date leftBound,
                                     @Param("rightBound")Date rightBound);

    @Update("update Task set state=#{state} where id=#{taskId}")
    Integer changeState(@Param("state")Integer state,@Param("taskId")Long taskId);
    @Update("update Task set ${ew.sqlSet} ${ew.customSqlSegment}")
    int update(@Param(Constants.WRAPPER)Wrapper<Task> wrapper);
    @Select("select repeatable from Task where id=#{taskId}")
    Boolean isRepeatable(@Param("taskId")Long taskId);
    @Select("select beginTime from Task where id=#{taskId}")
    Date getTaskBeginTime(@Param("taskId")Long taskId);
    @Select("select id from Task where userId=#{userId}")
    List<Long> getUserTaskIds(@Param("userId")String userId);

}
