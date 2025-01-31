package SelfSchedule.DbOption.ServiceImpl;

import SelfSchedule.Common.Constants;
import SelfSchedule.DbOption.Mapper.VersionStatusMapper;
import SelfSchedule.DbOption.Service.IVersionStatusService;
import SelfSchedule.Entity.VersionStatus;
import SelfSchedule.Functional.RandomGenerator;
import SelfSchedule.Model.VersionModel;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class VersionStatusService extends ServiceImpl<VersionStatusMapper,VersionStatus> implements IVersionStatusService {
    private final VersionStatusMapper mapper;

    @Autowired
    public VersionStatusService(VersionStatusMapper mapper){
        this.mapper = mapper;
    }

    @Override
    @Transactional
    public String publish(VersionModel model) {
        VersionStatus version = new VersionStatus(RandomGenerator.generateVersionId());
        version.setCreateTime(Constants.Now());
        version.setCode(model.getVersionCode());
        version.setPublishDate(model.getPublishDate());
        version.setAuthorAbout(model.getAuthorAbout());
        version.setDescription(model.getDescription());
        version.setNumber(model.getVersionNumber());
        mapper.insert(version);
        return version.getId();
    }
}
