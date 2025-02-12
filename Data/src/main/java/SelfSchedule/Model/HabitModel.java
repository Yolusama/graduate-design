package SelfSchedule.Model;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Getter
@Setter
public class HabitModel {
    private String habitId;
    private String userId;
    private String name;
    private String thumb;
    private String description;
    private Date beginDate;
    private Integer priority;
    private Integer aimDays;
    private List<HabitReminderModel> reminderModels;
    private Long groupId;
    private Integer persistDays;
    private Integer continuousDays;
    private Integer mostDays;
    private Map<String,Integer> days;
    private Integer weekPersistDays;
    private Integer period;
    private Date recordDay;
}
