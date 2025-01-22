package SelfSchedule.Entity.VO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IndexDisplayVO {
    private Object associatedId;
    private String title;
    private String content;
    private String thumb;
    private Integer priority;
    private Boolean finished;
}
