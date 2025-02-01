package SelfSchedule.Controller;

import SelfSchedule.DbOption.Service.IUserService;
import SelfSchedule.DbOption.ServiceImpl.UserService;
import SelfSchedule.Entity.Enum.UserLoginStatus;
import SelfSchedule.Entity.VO.UserLoginVO;
import SelfSchedule.Model.UserAdminLoginModel;
import SelfSchedule.Result.ActionResult;
import SelfSchedule.Service.JwtService;
import SelfSchedule.Service.RedisCache;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Api/Admin")
public class AdminController extends ControllerBase{
    private final IUserService userService;
    private final JwtService jwtService;

    @Autowired
    public AdminController(UserService userService, JwtService jwtService, RedisCache redis){
        this.userService = userService;
        this.jwtService = jwtService;
        this.redis = redis;
    }

    @PostMapping("/Login")
    public ActionResult<UserLoginVO> login(@RequestBody UserAdminLoginModel model){
        UserLoginVO res = userService.adminLogin(model.getAccount(),model.getPassword(),jwtService,redis);
        if(res.getLoginStatus().equals(UserLoginStatus.NOT_EXISTS))
            return fail("不存在的管理员用户账户！");
        if(res.getLoginStatus().equals(UserLoginStatus.FAIL))
            return fail("密码错误！");
        if(res.getLoginStatus().equals(UserLoginStatus.NOTADMIN))
            return fail("非管理员！");
        return successWithData("登录成功！",res);
    }
}
