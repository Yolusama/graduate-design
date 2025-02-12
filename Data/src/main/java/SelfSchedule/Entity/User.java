package SelfSchedule.Entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import org.apache.ibatis.type.JdbcType;

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
     * 用户账号
     */
    private String account;
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
    /**
     * 用户状态，1.正常，0.异常
     */
    @TableField(jdbcType = JdbcType.TINYINT)
    private Boolean status;

    public String getDefaultPassword(){
        final int startIndex = 0;
        final int endIndex = 6;
        return account.substring(startIndex,endIndex);
    }
}

