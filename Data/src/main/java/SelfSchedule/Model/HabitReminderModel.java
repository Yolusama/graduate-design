package SelfSchedule.Model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HabitReminderModel {
    private Long reminderId;
    private String time;
    private Boolean toDelete;
}
