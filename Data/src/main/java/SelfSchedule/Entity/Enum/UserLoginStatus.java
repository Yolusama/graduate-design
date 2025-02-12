package SelfSchedule.Entity.Enum;

public enum UserLoginStatus
{
    SUCCESS(1), NOT_EXISTS(2),FAIL(3),CHECK_FAILED(4),NOT_ADMIN(5),USER_EXCEPTION(6);

    private final int status;
    UserLoginStatus(int status){
        this.status = status;
    }

    public int value(){return status;}
}
