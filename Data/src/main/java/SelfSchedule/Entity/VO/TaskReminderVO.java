package SelfSchedule.Entity.VO;

import java.util.Date;

public class TaskReminderVO {
    private Long reminderId;
    private Date timing;
    private Integer mode;
    private Integer value;

    public Long getReminderId() {
        return reminderId;
    }

    public void setReminderId(Long reminderId) {
        this.reminderId = reminderId;
    }


    public Date getTiming() {
        return timing;
    }

    public void setTiming(Date timing) {
        this.timing = timing;
    }

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

}
