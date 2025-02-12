package SelfSchedule.Entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import org.apache.ibatis.type.JdbcType;

import java.util.Date;

@Data
@TableName("TaskInstance")
public class TaskInstance{
    /**
     * 任务实例id
     */
    @TableId(type=IdType.AUTO)
    private Long id;
    /**
     * 任务id
     */
    private Long taskId;
    /**
     * 重复任务下的对应任务id，非重复任务，值与任务id相同
     */
    private Long instanceId;
    /**
     * 删除标识
     */
    @TableField(jdbcType = JdbcType.TINYINT)
    private Boolean flag;
    /**
     * 更新时间
     */
    private Date updateTime;
}

