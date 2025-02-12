package SelfSchedule.DbOption.Service;

import SelfSchedule.Entity.VO.PagedData;
import SelfSchedule.Entity.VersionStatus;
import SelfSchedule.Model.VersionModel;
import SelfSchedule.Service.RedisCache;
import com.baomidou.mybatisplus.extension.service.IService;

public interface IVersionStatusService extends IService<VersionStatus> {
    String publish(VersionModel model,String adminId);
    PagedData<VersionStatus> getVersions(Integer page,Integer pageSize,String queryKey,Integer year,Integer type,RedisCache redis);
    VersionStatus getLatestVersion();
    VersionStatus getCurrentVersion(String userId,RedisCache redis);
    void resetCurrentVersion(VersionStatus version,String userId,RedisCache redis);
}
