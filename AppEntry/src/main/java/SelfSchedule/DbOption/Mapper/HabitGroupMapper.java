package SelfSchedule.DbOption.Mapper;

import SelfSchedule.Entity.HabitGroup;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface HabitGroupMapper extends BaseMapper<HabitGroup> {
    Integer batchInsert(@Param("groups")List<HabitGroup> groups);
    @Select("select max(code) from HabitGroup where userId = #{userId}")
    Integer getMaxCode(@Param("userId")String userId);

    /**
     * 移除分组时将其后面的分组编号都减一以同步
     */
    @Update("update HabitGroup set code = code - 1 where userId = #{userId} and code>#{code}")
    int beforeRemove(@Param("userId")String userId,@Param("code")Integer code);
}
