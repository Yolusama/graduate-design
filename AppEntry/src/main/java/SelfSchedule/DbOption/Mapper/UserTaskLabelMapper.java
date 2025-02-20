package SelfSchedule.DbOption.Mapper;

import SelfSchedule.Entity.TaskLabel;
import SelfSchedule.Entity.UserTaskLabel;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface UserTaskLabelMapper extends BaseMapper<UserTaskLabel> {
    Integer batchInsert(@Param("labels") List<UserTaskLabel> userLabels);
    TaskLabel getLabel(@Param("userId")String userId, @Param("labelName")String labelName);

    @Update("update UserTaskLabel set ${ew.sqlSet} ${ew.customSqlSegment}")
    int update(@Param(Constants.WRAPPER) Wrapper<UserTaskLabel> wrapper);
}
