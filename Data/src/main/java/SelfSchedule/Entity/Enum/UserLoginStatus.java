package SelfSchedule.Entity.Enum;

public enum UserLoginStatus
{
    SUCCESS(1), NOT_EXISTS(2),FAIL(3),CHECKFAILED(4);

    private final int status;
    UserLoginStatus(int status){
        this.status = status;
    }

    public int value(){return status;}
}
