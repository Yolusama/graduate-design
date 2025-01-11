package SelfSchedule.Entity.VO;

import SelfSchedule.Entity.Handler.MapTypeHandler;
import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Getter;
import lombok.Setter;
import org.apache.ibatis.type.JdbcType;

import java.util.Date;
import java.util.Map;

@Getter
@Setter
public class TaskRuleComboVO {
    private Long taskId;
    private Long instanceId;
    private String userId;
    private Date beginTime;
    private Date endTime;
    private Date createTime;
    private String title;
    private String description;
    private Integer priority;
    private Boolean repeatable;
    private Integer state;
    private Integer period;
    private Integer periodUnit;
    private Integer count;
    private Date deadline;
    private Map<String,Integer> custom;
}
