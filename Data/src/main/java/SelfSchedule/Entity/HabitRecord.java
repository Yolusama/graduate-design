package SelfSchedule.Entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import org.apache.ibatis.type.JdbcType;

import java.util.Date;

@TableName("HabitRecord")
@Data
public class HabitRecord{
    /**
     * 习惯完成记录id
     */
    @TableId(type= IdType.AUTO)
    private Long id;
    /**
     * 每次打卡的时间
     */
    private Date finishTime;
    /**
     * 习惯id
     */
    private String habitId;
    /**
     * 习惯重复时是否完成
     */
    @TableField(jdbcType = JdbcType.TINYINT)
    private Boolean finished;
    /**
     * 习惯重复时的那一天的日期
     */
    private Date day;
    /**
     * 更新时间
     */
    private Date updateTime;

}

