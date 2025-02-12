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
        version.setPublishDate(model.getPublishDate());
        version.setType(model.getVersionType());
        version.setFileName(model.getFileName());
        version.setDescription(model.getDescription());
        version.setNumber(model.getVersionNumber());
        version.setAdminId(adminId);
        mapper.insert(version);
        return version.getId();
    }

    @Override
    public VersionStatus getLatestVersion() {
        return mapper.getLatestVersion(VersionType.FULL.value());
    }

    @Override
    public VersionStatus getCurrentVersion(String userId, RedisCache redis) {
        final String key = String.format("Caching_%s_%s",userId,CachingKeys.GetCurrentVersion);
        if(redis.has(key))
            return (VersionStatus) redis.get(key);
        VersionStatus currentVersion = //mapper.getLatestVersion(null);
                mapper.getLatestVersion(VersionType.FULL.value());
        redis.set(key,currentVersion,Constants.MonthExpire);
        return currentVersion;
    }

    @Override
    public PagedData<VersionStatus> getVersions(Integer page, Integer pageSize, String queryKey, Integer year,
                                                Integer type, RedisCache redis) {
        LambdaQueryWrapper<VersionStatus> wrapper = new LambdaQueryWrapper<>();
        boolean flag = false;
        if(ObjectUtil.isRequestParamStrNull(queryKey))
        {
            wrapper.and(q->q.like(VersionStatus::getId,queryKey).or().like(VersionStatus::getNumber,queryKey));
            flag = true;
        }
        if(year!=null)
        {
            final Integer javaDateBegin = 1900;
            Date leftBound = new Date(year-javaDateBegin, Calendar.JANUARY,1);
            Date rightBound = new Date(leftBound.getTime());
            rightBound.setYear(rightBound.getYear()+1);
            wrapper.and(q->q.ge(VersionStatus::getPublishDate,leftBound).lt(VersionStatus::getPublishDate,rightBound));
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
        wrapper.orderByDesc(VersionStatus::getCreateTime);
        Page<VersionStatus> pagination = mapper.selectPage(Page.of(page,pageSize),wrapper);
        PagedData<VersionStatus> res = new PagedData<>(pagination.getRecords(),pagination.getTotal());
        redis.set(CachingKeys.GetVersions,res,Constants.CachingExpire);
        return res;
    }

    @Override
    public void resetCurrentVersion(VersionStatus version, String userId, RedisCache redis) {
        final String key = String.format("Caching_%s_%s",userId,CachingKeys.GetCurrentVersion);
        if(redis.has(key))
            redis.remove(key);
        redis.set(key,version,Constants.MonthExpire);
    }
}
