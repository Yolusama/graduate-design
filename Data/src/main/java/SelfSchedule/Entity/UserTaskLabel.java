package SelfSchedule.Entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import org.apache.ibatis.type.JdbcType;

import java.util.Date;

@TableName("UserTaskLabel")
@Data
public class UserTaskLabel {
    /**
     * 用户标签表id,自增
     */
    @TableId(type = IdType.AUTO)
    private Long id;
    /**
     * 用户id
     */
    private String userId;
    /**
     * 标签id
     */
    private Long labelId;
    /**
     * 是否隐藏，1.是，0.否
     */
    @TableField(jdbcType = JdbcType.TINYINT)
    private Boolean display;
    /**
     * 更新时间
     */
    private Date updateTime;
}
