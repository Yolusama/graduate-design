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
     * 发布版本的操作者的id
     */
    private String adminId;
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
     * 创建时间
     */
    private Date createTime;
    /**
     * 版本类型，1.正式版，2.α测试版，3.β测试版,4.γ测试版
     */
    private Integer type;
    /**
     * 文件名称
     */
    private String fileName;
}
