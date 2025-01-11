package SelfSchedule.Entity;

import SelfSchedule.Entity.Handler.MapTypeHandler;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import org.apache.ibatis.type.JdbcType;

import java.util.Date;
import java.util.Map;


@TableName(value = "HabitFrequency",autoResultMap = true)
@Data
public class HabitFrequency{
    /**
     * id主键，自增
     */
    @TableId(type = IdType.AUTO)
    private Long id;
    /**
     * 习惯id
     */
    private String habitId;
    /**
     * 频率每周的日子，周一，周二等执行
     */
    @TableField(jdbcType = JdbcType.OTHER,typeHandler = MapTypeHandler.class,value = "days")
    private Map<String,Integer> days;
    /**
     * 每周多少天，最大值7
     */
    private Integer weekPersistDays;
    /**
     * 每隔多少天
     */
    private Integer period;
    /**
     * 更新时间
     */
    private Date updateTime;
}

