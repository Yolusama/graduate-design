package SelfSchedule.Controller;

import SelfSchedule.DbOption.Service.IHabitService;
import SelfSchedule.DbOption.Service.ITaskService;
import SelfSchedule.DbOption.Service.IndexServiceInterface;
import SelfSchedule.DbOption.ServiceImpl.HabitService;
import SelfSchedule.DbOption.ServiceImpl.IndexService;
import SelfSchedule.DbOption.ServiceImpl.TaskService;
import SelfSchedule.Entity.VO.IndexDisplayVO;
import SelfSchedule.Result.ActionResult;
import SelfSchedule.Service.RedisCache;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/Api/Index")
@Api(tags = "首页功能控制api")
public class IndexController extends ControllerBase{
    private final IndexServiceInterface indexService;
    @Autowired
    public IndexController(IndexService indexService, RedisCache redis){
        this.indexService = indexService;
        this.redis = redis;
    }

    @GetMapping("/GetData/{userId}")
    @ApiOperation(value="获取数据",notes = "返回map，以task，habit的类名为键")
    public CompletableFuture<ActionResult<Map<String, List<IndexDisplayVO>>>> GetData(@PathVariable String userId){
        return CompletableFuture.completedFuture(successWithData(indexService.getData(userId,redis)));
    }

}
