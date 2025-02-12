package SelfSchedule.Entity.VO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskLabelVO {
    private Long labelId;
    private String userId;
    private String labelName;
    private Boolean display;
    private Boolean isList;
    private Boolean notCustom;
    private String icon;
}
