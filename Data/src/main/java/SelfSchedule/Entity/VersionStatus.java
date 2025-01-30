package SelfSchedule.Entity;

import java.util.Date;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@TableName("VersionStatus")
@Data
public class VersionStatus {
    public VersionStatus(){

    }

    public VersionStatus(String id) {
        this.id = id;
    }

    /**
    * 版本id
    */
    @TableId
    private String id;
    /**
    * 版号
    */
    private String number;
    /**
    * 发布日期
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
    /**
     * 版本代号
     */
    private String code;
    /**
     * 创建设计
     */
    private Date createTime;
}
