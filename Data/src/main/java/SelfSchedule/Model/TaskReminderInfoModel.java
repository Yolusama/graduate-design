package SelfSchedule.Model;

import java.util.Date;

public class TaskReminderInfoModel {
    private Integer mode;
    private Integer value;
    private Date timing;

    public Integer getMode() {
        return mode;
    }

    public void setMode(Integer mode) {
        this.mode = mode;
    }

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    public Date getTiming() {
        return timing;
    }

    public void setTiming(Date timing) {
        this.timing = timing;
    }
}
