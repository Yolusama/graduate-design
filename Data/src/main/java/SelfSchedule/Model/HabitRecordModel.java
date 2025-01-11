package SelfSchedule.Model;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class HabitRecordModel {
    private String habitId;
    private Boolean finished;
    private Date finishTime;
    private Date day;
}
