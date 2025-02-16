package SelfSchedule.DbOption.Mapper;

import SelfSchedule.Entity.TaskLabelOption;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;


@Mapper
public interface TaskLabelOptionMapper extends BaseMapper<TaskLabelOption> {
    @Update("update TaskLabelOption set ${ew.sqlSet} ${ew.customSqlSegment}")
    int update(@Param(Constants.WRAPPER) Wrapper<TaskLabelOption> wrapper);
}
