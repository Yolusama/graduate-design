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
import java.util.Objects;

@TableName(value = "TaskRepeatRule",autoResultMap = true)
@Data
public class TaskRepeatRule{
    /**
     * 主键id,自增
     */
    @TableId(type = IdType.AUTO)
    private Long id;
    /**
     * 任务id
     */
    private Long taskId;
    /**
     * 任务状态更新时间
     */
    private Date updateTime;
    /**
     * 任务执行周期（不可重复任务值置空）
     */
    private Integer period;
    /**
     * 执行周期单位：1.天，2.周，3.月，4.年
     */
    private Integer periodUnit;
    /**
     *重复次数
     */
    private Integer count;
    /**
     * 重复截止时间
     */
    private Date deadline;
    /**
     * 自定义规则
     */
    @TableField(jdbcType = JdbcType.OTHER,typeHandler = MapTypeHandler.class,value ="custom")
    private Map<String,Integer> custom;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TaskRepeatRule that = (TaskRepeatRule) o;
        return Objects.equals(taskId, that.taskId) && Objects.equals(period, that.period) && Objects.equals(periodUnit, that.periodUnit) && Objects.equals(count, that.count) && Objects.equals(deadline, that.deadline) && Objects.equals(custom, that.custom);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }
}

