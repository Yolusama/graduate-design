package SelfSchedule.Entity.Enum;

public enum SchedulePriority {
    INU(1),IBNU(2),NIBU(3),NIONU(4);

    private final int val;
    private SchedulePriority(int value)
    {
        this.val = value;
    }

    public int value(){return val;}
}
