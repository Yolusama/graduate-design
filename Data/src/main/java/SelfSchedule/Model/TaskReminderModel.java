package SelfSchedule.Model;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class TaskReminderModel{
    private Long reminderId;
    private Long taskId;
    private Long instanceId;
    private Date taskBeginTime;
    private Integer mode;
    private Integer value;
    private Date timing;
}
