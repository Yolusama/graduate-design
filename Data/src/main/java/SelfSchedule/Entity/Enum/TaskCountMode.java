package SelfSchedule.Entity.Enum;

public enum TaskCountMode {
    DAY(0),WEEK(1),MONTH(2);
    private final int val;
    TaskCountMode(int value)
    {
        this.val = value;
    }

    public int value(){return val;}
}
