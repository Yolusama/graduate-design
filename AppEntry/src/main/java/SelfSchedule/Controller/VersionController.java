package SelfSchedule.Controller;

import SelfSchedule.Common.CachingKeys;
import SelfSchedule.DbOption.Service.IVersionStatusService;
import SelfSchedule.DbOption.ServiceImpl.VersionStatusService;
import SelfSchedule.Entity.VersionStatus;
import SelfSchedule.Model.VersionModel;
import SelfSchedule.Result.ActionResult;
import SelfSchedule.Service.FileService;
import SelfSchedule.Service.RedisCache;
import SelfSchedule.Annotation.ClearRedisCache;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/Api/Version")
@Api(tags = "版本控制api")
public class VersionController extends ControllerBase{
    private final IVersionStatusService versionService;
    private final FileService fileService;

    @Autowired
    public VersionController(VersionStatusService versionService,FileService fileService, RedisCache redis){
        this.versionService = versionService;
        this.fileService = fileService;
        this.redis = redis;
    }

    @PutMapping("/Publish/{adminId}")
    @ClearRedisCache(keys = {CachingKeys.GetCurrentVersion,CachingKeys.GetVersions})
    @ApiOperation(value = "发布版本",notes = "发布版本")
    public ActionResult<String> Publish(@RequestBody VersionModel model, @PathVariable String adminId, HttpServletRequest request){
        return successWithData(versionService.publish(model,adminId));
    }

    @GetMapping("/GetCurrentVersion/{userId}")
    @ApiOperation(value = "获取当前版本",notes = "获取当前版本")
    public CompletableFuture<ActionResult<VersionStatus>> GetCurrentVersion(@PathVariable String userId){
        return CompletableFuture.completedFuture(
                successWithData(versionService.getCurrentVersion(userId, redis))
        );
    }

    @GetMapping("/Download/{fileName}")
    @ApiOperation(value = "下载文件",notes = "下载文件")
    public HttpEntity<byte[]> Download(@PathVariable String fileName){
        return fileResult(fileName,fileService.toDownload(fileName));
    }

    @GetMapping("/GetLatestVersion")
    @ApiOperation(value = "获取最新版本",notes = "获取最新版本")
    public ActionResult<VersionStatus> GetLatestVersion(){
        return successWithData(versionService.getLatestVersion());
    }

    @PostMapping("/ResetCurrentVersion/{userId}")
    @ApiOperation(value = "重新设置用户当前版本",notes = "重新设置用户当前版本")
    public ActionResult ResetCCurrentVersion(@PathVariable String userId,@RequestBody VersionStatus version){
        versionService.resetCurrentVersion(version,userId,redis);
        return ok();
    }
}
