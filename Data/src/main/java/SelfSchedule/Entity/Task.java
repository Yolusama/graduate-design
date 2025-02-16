package SelfSchedule.Entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import org.apache.ibatis.type.JdbcType;

import java.util.Date;
import java.util.Objects;

@TableName("Task")
@Data
public class Task{
    /**
     * 任务id
     */
    @TableId(type=IdType.AUTO)
    private Long id;
    /**
     * 用户id
     */
    private String userId;
    /**
     * 任务创建的时间
     */
    private Date createTime;
    /**
     * 任务开始的时间
     */
    private Date beginTime;
    /**
     * 任务结束时间
     */
    private Date endTime;
    /**
     * 任务信息描述
     */
    private String description;
    /**
     * 任务优先级，1.重要且紧急，2.重要不紧急，3.不重要但是紧急，4.不重要也不紧急
     */
    private Integer priority;
    /**
     * 任务标题
     */
    private String title;
    /**
     * 完成状态，1.完成，2.未完成，3.已取消，4.已放弃
     */
    private Integer state;
    /**
     *是否属于可重复任务
     *
     */
    @TableField(jdbcType = JdbcType.TINYINT)
    private Boolean repeatable;
    /**
     * 任务信息更新时间
     */
    private Date updateTime;
    /**
     * 任务完成时间
     */
    private Date finishTime;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Task task = (Task) o;
        return Objects.equals(beginTime, task.beginTime) && Objects.equals(endTime, task.endTime) &&
                Objects.equals(description, task.description) && Objects.equals(priority, task.priority) &&
                Objects.equals(title, task.title);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }
}

