package SelfSchedule.Entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.util.Date;

@Data
@TableName("User")
public class User{
    /**
     * 用户id，主键
     */
    @TableId
    private String id;
    /**
     * 用户电子邮箱
     */
    private String email;
    /**
     * 用户登录密码
     */
    private String password;
    /**
     * 用户昵称
     */
    private String nickname;
    /**
     * 用户头像
     */
    private String avatar;
    /**
     * 1.管理员，2.普通用户，3.VIP用户
     */
    private Integer role;
    /**
     *上次登录时间
     */
    private Date lastLoginTime;
   /**
    *用户创建时间
    */
   private Date createTime;

}

