package SelfSchedule.Controller;

import SelfSchedule.DbOption.Service.IVersionStatusService;
import SelfSchedule.DbOption.ServiceImpl.VersionStatusService;
import SelfSchedule.Service.RedisCache;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Api/Version")
public class VersionController extends ControllerBase{
    private final IVersionStatusService versionService;

    @Autowired
    private VersionController(VersionStatusService versionService, RedisCache redis){
        this.versionService = versionService;
        this.redis = redis;
    }
}
