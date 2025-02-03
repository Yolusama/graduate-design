package SelfSchedule.Model;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class VersionModel {
    private String versionId;
    private String versionNumber;
    private Date publishDate;
    private String description;
    private String fileName;
    private Integer versionType;
}
