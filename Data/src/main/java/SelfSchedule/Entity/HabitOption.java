package SelfSchedule.Entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.util.Date;
import java.io.Serializable;

/**
 * (Habitoption)实体类
 *
 * @author makejava
 * @since 2024-12-30 09:42:50
 */
@TableName("HabitOption")
@Data
public class HabitOption {
    /**
     * 习惯选项信息id
     */
    @TableId(type = IdType.AUTO)
    private Long id;
    /**
     * 习惯id
     */
    private String habitId;
    /**
     * 坚持的目标天数,-1代表一直要坚持
     */
    private Integer aimDays;
    /**
     * 更新时间
     */
    private Date updateTime;

    /**
     * 习惯完成的总天数
     */
    private Integer persistDays;
    /**
     * 连续完成天数
     */
    private Integer continuousDays;
    /**
     * 最多坚持天数
     */
    private Integer mostDays;
}

