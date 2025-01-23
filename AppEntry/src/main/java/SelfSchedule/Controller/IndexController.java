package SelfSchedule.Controller;

import SelfSchedule.Common.CachingKeys;
import SelfSchedule.DbOption.Service.IndexServiceInterface;
import SelfSchedule.DbOption.ServiceImpl.IndexService;
import SelfSchedule.Entity.TaskLabel;
import SelfSchedule.Entity.VO.IndexDisplayVO;
import SelfSchedule.Result.ActionResult;
import SelfSchedule.Service.RedisCache;
import SelfSchedule.annotation.ClearRedisCache;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
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

    @GetMapping("/GetData/{userId}/{labelId}")
    @ApiOperation(value="获取数据",notes = "返回map，以task，habit的类名为键")
    @ClearRedisCache(keys = {CachingKeys.GetTasks,CachingKeys.GetTasksDateValue,
            CachingKeys.GetHabits,CachingKeys.GetHabitsDateValue})
    public CompletableFuture<ActionResult<Map<String, List<IndexDisplayVO>>>> GetData(@PathVariable String userId,
                                                                                      @PathVariable Long labelId,
                                                                                      HttpServletRequest request){
        return CompletableFuture.completedFuture(successWithData(indexService.getData(userId,labelId,redis)));
    }

    @GetMapping("/GetLabels/{userId}")
    @ApiOperation(value="获取用户的标签/清单",notes = "用户id为空的是系统自带清单")
    public CompletableFuture<ActionResult<List<TaskLabel>>> GetLabels(@PathVariable String userId){
        return CompletableFuture.completedFuture(successWithData(indexService.getLabels(userId,redis)));
    }

}
