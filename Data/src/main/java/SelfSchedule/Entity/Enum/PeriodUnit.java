package SelfSchedule.Entity.Enum;

public enum PeriodUnit {
    DAILY(1),WEEKLY(2),MONTHLY(3),YEARLY(4);
    private final int val;
    PeriodUnit(int value){
         this.val = value;
    }
    public int value(){return val;}
}
