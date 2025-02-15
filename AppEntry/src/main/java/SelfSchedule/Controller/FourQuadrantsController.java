package SelfSchedule.Controller;

import SelfSchedule.Common.CachingKeys;
import SelfSchedule.Common.Constants;
import SelfSchedule.DbOption.Service.ITaskService;
import SelfSchedule.DbOption.ServiceImpl.TaskService;
import SelfSchedule.Entity.VO.TaskRuleComboVO;
import SelfSchedule.Model.TaskModel;
import SelfSchedule.Model.TaskPriorityModel;
import SelfSchedule.Result.ActionResult;
import SelfSchedule.Service.RedisCache;
import SelfSchedule.annotation.ClearRedisCache;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/Api/FourQuadrants")
@Api(tags="四象限内容控制api")
public class FourQuadrantsController extends ControllerBase {
    private final ITaskService taskService;

    @Autowired
    public FourQuadrantsController(TaskService taskService, RedisCache redis){
        this.taskService = taskService;
        this.redis = redis;
    }

    @GetMapping("/GetTasks/{userId}")
    @ApiOperation(value="以每个象限为键对应优先级中的数据",notes="键名称为quadrant-(1,2,3,4)对应优先级的值")
    @ClearRedisCache(keys = {CachingKeys.GetIndexData})
    public CompletableFuture<ActionResult<Map<String, List<TaskRuleComboVO>>>> GetTasks(@PathVariable String userId,
            @RequestParam Long time,HttpServletRequest request){
        return CompletableFuture.completedFuture(successWithData(taskService.getTasks(userId,new Date(time),redis)));
    }

    @PostMapping("/UpdateTask")
    @ApiOperation(value="在四象限的编辑界面中更新任务",notes="更新任务")
    @ClearRedisCache(keys = {CachingKeys.GetTasks,CachingKeys.GetTasksDateValue,CachingKeys.GetIndexData})
    public ActionResult UpdateTask(@RequestBody TaskModel model, HttpServletRequest request){
        taskService.updateTask(model);
        return ok("更新完成！");
    }

    @PatchMapping("/ChangePriority")
    @ApiOperation(value="在四象限的界面中拖拽至象限改变优先级",notes="修改任务优先级")
    @ClearRedisCache(keys = {CachingKeys.GetTasks,CachingKeys.GetTasksDateValue,CachingKeys.GetIndexData})
    public ActionResult ChangePriority(@RequestBody TaskPriorityModel model, HttpServletRequest request){
        int res = taskService.changePriority(model);
        if(res==Constants.AbNormalState)
            return fail();
        return ok();
    }


}
