package SelfSchedule.Controller;

import SelfSchedule.Common.CachingKeys;
import SelfSchedule.Common.Constants;
import SelfSchedule.Common.Pair;
import SelfSchedule.DbOption.Service.IndexServiceInterface;
import SelfSchedule.DbOption.ServiceImpl.IndexService;
import SelfSchedule.Entity.TaskLabel;
import SelfSchedule.Entity.VO.IndexDisplayVO;
import SelfSchedule.Result.ActionResult;
import SelfSchedule.Service.FileService;
import SelfSchedule.Service.RedisCache;
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
    public CompletableFuture<ActionResult<List<TaskLabel>>> GetLabels(@PathVariable String userId){
        return CompletableFuture.completedFuture(successWithData(indexService.getLabels(userId,redis)));
    }

    @PostMapping("/CreateLabel")
    @ApiOperation(value="创建标签",notes = "创建标签")
    @ClearRedisCache(keys = {CachingKeys.GetIndexData,CachingKeys.GetTaskLabels})
    public ActionResult<Pair<Long,String>> CreateLabel(@RequestPart("labelName") String labelName,
                                                       @RequestPart("userId") String userId,@RequestPart("icon")String icon,
                                                       @RequestPart("isList")String isList,
                                                       @RequestPart("file")MultipartFile file,HttpServletRequest request)
    {
        Boolean _isList = Boolean.parseBoolean(isList);
        if(!_isList&&indexService.checkLabelNameExists(labelName))
            return fail("标签名重复！");
          return successWithData(indexService.createLabel(labelName,userId,icon,_isList,file,fileService));
    }

    @PostMapping("/UpdateLabel")
    @ApiOperation(value="更新标签",notes = "更新标签")
    @ClearRedisCache(keys = {CachingKeys.GetIndexData,CachingKeys.GetTaskLabels})
    public ActionResult<String> UpdateLabel(@RequestPart("labelId")Long labelId,@RequestPart("labelName") String labelName,
                                            @RequestPart("icon")String icon, @RequestPart("isList")String isList,
                                            @RequestPart("file")MultipartFile file,HttpServletRequest request)
    {
        Boolean _isList = Boolean.parseBoolean(isList);
        if(!_isList&&indexService.checkLabelNameExists(labelName))
            return fail("标签名重复！");
        return successWithData(indexService.updateLabel(labelId,labelName,icon,_isList,file,fileService));
    }

    @GetMapping("/CheckLabelNameExists")
    @ApiOperation(value="检查标签名是否存在",notes = "标签名为清单时可重复，为标签时不可重复")
    public ActionResult<Boolean> CheckLabelExists(@RequestParam String labelName){
        return successWithData(indexService.checkLabelNameExists(labelName));
    }

    @PatchMapping("/HideOrShowLabel/{labelId}")
    @ApiOperation(value="隐藏或显示标签",notes = "显示或隐藏标签/清单")
    public ActionResult HideOrShowLabel(@PathVariable Long labelId,@RequestParam Boolean display){
        int res = indexService.hideOrShowLabel(display,labelId);
        if(res== Constants.AbNormalState)
            return fail("操作失败！");
        return ok("已隐藏标签/清单");
    }

    @DeleteMapping("/RemoveLabel/{labelId}")
    @ApiOperation(value="移除标签",notes = "移除标签/清单")
    public ActionResult RemoveLabel(@PathVariable Long labelId){
        int res = indexService.removeLabel(labelId);
        if(res== Constants.AbNormalState)
            return fail("操作失败！");
        return ok("已移除标签/清单");
    }

}
