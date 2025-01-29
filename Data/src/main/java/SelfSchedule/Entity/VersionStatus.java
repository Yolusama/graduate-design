package SelfSchedule.Entity;

import java.util.Date;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@TableName("VersionStatus")
@Data
public class VersionStatus {

    /**
    * 版本id
    */
    @TableId
    private String id;
    /**
    * 版本类型，1.正式版，2.α测试版，3.β测试版，4.标准测试版
    */
    private Integer type;
    /**
    * 版号
    */
    private String number;
    /**
    * 发布时间
    */
    private Date publishDate;
    /**
    * 版本描述信息
    */
    private String description;
    /**
     * 作者相关内容
     */
    private String authorAbout;
}
