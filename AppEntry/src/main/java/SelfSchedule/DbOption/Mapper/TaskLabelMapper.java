package SelfSchedule.DbOption.Mapper;

import SelfSchedule.Entity.TaskLabel;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface TaskLabelMapper extends BaseMapper<TaskLabel> {
    @Update("update TaskLabel set ${ew.sqlSet} ${ew.customSqlSegment}")
    int update(@Param(Constants.WRAPPER) Wrapper<TaskLabel> wrapper);
}
