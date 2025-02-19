package SelfSchedule.DbOption.Mapper;

import SelfSchedule.Entity.TaskLabel;
import SelfSchedule.Entity.VO.TaskLabelVO;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface TaskLabelMapper extends BaseMapper<TaskLabel> {
    @Update("update TaskLabel set ${ew.sqlSet} ${ew.customSqlSegment}")
    int update(@Param(Constants.WRAPPER) Wrapper<TaskLabel> wrapper);
    @Select("select icon from TaskLabel where id=#{labelId}")
    String getIcon(@Param("labelId")Long labelId);
    @Select("select id as labelId,name as labelName,userId,icon,isList,notCustom,display from TaskLabel where (userId is null " +
            "or userId=#{userId}) and display=1 order by userId")
    List<TaskLabelVO> getLabels(@Param("userId")String userId);
    @Select("select id as labelId,name as labelName,userId,icon,isList,notCustom,display from TaskLabel where userId=#{userId}" +
            " and display=0")
    List<TaskLabelVO> getHiddenLabels(@Param("userId")String userId);
}
