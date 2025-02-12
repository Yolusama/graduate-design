package SelfSchedule.Model;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.Map;

@Getter
@Setter
public class TaskRepeatRuleModel {
    private Long taskId;
    private Long instanceId;
    private Integer period;
    private Integer periodUnit;
    private Map<String,Integer> custom;
    private Integer count;
    private Date deadline;
    private Date taskBeginTime;
}
