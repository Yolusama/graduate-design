package SelfSchedule.Entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.util.Date;

@TableName("TaskLabelOption")
@Data
public class TaskLabelOption {
    /**
     * 任务标签页情况表id,自增
     */
    @TableId(type = IdType.AUTO)
    private Long id;
    /**
     * 任务id
     */
    private Long taskId;
    /**
     * 标签id
     */
    private Long labelId;
    /**
     * 清单id
     */
    private Long listId;
    /**
     * 更新时间
     */
    private Date updateTime;
}
