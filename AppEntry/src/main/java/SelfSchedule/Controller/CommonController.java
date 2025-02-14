package SelfSchedule.Controller;

import SelfSchedule.Common.CachingKeys;
import SelfSchedule.Common.Constants;
import SelfSchedule.Common.ValueText;
import SelfSchedule.Model.ArrayDataModel;
import SelfSchedule.Result.ActionResult;
import SelfSchedule.Service.FileService;
import SelfSchedule.Service.RedisCache;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RequestMapping("/Api/Common")
@RestController
@Api(tags="通用api")
public class CommonController extends ControllerBase
{
    private final FileService fileService;

    @Autowired
    public CommonController(RedisCache redis,FileService fileService){
        this.redis = redis;
        this.fileService = fileService;
    }


    @GetMapping("/Heartbeat")
    @ApiOperation(value="心跳请求",notes="前后端通信的心跳请求")
    public ActionResult Heartbeat()
    {
        return ok("心跳请求...");
    }

    @GetMapping("/GetDefaultThumbs")
    @ApiOperation(value="获取默认的图标",notes="获取默认图标")
    public CompletableFuture<ActionResult<ValueText[]>> GetDefaultThumbs()
    {
        ArrayDataModel<ValueText> model;
         if(redis.has(CachingKeys.GetDefaultThumbs))
             model =(ArrayDataModel<ValueText>) redis.get(CachingKeys.GetDefaultThumbs);
         else {
             model = new ArrayDataModel<>();
             model.setData(Constants.DefaultThumbs);
             redis.set(CachingKeys.GetDefaultThumbs, model, Constants.CachingExpire);
         }
         return CompletableFuture.completedFuture(successWithData(model.getData()));
    }

    @GetMapping("/GetNotifyAudios")
    @ApiOperation(value = "获取系统提醒音效",notes = "获取系统提醒音效")
    public CompletableFuture<ActionResult<String[]>> GetNotifyAudios(){
        ArrayDataModel<String> model;
        if(redis.has(CachingKeys.GetNotifyAudios))
            model =(ArrayDataModel<String>)redis.get(CachingKeys.GetNotifyAudios);
        else{
            model = new ArrayDataModel<>();
            model.setData(fileService.getSystemNotifyAudios());
            redis.set(CachingKeys.GetNotifyAudios,model,Constants.CachingExpire);
        }
        return CompletableFuture.completedFuture(successWithData(model.getData()));
    }

}
