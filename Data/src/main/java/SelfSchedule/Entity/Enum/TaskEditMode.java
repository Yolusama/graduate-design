package SelfSchedule.Entity.Enum;

public enum TaskEditMode {
    ALL(0),ONLYTHIS(1),THISNALL(2);
    private final int val;
    TaskEditMode(int value){
        val = value;
    }
    public int value(){return val;}
}
