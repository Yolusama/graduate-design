package SelfSchedule.Entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import org.apache.ibatis.type.JdbcType;

import java.util.Date;

/**
 * (Habit)实体类
 *
 * @author makejava
 * @since 2024-12-30 09:42:49
 */
@TableName("Habit")
@Data
public class Habit{
    public Habit(){}
    public Habit(String id){
        this.id = id;
    }
    /**
     * 习惯id，自增
     */
    @TableId
    private String id;
    /**
     * 用户id
     */
    private String userId;
    /**
     * 习惯的名称
     */
    private String name;
    /**
     * 习惯的图标
     */
    private String thumb;
    /**
     * 创建时间
     */
    private String description;
    /**
     * 习惯优先级，1.重要且紧急，2.重要不紧急，3.不重要但是紧急，4.不重要也不紧急
     */
    private Date createTime;
    /**
     * 开始日期
     */
    private Date beginDate;
    /**
     * 习惯组id
     */
    private Long groupId;

    /**
     * 习惯信息更新时间
     */
    private Date updateTime;
    /**
    * 删除标识，0.表示未删除，1.表示删除
    */
    @TableField(jdbcType = JdbcType.TINYINT)
    private Boolean deleteFlag;
}

