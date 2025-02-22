package SelfSchedule.Controller;

import SelfSchedule.Common.CachingKeys;
import SelfSchedule.Common.Constants;
import SelfSchedule.DbOption.Service.IndexServiceInterface;
import SelfSchedule.DbOption.ServiceImpl.IndexService;
import SelfSchedule.Entity.VO.IndexDisplayVO;
import SelfSchedule.Entity.VO.TaskLabelOptionVO;
import SelfSchedule.Entity.VO.TaskLabelVO;
import SelfSchedule.Model.ArrayDataModel;
import SelfSchedule.Model.TaskLabelModel;
import SelfSchedule.Result.ActionResult;
import SelfSchedule.Service.FileService;
import SelfSchedule.Service.RedisCache;
import SelfSchedule.Utils.ObjectUtil;
import SelfSchedule.annotation.ClearRedisCache;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/Api/Index")
@Api(tags = "首页功能控制api")
public class IndexController extends ControllerBase{
    private final IndexServiceInterface indexService;
    private final FileService fileService;
    @Autowired
    public IndexController(IndexService indexService,FileService fileService, RedisCache redis){
        this.indexService = indexService;
        this.fileService = fileService;
        this.redis = redis;
    }

    @GetMapping("/GetData/{userId}/{labelId}")
    @ApiOperation(value="获取数据",notes = "返回map，以task，habit的类名为键")
    @ClearRedisCache(keys = {CachingKeys.GetTasks,CachingKeys.GetTasksDateValue,
            CachingKeys.GetHabits,CachingKeys.GetHabitsDateValue})
    public CompletableFuture<ActionResult<Map<String, List<IndexDisplayVO>>>> GetData(@PathVariable String userId,
                                                                                      @PathVariable Long labelId,
                                                                                      @RequestParam Long time,
                                                                                      HttpServletRequest request){
        return CompletableFuture.completedFuture(successWithData(indexService.getData(userId,labelId,new Date(time),redis)));
    }

    @GetMapping("/GetLabels/{userId}")
    @ApiOperation(value="获取用户的标签/清单",notes = "用户id为空的是系统自带清单")
    public CompletableFuture<ActionResult<List<TaskLabelVO>>> GetLabels(@PathVariable String userId){
        return CompletableFuture.completedFuture(successWithData(indexService.getLabels(userId,redis)));
    }

    @PutMapping("/CreateLabel")
    @ApiOperation(value="创建标签",notes = "创建标签")
    @ClearRedisCache(keys = {CachingKeys.GetIndexData,CachingKeys.GetTaskLabels})
    public ActionResult<Long> CreateLabel(@RequestBody TaskLabelModel model, HttpServletRequest request)
    {
        String labelName = model.getLabelName();
        String userId = model.getUserId();
        String icon = model.getIcon();
        Boolean isList = model.getIsList();
        return successWithData(indexService.createLabel(labelName,userId,icon,isList));
    }

    @PatchMapping("/UpdateLabel/{labelId}")
    @ApiOperation(value="更新标签",notes = "更新标签")
    @ClearRedisCache(keys = {CachingKeys.GetIndexData,CachingKeys.GetTaskLabels})
    public ActionResult UpdateLabel(@PathVariable Long labelId,@RequestParam String labelName,
                                           HttpServletRequest request)
    {
        int res = indexService.updateLabel(labelId,labelName);
        if(res==Constants.AbNormalState)
            return fail("更新失败！");
        return ok("已更新！");
    }

    @PostMapping("/UploadLabelIcon")
    @ApiOperation(value="上传标签图标",notes = "上传标签图标")
    public ActionResult<String> UploadLabelIcon(@RequestPart("labelId")String labelId, @RequestPart("icon")String icon,
                                                @RequestPart("isList")String isList, @RequestPart("file")MultipartFile file){
        return successWithData(indexService.uploadLabelIcon(
                Long.parseLong(labelId),icon,Boolean.parseBoolean(isList),file,fileService
        ));
    }

    @GetMapping("/CheckLabelNameExists/{userId}")
    @ApiOperation(value="检查标签名是否存在",notes = "标签名为清单时可重复，为标签时不可重复")
    public ActionResult<Boolean> CheckLabelExists(@PathVariable String userId,@RequestParam String labelName){
        return successWithData(indexService.checkLabelNameExists(labelName,userId));
    }

    @PatchMapping("/HideOrShowLabel/{userId}/{labelId}")
    @ApiOperation(value="隐藏或显示标签",notes = "显示或隐藏标签/清单")
    @ClearRedisCache(keys = {CachingKeys.GetTaskLabels,CachingKeys.GetHiddenLabels})
    public ActionResult HideOrShowLabel(@PathVariable String userId,
                                        @PathVariable Long labelId,
                                        @RequestParam Boolean display,HttpServletRequest request){
        int res = indexService.hideOrShowLabel(userId,display,labelId);
        if(res== Constants.AbNormalState)
            return fail("操作失败！");
        return ok("已隐藏标签/清单");
    }

    @DeleteMapping("/RemoveLabel/{labelId}")
    @ApiOperation(value="移除标签",notes = "移除标签/清单")
    @ClearRedisCache(keys = {CachingKeys.GetTaskLabels,CachingKeys.GetHiddenLabels})
    public ActionResult RemoveLabel(@PathVariable Long labelId,HttpServletRequest request){
        int res = indexService.removeLabel(labelId,fileService);
        if(res== Constants.AbNormalState)
            return fail("操作失败！");
        return ok("已移除标签/清单");
    }

    @PostMapping("/CreateOrGetLabel/{userId}")
    @ApiOperation(value="创建或获取标签",notes = "标签不存在时创建")
    @ClearRedisCache(keys={CachingKeys.GetHiddenLabels,CachingKeys.GetTaskLabels})
    public ActionResult<TaskLabelVO> CreateOrGetLabel(@PathVariable String userId,
                                                      @RequestParam String labelName,
                                                      HttpServletRequest request){
        return successWithData(indexService.createOrCheckLabel(labelName,userId));
    }

    @GetMapping("/GetHiddenLabels/{userId}")
    @ApiOperation(value="获取隐藏的标签",notes = "获取隐藏的标签")
    public CompletableFuture<ActionResult<List<TaskLabelVO>>> GetHiddenLabels(@PathVariable String userId){
        return CompletableFuture.completedFuture(successWithData(indexService.getHiddenLabels(userId,redis)));
    }

    @PostMapping("/CheckYesterdayTask/{userId}")
    @ApiOperation(value="检索用户昨天未完成的任务并标记为搁置",notes = "检索用户昨天未完成的任务并标记为搁置")
    public ActionResult CheckYesterdayTask(@PathVariable String userId,@RequestParam Long yesterday){
        indexService.checkYesterdayTask(new Date(yesterday),userId,redis);
        return ok();
    }

    @PostMapping("/CheckContinuousDays/{userId}")
    @ApiOperation(value="检索用户昨天未完成的习惯并重置连续完成的值",notes = "重置连续完成值到0")
    public ActionResult CheckContinuousDays(@PathVariable String userId,@RequestParam Long yesterday){
        indexService.checkHabitContinuousDays(new Date(yesterday),userId,redis);
        return ok();
    }

    @PostMapping("/Logout/{userId}")
    @ApiOperation(value="退出登录/注销账号",notes = "cancelAccount为真时注销账号")
    public ActionResult Logout(@PathVariable String userId,@RequestParam String email, @RequestParam Boolean cancelAccount){
        indexService.logout(cancelAccount,userId,email,redis,fileService);
        if(cancelAccount)
            return ok("已注销账号！");
        else
            return ok("已退出登录！");
    }

    @PatchMapping("/RemoveOrRecoverTask/{taskId}")
    @ApiOperation(value="删除/恢复回收站中的任务",notes = "删除/恢复回收站中的任务")
    @ClearRedisCache(keys = {CachingKeys.GetIndexData,CachingKeys.GetTasks,CachingKeys.GetTasksDateValue})
    public ActionResult RemoveOrRecoverTask(@PathVariable Long taskId,@RequestParam Boolean isRemove,
                                            HttpServletRequest request){
         int res = indexService.removeOrRecoverTask(taskId,isRemove);
         if(res==Constants.AbNormalState)
             return fail("操作失败！");
         return ok(isRemove?"已正式删除！":"已恢复!");
    }

    @PatchMapping("/RemoveOrRecoverHabit/{habitId}")
    @ApiOperation(value="删除/恢复回收站中的习惯",notes = "删除/恢复回收站中的习惯")
    @ClearRedisCache(keys = {CachingKeys.GetIndexData, CachingKeys.GetHabits,CachingKeys.GetHabitsDateValue})
    public ActionResult RemoveOrRecoverHabit(@PathVariable String habitId,@RequestParam Boolean isRemove,
                                            HttpServletRequest request){
        int res = indexService.removeOrRecoverHabit(habitId,isRemove);
        if(res==Constants.AbNormalState)
            return fail("操作失败！");
        return ok(isRemove?"已正式删除！":"已恢复!");
    }

    @PostMapping("/TakeTaskLabelsFor/{userId}/{taskId}/{listId}")
    @ApiOperation(value = "更新/追加任务标签",notes = "更新/追加任务标签")
    @ClearRedisCache(keys = {CachingKeys.GetTaskLabels,CachingKeys.GetIndexData})
    public ActionResult TakeTaskLabelsFor(@PathVariable String userId, @PathVariable Long taskId,
                                                             @PathVariable String listId,
                                                             @RequestParam Boolean isUpdate,
                                                             @RequestBody ArrayDataModel<Long> model,
                                                             HttpServletRequest request){
        Long _listId = ObjectUtil.isRequestParamStrNull(listId)?null:Long.parseLong(listId);
        indexService.takeTaskLabelsFor(userId,taskId,_listId,isUpdate,model);
        return ok();
    }

    @GetMapping("/GetTaskLabels/{userId}/{taskId}")
    @ApiOperation(value = "获取任务的标签",notes = "获取任务的标签")
    public CompletableFuture<ActionResult<TaskLabelOptionVO>> GetTaskLabels(@PathVariable String userId,
                                                                            @PathVariable Long taskId){
        return CompletableFuture.completedFuture(
                successWithData(indexService.getTaskLabels(taskId,userId))
        );
    }

    @PutMapping("/CreateList/{userId}")
    @ClearRedisCache(keys = {CachingKeys.GetTaskLabels})
    public ActionResult<TaskLabelVO> CreateList(@PathVariable String userId,@RequestParam String listName,
                                                HttpServletRequest request){
        return successWithData(indexService.createList(userId,listName));
    }
}
