package SelfSchedule.Entity.Enum;

public enum UserRole {
    ADMIN(1),VIP(2),COMMON(3);
    private final int val;
    UserRole(int value){
        this.val = value;
    }
    public int value(){return val;}
}
