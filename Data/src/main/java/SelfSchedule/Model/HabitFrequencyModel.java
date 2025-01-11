package SelfSchedule.Model;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class HabitFrequencyModel {
    private String habitId;
    private Map<String,Integer> days;
    private Integer weekPersistDays;
    private Integer interval;
}
