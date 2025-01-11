package SelfSchedule.DbOption.Mapper;

import SelfSchedule.Entity.Task;
import SelfSchedule.Entity.VO.TaskRuleComboVO;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;

import java.util.Date;
import java.util.List;

@Mapper
public interface TaskMapper extends BaseMapper<Task> {
    List<TaskRuleComboVO> getTasks(Page<TaskRuleComboVO>page, @Param("userId")String UserId,
                                   @Param("leftBound")Date leftBound,@Param("rightBound")Date rightBound);
    TaskRuleComboVO getTask(@Param("userId")String userId,@Param("taskId")Long taskId,
                            @Param("leftBound")Date leftBound,@Param("rightBound")Date rightBound);

    @Update("update Task set state=#{state} where id=#{taskId}")
    Integer changeState(@Param("state")Integer state,@Param("taskId")Long taskId);
    @Update("update Task set ${ew.sqlSet} ${ew.customSqlSegment}")
    int update(@Param(Constants.WRAPPER)Wrapper<Task> wrapper);
}
