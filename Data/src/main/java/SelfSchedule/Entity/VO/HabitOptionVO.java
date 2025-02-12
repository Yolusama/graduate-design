package SelfSchedule.Entity.VO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HabitOptionVO {
    private Integer persistDays;
    private Integer continuousDays;
    private Integer mostDays;

    public HabitOptionVO(){}

    public HabitOptionVO(Integer persistDays, Integer continuousDays, Integer mostDays) {
        this.persistDays = persistDays;
        this.continuousDays = continuousDays;
        this.mostDays = mostDays;
    }
}
