package SelfSchedule.DbOption.Mapper;

import SelfSchedule.Entity.TaskLabelOption;
import SelfSchedule.Entity.VO.TaskLabelVO;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;

import java.util.List;


@Mapper
public interface TaskLabelOptionMapper extends BaseMapper<TaskLabelOption> {
    List<TaskLabelVO> getTaskLabels(@Param("userId")String userId, @Param("taskId")Long taskId);
    @Update("update TaskLabelOption set ${ew.sqlSet} ${ew.customSqlSegment}")
    int update(@Param(Constants.WRAPPER) Wrapper<TaskLabelOption> wrapper);
}
