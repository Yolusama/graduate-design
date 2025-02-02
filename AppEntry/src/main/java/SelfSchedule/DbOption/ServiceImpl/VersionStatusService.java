package SelfSchedule.DbOption.ServiceImpl;

import SelfSchedule.Common.CachingKeys;
import SelfSchedule.Common.Constants;
import SelfSchedule.DbOption.Mapper.VersionStatusMapper;
import SelfSchedule.DbOption.Service.IVersionStatusService;
import SelfSchedule.Entity.Enum.VersionType;
import SelfSchedule.Entity.VO.PagedData;
import SelfSchedule.Entity.VersionStatus;
import SelfSchedule.Functional.RandomGenerator;
import SelfSchedule.Model.VersionModel;
import SelfSchedule.Service.RedisCache;
import SelfSchedule.Utils.ObjectUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Calendar;
import java.util.Date;

@Service
public class VersionStatusService extends ServiceImpl<VersionStatusMapper,VersionStatus> implements IVersionStatusService {
    private final VersionStatusMapper mapper;

    @Autowired
    public VersionStatusService(VersionStatusMapper mapper){
        this.mapper = mapper;
    }

    @Override
    @Transactional
    public String publish(VersionModel model, String adminId) {
        VersionStatus version = new VersionStatus(RandomGenerator.generateVersionId());
        version.setCreateTime(Constants.Now());
        version.setCode(model.getVersionCode());
        version.setPublishDate(model.getPublishDate());
        version.setType(model.getType());
        version.setDownloadLink(model.getDownloadLink());
        version.setDescription(model.getDescription());
        version.setNumber(model.getVersionNumber());
        version.setAdminId(adminId);
        mapper.insert(version);
        return version.getId();
    }

    @Override
    public VersionStatus getLatestVersion() {
        return mapper.getLatestVersion(null);
    }

    @Override
    public VersionStatus getCurrentVersion(RedisCache redis) {
        final String key = CachingKeys.GetCurrentVersion;
        if(redis.has(key))
            return (VersionStatus) redis.get(key);
        VersionStatus currentVersion = mapper.getLatestVersion(VersionType.FULL.value());
        redis.set(key,currentVersion,Constants.MonthExpire);
        return currentVersion;
    }

    @Override
    public PagedData<VersionStatus> getVersions(Integer page, Integer pageSize, String queryKey, Integer year,
                                                String type,RedisCache redis) {
        LambdaQueryWrapper<VersionStatus> wrapper = new LambdaQueryWrapper<>();
        boolean flag = false;
        if(ObjectUtil.isRequestParamStrNull(queryKey))
        {
            wrapper.and(q->q.like(VersionStatus::getId,queryKey).or().like(VersionStatus::getNumber,queryKey));
            flag = true;
        }
        if(year!=null)
        {
            Date leftBound = new Date(year, Calendar.JANUARY,1);
            Date rightBound = new Date(leftBound.getTime());
            rightBound.setYear(rightBound.getYear()+1);
            wrapper.and(q->q.gt(VersionStatus::getPublishDate,leftBound).lt(VersionStatus::getPublishDate,rightBound));
            flag = true;
        }
        if(type!=null)
        {
            wrapper.eq(VersionStatus::getType,type);
            flag = true;
        }
        if(!flag)
            if(redis.has(CachingKeys.GetVersions))
               return (PagedData<VersionStatus>)redis.get(CachingKeys.GetVersions);
        else
            redis.remove(CachingKeys.GetVersions);
        Page<VersionStatus> pagination = mapper.selectPage(Page.of(page,pageSize),wrapper);
        PagedData<VersionStatus> res = new PagedData<>(pagination.getRecords(),pagination.getTotal());
        redis.set(CachingKeys.GetVersions,res,Constants.CachingExpire);
        return res;
    }
}
