package SelfSchedule.DbOption.Mapper;

import SelfSchedule.Entity.TaskLabel;
import SelfSchedule.Entity.VO.TaskLabelVO;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface TaskLabelMapper extends BaseMapper<TaskLabel> {
    List<TaskLabelVO> getLabels(@Param("userId")String userId);
    List<TaskLabelVO> getHiddenLabels(@Param("userId")String userId);
    Long labelExists(@Param("userId")String userId,@Param("labelName")String labelName);
    List<Long> getUserTaskLabelIds(@Param("userId")String userId);

    @Update("update TaskLabel set ${ew.sqlSet} ${ew.customSqlSegment}")
    int update(@Param(Constants.WRAPPER) Wrapper<TaskLabel> wrapper);
}
