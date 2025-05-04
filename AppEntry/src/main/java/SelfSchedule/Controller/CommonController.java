package SelfSchedule.Controller;

import SelfSchedule.Common.CachingKeys;
import SelfSchedule.Common.Constants;
import SelfSchedule.Common.ValueText;
import SelfSchedule.Model.ArrayDataModel;
import SelfSchedule.Result.ActionResult;
import SelfSchedule.Service.FileService;
import SelfSchedule.Service.RedisCache;
import SelfSchedule.Service.VoskService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RequestMapping("/Api/Common")
@RestController
@Api(tags="通用api")
public class CommonController extends ControllerBase
{
    private final FileService fileService;
    private final VoskService voskService;

    @Autowired
    public CommonController(RedisCache redis,FileService fileService,VoskService voskService){
        this.redis = redis;
        this.fileService = fileService;
        this.voskService = voskService;
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

    @PostMapping("/Recording")
    @ApiOperation(value = "转换录音文件内容为字符串",notes = "转换录音文件内容为字符串")
    public CompletableFuture<ActionResult<String>> Recording(@RequestPart("file")MultipartFile file){
        String res = voskService.convert(file);
        if(res.equals(Constants.Error))
            return CompletableFuture.completedFuture(fail("失败！"));
        return CompletableFuture.completedFuture(successWithData(res));
    }

}
