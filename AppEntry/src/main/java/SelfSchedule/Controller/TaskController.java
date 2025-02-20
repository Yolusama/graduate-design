package SelfSchedule.Controller;

import SelfSchedule.Common.CachingKeys;
import SelfSchedule.Common.Constants;
import SelfSchedule.Common.Pair;
import SelfSchedule.DbOption.Service.ITaskService;
import SelfSchedule.DbOption.ServiceImpl.TaskService;
import SelfSchedule.Entity.VO.*;
import SelfSchedule.Model.TaskModel;
import SelfSchedule.Model.TaskReminderModel;
import SelfSchedule.Model.TaskRepeatRuleModel;
import SelfSchedule.Result.ActionResult;
import SelfSchedule.Service.RedisCache;
import SelfSchedule.annotation.ClearRedisCache;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/Api/Task")
@Api(tags = "日程：任务实例行为控制器")
public class TaskController extends ControllerBase
{
    private final ITaskService taskService;

    @Autowired
    public TaskController(TaskService taskService,RedisCache redis){
        this.taskService = taskService;
        this.redis = redis;
    }

    @PutMapping("/CreateTask")
    @ApiOperation(value ="创建任务",notes="创建任务")
    @ClearRedisCache(keys = {CachingKeys.GetTasksDateValue,CachingKeys.GetTasks,CachingKeys.GetIndexData})
    public ActionResult<Long> CreateTask(@RequestBody TaskModel model,HttpServletRequest request){
        Long res = taskService.createTask(model);
        if(res>0)
            return successWithData("任务创建成功！",res);
        else
            return fail("任务创建失败！");
    }

    @GetMapping("/GetTasks/{userId}")
    @ApiOperation(value = "获取某天的任务日程",notes="异步获取某天的任务日程并分页处理")
    @ClearRedisCache(keys = {CachingKeys.GetIndexData})
    public CompletableFuture<ActionResult<PagedData<TaskRuleComboVO>>> GetTasks(
            @RequestParam Integer page,@RequestParam Integer pageSize,@RequestParam Long time,
            @PathVariable String userId,HttpServletRequest request
    ){
        return CompletableFuture.completedFuture(
                successWithData(
                        taskService.getTasks(page,pageSize,userId,new Date(time),null , redis)
                ));
    }

    @GetMapping("/GetTaskReminders/{taskId}")
    @ApiOperation(value="获取任务的提醒时间",notes="以任务id搜索任务提醒")
    public CompletableFuture<ActionResult<List<TaskReminderVO>>> GetTaskReminders(@PathVariable Long taskId){
        if(taskId == null)
            return CompletableFuture.completedFuture(fail("任务id不能为空", HttpStatus.BAD_REQUEST));
        return CompletableFuture.completedFuture(successWithData(taskService.getTaskReminders(taskId)));
    }

    @PostMapping("/CancelTask")
    @ApiOperation(value = "取消任务，表示用户界面的删除",notes = "形式删除")
    @ClearRedisCache(keys = {CachingKeys.GetTasksDateValue,CachingKeys.GetTasks,CachingKeys.GetIndexData})
    public ActionResult CancelTask(@RequestBody TaskModel model, @RequestParam Integer mode, HttpServletRequest request){
        int res = taskService.cancelTask(model,mode);
        if(res== Constants.EOF)
            return fail("不支持的模式！");
        return ok("已移除任务！");
    }


    @PutMapping("/AddReminder")
    @ApiOperation(value = "添加任务提醒",notes = "任务/可重复任务的提醒")
    @ClearRedisCache(keys = {CachingKeys.GetTasksDateValue,CachingKeys.GetTasks})
    public ActionResult<Long> AddReminder(@RequestBody TaskReminderModel model,@RequestParam Integer mode, HttpServletRequest request)
    {
        Long res = taskService.addReminder(model,mode);
        if(res==Constants.AbNormalState)
            return fail("添加提醒失败！");
        else
            return successWithData(res);
    }

    @PutMapping("/RemoveReminder")
    @ApiOperation(value = "移除任务提醒",notes = "任务/可重复任务的提醒")
    @ClearRedisCache(keys = {CachingKeys.GetTasksDateValue,CachingKeys.GetTasks})
    public ActionResult RemoveReminder(@RequestBody TaskReminderModel model,@RequestParam Integer mode, HttpServletRequest request)
    {
        int res = taskService.removeReminder(model,mode);
        if(res==Constants.AbNormalState)
            return fail();
        else
            return ok();
    }

    @PatchMapping("/ChangeRepeatRule")
    @ApiOperation(value = "修改可重复任务的重复规则",notes = "只有任务的主任务能够修改重复规则")
    @ClearRedisCache(keys = {CachingKeys.GetTasksDateValue,CachingKeys.GetTasks,CachingKeys.GetIndexData})
    public ActionResult ChangeRepeatRule(@RequestBody TaskRepeatRuleModel model,@RequestParam Integer mode, HttpServletRequest request){
        int res = taskService.changeRepeatRule(model,mode);
        if(res == Constants.AbNormalState)
            return fail();
        else
            return ok();
    }

    @PostMapping("/UpdateTask")
    @ApiOperation(value = "更新任务的基本信息",notes = "不同的更新下的效果会不同")
    @ClearRedisCache(keys = {CachingKeys.GetTasksDateValue,CachingKeys.GetTasks,CachingKeys.GetIndexData})
    public ActionResult UpdateTask(@RequestBody TaskModel model,@RequestParam Integer mode, HttpServletRequest request){
        int res = taskService.updateTask(model,mode);
        if(res == Constants.EOF)
            return fail("无效的模式！");
        return ok("修改完成!");
    }

    @PatchMapping("/FinishOrNot/{taskId}")
    @ApiOperation(value = "完成或取消完成任务",notes = "完成或取消完成")
    @ClearRedisCache(keys = {CachingKeys.GetTasksDateValue,CachingKeys.GetTasks,CachingKeys.GetIndexData,
            CachingKeys.GetTaskCountsMode})
    public ActionResult FinishOrNot(@PathVariable Long taskId,@RequestParam Integer state,HttpServletRequest request){
       int res = taskService.finishOrNot(taskId,state);
       if(res==Constants.AbNormalState)
           return fail(HttpStatus.NOT_FOUND);
       return ok();
    }

    @GetMapping("/GetCurrentTaskReminders/{userId}")
    @ApiOperation(value = "获取用户当前时间下的任务提醒",notes = "获取用户当前时间下的任务提醒")
    public CompletableFuture<ActionResult<List<TaskReminderInfoVO>>> GetCurrentTaskReminders(
            @PathVariable String userId,@RequestParam Long currentTime){
        return CompletableFuture.completedFuture(
                successWithData(
                        taskService.getCurrentTaskReminders(userId,new Date(currentTime))
                ));
    }

    @PostMapping("/FreshReminderTiming/{taskId}")
    @ApiOperation(value = "刷新当前任务id下提醒时间",notes = "刷新用户当前时间下的任务提醒时间")
    public ActionResult FreshReminderTiming(@PathVariable Long taskId,@RequestParam Long taskBeginTime){
        boolean res = taskService.freshReminderTiming(taskId,new Date(taskBeginTime));
        if(res)
            return ok("已刷新提醒时间！");
        else
            return ok();
    }

    @PutMapping("/RemoveTask")
    @ApiOperation(value = "形式删除当前任务",notes = "重复任务的主实例才会被放入回收站")
    @ClearRedisCache(keys = {CachingKeys.GetTasksDateValue,CachingKeys.GetTasks,CachingKeys.GetIndexData,
            CachingKeys.GetTaskCountsMode})
    public ActionResult RemoveTask(@RequestBody TaskModel model,@RequestParam Integer mode,HttpServletRequest request){
        int res = taskService.removeTask(model,mode);
        if(res==Constants.AbNormalState)
            return fail();
        return ok("已移动至回收站！");
    }

    @GetMapping("/GetFinishedTaskCount/{userId}")
    @ApiOperation(value = "获取完成的任务数",notes = "获取完成的任务数")
    public ActionResult<Long> GetFinishedTaskCount(@PathVariable String userId){
        return successWithData(taskService.getFinishedTaskCount(userId));
    }

    @GetMapping("/GetFinishedTaskCounts/{userId}")
    @ApiOperation(value = "获取段时间完成的任务数",notes = "段时间为日，周，月模式")
    public CompletableFuture<ActionResult<List<Pair<Date,Long>>>> GetFinishedCounts(@PathVariable String userId,
                                                                         @RequestParam Integer mode,
                                                                         @RequestParam Long today){
        return CompletableFuture.completedFuture(
                successWithData(taskService.getFinishedTaskCounts(userId,mode,new Date(today),redis))
        );
    }
}
