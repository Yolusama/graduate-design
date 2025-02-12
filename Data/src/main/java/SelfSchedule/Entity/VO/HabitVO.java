package SelfSchedule.Entity.VO;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.Map;

@Getter
@Setter
public class HabitVO extends IndexDisplayVO {
    private String habitId;
    private String userId;
    private String name;
    private String thumb;
    private String description;
    private Long groupId;
    private String groupName;
    private Integer groupCode;
    private Integer persistDays;
    private Integer mostDays;
    private Integer continuousDays;
    private Date beginDate;
    private Integer aimDays;
    private Map<String,Integer> days;
    private Integer weekPersistDays;
    private Integer period;
    private Boolean finished;
    private Date finishTime;
}
