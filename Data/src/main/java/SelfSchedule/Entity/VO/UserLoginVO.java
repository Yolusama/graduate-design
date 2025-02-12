package SelfSchedule.Entity.VO;

import SelfSchedule.Entity.Enum.UserLoginStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserLoginVO {
    private String id;
    private String email;
    private String nickname;
    private String avatar;
    private Integer role;
    private UserLoginStatus loginStatus;
    private String token;
    private String account;
}
