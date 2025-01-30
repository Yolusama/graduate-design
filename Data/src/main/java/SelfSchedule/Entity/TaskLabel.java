package SelfSchedule.Entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import org.apache.ibatis.type.JdbcType;

import java.util.Date;

@Data
@TableName("TaskLabel")
public class TaskLabel {
    /**
     * 任务标签表id，自增
     */
    @TableId(type = IdType.AUTO)
    private Long id;
    /**
     * 任务表关联的用户id
     */
    private String userId;
    /**
     * 标签名
     */
    private String name;
    /**
     * 显示模式，1.显示，0.隐藏
     */
    @TableField(jdbcType = JdbcType.TINYINT)
    private Boolean display;
    /**
     * 创建时间
     */
    private Date createTime;
    /**
     * 更新时间
     */
    private Date updateTime;
    /**
     * 是否属于清单，1.是，0否
     */
    @TableField(jdbcType = JdbcType.TINYINT)
    private Boolean isList;
    /**
     * 是否属于用户自定义，1.是，0否
     */
    @TableField(jdbcType = JdbcType.TINYINT)
    private Boolean notCustom;
    /**
    *清单图标
     */
    private String icon;

    public static final Long Today = 1L;
    public static final Long Tomorrow = 2L;
    public static final Long Yesterday = 3L;
    public static final Long Finished = 5L;
    public static final Long Abandoned = 6L;
    public static final Long Cancelled = 7L;
    public static final Long RecycleBin = 8L;

    public static Boolean isBaseLabel(Long id){
        final Long[] baseIds = {Today,Tomorrow,Yesterday,Finished,Abandoned,Cancelled,RecycleBin};
        for(int i=0;i<baseIds.length;i++)
        {
            if(id.equals(baseIds[i]))
                return true;
        }
        return false;
    }
}
