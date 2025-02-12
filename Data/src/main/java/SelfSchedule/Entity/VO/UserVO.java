package SelfSchedule.Entity.VO;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class UserVO {
    private String id;
    private String email;
    private String nickname;
    private String avatar;
    private Integer role;
    private Date lastLoginTime;
    private Date createTime;
    private Boolean status;
    private String account;
}
