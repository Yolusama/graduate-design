package SelfSchedule.Model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserPwdModel {
    private String userId;
    private String newPassword;
    private String email;
    private String checkCode;
}
