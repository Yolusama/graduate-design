package SelfSchedule.Entity;

import com.baomidou.mybatisplus.annotation.IdType;
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

    public static Date reloadTiming(Integer mode,Integer value,Date beginTime){
        Date date = new Date(beginTime.getTime());
        switch(mode){
            case 1: date.setMinutes(date.getMinutes()-value);break;
            case 2: date.setHours(date.getHours()-value);break;
            case 3: date.setDate(date.getDate()-value);break;
            case 4: date.setDate(date.getDate()-value*7);break;
            case 5: date.setMonth(date.getMonth()-value);break;
        }
       return date;
    }
}

