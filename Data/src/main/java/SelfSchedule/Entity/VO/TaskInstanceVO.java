package SelfSchedule.Entity.VO;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class TaskInstanceVO {
    private Long taskId;
    private Long instanceId;
    private Date beginTime;
    private Date endTime;
    private String description;
    private Integer priority;
    private String userid;
    private String title;
    private Integer state;
    private Integer repeatable;
}
