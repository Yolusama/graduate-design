package SelfSchedule.DbOption.Mapper;

import SelfSchedule.Entity.VersionStatus;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import io.swagger.models.auth.In;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface VersionStatusMapper extends BaseMapper<VersionStatus> {
    VersionStatus getLatestVersion(@Param("type")Integer type);

    @Update("update User set ${ew.sqlSet} ${ew.customSqlSegment}")
    int update(@Param(Constants.WRAPPER) Wrapper<VersionStatus> wrapper);
}
