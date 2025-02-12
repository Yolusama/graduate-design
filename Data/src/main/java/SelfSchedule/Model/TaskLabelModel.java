package SelfSchedule.Model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskLabelModel {
    private Long labelId;
    private String userId;
    private String labelName;
    private String icon;
    private Boolean isList;
}
