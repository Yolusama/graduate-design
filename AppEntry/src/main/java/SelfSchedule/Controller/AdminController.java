package SelfSchedule.Controller;

import SelfSchedule.Common.Constants;
import SelfSchedule.DbOption.Service.IUserService;
import SelfSchedule.DbOption.Service.IVersionStatusService;
import SelfSchedule.DbOption.ServiceImpl.UserService;
import SelfSchedule.DbOption.ServiceImpl.VersionStatusService;
import SelfSchedule.Entity.Enum.UserLoginStatus;
import SelfSchedule.Entity.VO.PagedData;
import SelfSchedule.Entity.VO.UserLoginVO;
import SelfSchedule.Entity.VO.UserVO;
import SelfSchedule.Entity.VersionStatus;
import SelfSchedule.Model.UserAdminLoginModel;
import SelfSchedule.Result.ActionResult;
import SelfSchedule.Service.JwtService;
import SelfSchedule.Service.RedisCache;
import SelfSchedule.Utils.ObjectUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/Api/Admin")
@Api(tags = "管理端控制api")
public class AdminController extends ControllerBase{
    private final IUserService userService;
    private final IVersionStatusService versionService;
    private final JwtService jwtService;

    @Autowired
    public AdminController(UserService userService, VersionStatusService versionService,
                           JwtService jwtService, RedisCache redis){
        this.userService = userService;
        this.versionService = versionService;
        this.jwtService = jwtService;
        this.redis = redis;
    }

    @PostMapping("/Login")
    @ApiOperation(value = "管理员账户登录",notes = "管理员登录")
    public ActionResult<UserLoginVO> login(@RequestBody UserAdminLoginModel model){
        UserLoginVO res = userService.adminLogin(model.getAccount(),model.getPassword(),jwtService,redis);
        if(res.getLoginStatus()==UserLoginStatus.NOT_EXISTS)
            return fail("不存在的管理员用户账户！");
        if(res.getLoginStatus()==UserLoginStatus.FAIL)
            return fail("密码错误！");
        if(res.getLoginStatus()==UserLoginStatus.NOT_ADMIN)
            return fail("非管理员！");
        if(res.getLoginStatus()==UserLoginStatus.USER_EXCEPTION)
            return fail("用户异常！");
        return successWithData("登录成功！",res);
    }

    @GetMapping("/GetUsers")
    @ApiOperation(value = "检索用户情况",notes = "检索用户")
    public CompletableFuture<ActionResult<PagedData<UserVO>>> GetUsers(@RequestParam Integer page, @RequestParam Integer pageSize,
                                                                       @RequestParam String role,
                                                                       @RequestParam String queryKey, @RequestParam String status)
    {
        Integer _role = null;
        if(!ObjectUtil.isRequestParamStrNull(role))
            _role = Integer.parseInt(role);
        Boolean  _status = null;
        if(!ObjectUtil.isRequestParamStrNull(status))
            _status = Boolean.parseBoolean(status);
        return CompletableFuture.completedFuture(successWithData(
                userService.getUsers(page,pageSize,_status,_role,queryKey)
        ));
    }

    @PatchMapping("/ChangeStatus/{userId}")
    @ApiOperation(value = "禁用/恢复用户状态",notes = "禁用/恢复用户状态")
    public ActionResult ChangeStatus(@PathVariable String userId,@RequestParam Boolean status){
        int res = userService.changeStatus(userId,status);
        if(res==Constants.AbNormalState)
            return fail("操作失败！");
        return ok();
    }

    @GetMapping("/GetVersions")
    public CompletableFuture<ActionResult<PagedData<VersionStatus>>> GetVersions(@RequestParam Integer page,
                                                                                 @RequestParam Integer pageSize,
                                                                                 @RequestParam String queryKey,
                                                                                 @RequestParam String year,
                                                                                 @RequestParam String type){
        Integer _year = ObjectUtil.isRequestParamStrNull(year)? null:Integer.parseInt(year);
        Integer _type = ObjectUtil.isRequestParamStrNull(type)? null:Integer.parseInt(type);
        return CompletableFuture.completedFuture(
                successWithData(versionService.getVersions(page,pageSize,queryKey,_year,_type,redis))
        );
    }
}
