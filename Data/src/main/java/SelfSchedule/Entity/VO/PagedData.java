package SelfSchedule.Entity.VO;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class PagedData<T> {
    private List<T> data;
    private long total;

    public PagedData(){
        data = new ArrayList<>();
        total = 0;
    }
    public PagedData(List<T> data, long total) {
        this.data = data;
        this.total = total;
    }
}
