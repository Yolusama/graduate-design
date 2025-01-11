package SelfSchedule.Entity.Enum;

public enum TaskState {
    FINISHED(1),UNFINISHED(2),CANCELLED(3),ABANDONED(4);
    private final int val;
    TaskState(int value){
        this.val = value;
    }
    public int value(){return val;}
}
