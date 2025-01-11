package SelfSchedule.Entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.util.Date;

@TableName("HabitGroup")
@Data
public class HabitGroup {
    /**
     * id,自增
     */
    @TableId(type = IdType.AUTO)
    private Long id;
    /**
     * 用户id
     */
    private String userId;
    /**
     * 组名称
     */
    private String name;
    /**
     * 习惯信息更新时间
     */
    private Date updateTime;
    /**
     * 习惯分组的编号值
     */
    private Integer code;
}
