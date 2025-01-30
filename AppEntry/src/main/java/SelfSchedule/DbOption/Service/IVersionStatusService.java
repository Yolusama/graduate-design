package SelfSchedule.DbOption.Service;

import SelfSchedule.Entity.VersionStatus;
import SelfSchedule.Model.VersionModel;
import com.baomidou.mybatisplus.extension.service.IService;

public interface IVersionStatusService extends IService<VersionStatus> {
    String publish(VersionModel model);
}
