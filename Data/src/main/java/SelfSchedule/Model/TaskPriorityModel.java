package SelfSchedule.Model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskPriorityModel {
    private Long taskId;
    private Long instanceId;
    private Integer priority;
    private Boolean repeatable;
}
