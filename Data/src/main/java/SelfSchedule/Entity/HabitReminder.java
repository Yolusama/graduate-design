package SelfSchedule.Entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@TableName("HabitReminder")
@Data
public class HabitReminder implements Serializable {
    /**
     *习惯提醒id，自增
     */
    @TableId(type = IdType.AUTO)
    private Long id;
    /**
     * 习惯id
     */
    private String habitId;
    /**
     * 提醒的时间
     */
    private String time;
    /**
     * 习惯信息更新时间
     */
    private Date updateTime;
}

