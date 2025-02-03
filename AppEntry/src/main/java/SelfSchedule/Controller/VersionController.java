package SelfSchedule.Controller;

import SelfSchedule.Common.CachingKeys;
import SelfSchedule.DbOption.Service.IVersionStatusService;
import SelfSchedule.DbOption.ServiceImpl.VersionStatusService;
import SelfSchedule.Entity.VersionStatus;
import SelfSchedule.Functional.RandomGenerator;
import SelfSchedule.Model.VersionModel;
import SelfSchedule.Result.ActionResult;
import SelfSchedule.Service.FileService;
import SelfSchedule.Service.RedisCache;
import SelfSchedule.annotation.ClearRedisCache;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/Api/Version")
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

    @GetMapping("/GetCurrentVersion")
    @ApiOperation(value = "获取当前版本",notes = "获取当前版本")
    public CompletableFuture<ActionResult<VersionStatus>> GetCurrentVersion(){
        return CompletableFuture.completedFuture(
                successWithData(versionService.getCurrentVersion(redis))
        );
    }

    @GetMapping("/Download/{fileName}")
    public HttpEntity<byte[]> Download(@PathVariable String fileName){
        return fileResult(fileName,fileService.toDownload(fileName));
    }
}
