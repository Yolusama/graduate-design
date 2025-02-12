package SelfSchedule.Entity.VO;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class TaskReminderInfoVO {
    private Long taskId;
    private String taskTitle;
    private String taskDescription;
    private Integer taskPriority;
    private Integer mode;
    private Integer value;
    private Date timing;
}
