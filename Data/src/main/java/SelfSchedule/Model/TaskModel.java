package SelfSchedule.Model;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.Map;

@Getter
@Setter
public class TaskModel {
    private Long taskId;
    private Long instanceId;
    private String userId;
    private Date beginTime;
    private Date endTime;
    private String description;
    private Integer priority;
    private String title;
    private TaskReminderInfoModel[] reminderInfoModels;
    private Integer period;
    private Integer periodUnit;
    private Map<String,Integer> custom;
    private Integer count;
    private Date deadline;
    private Boolean repeatable;
}
