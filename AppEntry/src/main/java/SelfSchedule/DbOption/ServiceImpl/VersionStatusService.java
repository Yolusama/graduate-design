package SelfSchedule.DbOption.ServiceImpl;

import SelfSchedule.DbOption.Mapper.VersionStatusMapper;
import SelfSchedule.DbOption.Service.IVersionStatusService;
import SelfSchedule.Entity.VersionStatus;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VersionStatusService extends ServiceImpl<VersionStatusMapper,VersionStatus> implements IVersionStatusService {
    private final VersionStatusMapper mapper;

    @Autowired
    public VersionStatusService(VersionStatusMapper mapper){
        this.mapper = mapper;
    }
}
