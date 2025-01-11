package SelfSchedule.Entity.VO;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.Map;

@Getter
@Setter
public class TaskRuleVO {
    private Integer period;
    private Integer periodUnit;
    private Integer count;
    private Date deadline;
    private Map<String,Integer> custom;
}
