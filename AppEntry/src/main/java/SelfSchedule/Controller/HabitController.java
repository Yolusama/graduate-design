package SelfSchedule.Controller;

import SelfSchedule.Common.CachingKeys;
import SelfSchedule.Common.Constants;
import SelfSchedule.DbOption.Service.IHabitService;
import SelfSchedule.DbOption.ServiceImpl.HabitService;
import SelfSchedule.Entity.HabitGroup;
import SelfSchedule.Entity.VO.*;
import SelfSchedule.Model.HabitModel;
import SelfSchedule.Model.HabitRecordModel;
import SelfSchedule.Result.ActionResult;
import SelfSchedule.Service.FileService;
import SelfSchedule.Service.RedisCache;
import SelfSchedule.Annotation.ClearRedisCache;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/Api/Habit")
@Api(tags="习惯控制api")
public class HabitController extends ControllerBase{
    private final IHabitService habitService;
    private final FileService fileService;

    @Autowired
    public HabitController(HabitService habitService,FileService fileService,RedisCache redis){
        this.habitService = habitService;
        this.fileService = fileService;
        this.redis = redis;
    }

    @GetMapping("/GetHabitGroups/{userId}")
    @ApiOperation(value = "获取习惯分组",notes = "根据用户id获取")
    public CompletableFuture<ActionResult<List<HabitGroup>>> GetHabitGroups(@PathVariable String userId){
        return CompletableFuture.completedFuture(successWithData(habitService.getHabitGroups(userId,redis)));
    }

    @GetMapping("/GetHabits/{userId}")
    @ApiOperation(value = "获取用户习惯",notes = "根据用户id获取")
    @ClearRedisCache(keys = {CachingKeys.GetIndexData})
    public CompletableFuture<ActionResult<PagedData<HabitVO>>> GetHabits(@PathVariable String userId,@RequestParam Integer page,
                                                                         @RequestParam Integer pageSize,@RequestParam Long time,
                                                                         HttpServletRequest request){
        return CompletableFuture.completedFuture(
                successWithData(habitService.getHabits(page,pageSize,userId,new Date(time),false, redis))
        );
    }

    @PutMapping("/CreateHabit")
    @ApiOperation(value = "用户添加习惯",notes = "用户创建习惯")
    @ClearRedisCache(keys = {CachingKeys.GetHabits, CachingKeys.GetHabitsDateValue,
            CachingKeys.GetUserHabitReminders,CachingKeys.GetIndexData})
    public ActionResult<String> CreateHabit(@RequestBody HabitModel model, HttpServletRequest request){
        String res = habitService.createHabit(model);
        if(res==null)
            return fail("添加习惯失败！");
        return successWithData("创建中...",res);
    }

    @PatchMapping("/UpdateHabit")
    @ClearRedisCache(keys = {CachingKeys.GetHabits,CachingKeys.GetHabitsDateValue,
            CachingKeys.GetUserHabitReminders,CachingKeys.GetIndexData})
    public ActionResult<HabitModel> UpdateHabit(@RequestBody HabitModel model,HttpServletRequest request){
        return successWithData(habitService.updateHabit(model));
    }

    @PostMapping("/CreateGroup/{userId}")
    @ApiOperation(value = "用户添加习惯分组",notes = "用户创建习惯分组")
    @ClearRedisCache(keys={CachingKeys.GetHabitGroups})
    public ActionResult<Long> CreateGroup(@PathVariable String userId,@RequestParam String groupName,HttpServletRequest request){
        Long res = habitService.createHabitGroup(userId,groupName);
        if(res==null)
            return fail("添加习惯分组失败！");
        return successWithData(res);
    }

    @DeleteMapping("/RemoveGroup/{userId}/{groupId}")
    @ApiOperation(value = "用户移除习惯分组",notes = "根据分组id移除")
    @ClearRedisCache(keys={CachingKeys.GetHabitGroups})
    public ActionResult RemoveGroup(@PathVariable String userId,@PathVariable Long groupId,@RequestParam Integer code,
                                    HttpServletRequest request){
        int res = habitService.removeGroup(userId,groupId,code);
        if(res == Constants.AbNormalState)
            return fail("移除习惯分组失败！");
        return ok("成功移除习惯分组！");
    }

    @PostMapping("/UploadThumb")
    @ApiOperation(value = "用户上传习惯图片",notes = "用户上传习惯图片")
    @ClearRedisCache(keys={CachingKeys.GetHabits,CachingKeys.GetHabitsDateValue,CachingKeys.GetIndexData})
    public ActionResult<String> UploadThumb(@RequestPart("habitId") String habitId, @RequestPart("file") MultipartFile thumb,
                                            @RequestPart("originalFileName") String originalFileName,
                                            HttpServletRequest request){
        String res = habitService.uploadThumb(thumb,habitId,originalFileName,fileService);
        if(res==null)
            return fail("上传失败！");
        return successWithData(res);
    }

    @PatchMapping("/FinishOrNot")
    @ApiOperation(value = "用户习惯打卡",notes = "用户习惯打卡")
    @ClearRedisCache(keys={CachingKeys.GetHabits,CachingKeys.GetHabitsDateValue,CachingKeys.GetIndexData})
    public ActionResult<HabitOptionVO> FinishOrNot(@RequestBody HabitRecordModel model, HttpServletRequest request){
        return successWithData(habitService.finishOrNot(model));
    }

    @GetMapping("/GetHabitReminders/{habitId}")
    @ApiOperation(value = "获取习惯提醒",notes = "获取习惯提醒")
    public CompletableFuture<ActionResult<List<HabitReminderVO>>> GetHabitReminders(@PathVariable String habitId){
        return CompletableFuture.completedFuture(successWithData(habitService.getReminders(habitId)));
    }

    @DeleteMapping("/RemoveHabit/{habitId}")
    @ApiOperation(value = "用户移除习惯",notes = "用户形式删除习惯")
    @ClearRedisCache(keys={CachingKeys.GetHabits,CachingKeys.GetHabitsDateValue, CachingKeys.GetUserHabitReminders,
            CachingKeys.GetIndexData})
    public ActionResult RemoveHabit(@PathVariable String habitId,HttpServletRequest request){
        int res = habitService.removeHabit(habitId);
        if(res == Constants.AbNormalState)
            return fail("移除习惯失败！");
        return ok("习惯已移除！");
    }

    @PostMapping("/DayInFrequency/{habitId}")
    @ApiOperation(value = "坚持选择的日期是否在频率中",notes = "坚持选择的日期是否在频率中")
    public ActionResult<Boolean> DayInFrequency(@PathVariable String habitId,@RequestParam Long day,
                                                  @RequestParam Long habitBeginDate){
       return  successWithData(habitService.isInFrequency(habitId,new Date(day),habitBeginDate));
    }

    @GetMapping("/GetHabitRecords/{habitId}")
    @ApiOperation(value = "用户习惯记录生成",notes = "习惯记录表中的习惯生成")
    public CompletableFuture<ActionResult<List<HabitRecordVO>>> GetHabitRecords(@PathVariable String habitId){
        return CompletableFuture.completedFuture(successWithData(habitService.getHabitRecords(habitId)));
    }

    @GetMapping("/GetCurrentHabitReminders/{userId}")
    @ApiOperation(value = "获取用户当前时间下的习惯提醒",notes = "获取用户当前时间下的习惯提醒")
    public CompletableFuture<ActionResult<List<HabitReminderInfoVO>>> GetCurrentHabitReminders(
            @PathVariable String userId,@RequestParam Long current
    ){
        return CompletableFuture.completedFuture(
                successWithData(habitService.getCurrentReminders(
                        userId,new Date(current),redis
                ))
        );
    }

    @GetMapping("/GetUserHabits/{userId}")
    @ApiOperation(value = "获取用户所有习惯",notes = "获取用户所有习惯")
    public CompletableFuture<ActionResult<PagedData<HabitVO>>> GetUserHabits(@PathVariable String userId,
                                                                        @RequestParam Integer page,
                                                                        @RequestParam Integer pageSize)
    {
        return CompletableFuture.completedFuture(
                successWithData(habitService.getHabits(page,pageSize,userId))
        );
    }
}
