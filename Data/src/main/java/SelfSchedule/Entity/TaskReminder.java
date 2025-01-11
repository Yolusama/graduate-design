package SelfSchedule.Entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.util.Date;

@TableName("TaskReminder")
@Data
public class TaskReminder{
    /**
     * 任务提醒，主键id,自增
     */
    @TableId(type = IdType.AUTO)
    private Long id;
    /**
     * 任务id
     */
    private Long taskId;
    /**
     * 提醒时机，表述在任务开始之前的时间
     */
    private Date timing;
    /**
     * 提醒模式，1.分钟，2.小时，3.天，4.周，5.月
     */
    private Integer mode;
    /**
     *提醒模式下的数值
     */
    private Integer value;

}

