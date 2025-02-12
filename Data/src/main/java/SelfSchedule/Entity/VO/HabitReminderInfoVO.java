package SelfSchedule.Entity.VO;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class HabitReminderInfoVO {
    private String habitId;
    private String habitName;
    private String habitDescription;
    private String habitThumb;
    private Date habitBeginDate;
    private String time;
}
