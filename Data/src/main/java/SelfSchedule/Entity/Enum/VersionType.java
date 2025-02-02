package SelfSchedule.Entity.Enum;

public enum VersionType {
    FULL(1),ALPHA_TEST(2),BETA_TEST(3),GAMA_TEST(4);
    private final int val;
    VersionType(int value){
        val = value;
    }
    public int value(){return val;}
}
