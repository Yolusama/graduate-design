package SelfSchedule.Controller;

import SelfSchedule.Common.Constants;
import SelfSchedule.DbOption.Service.IUserService;
import SelfSchedule.DbOption.ServiceImpl.UserService;
import SelfSchedule.Entity.Enum.UserLoginStatus;
import SelfSchedule.Entity.VO.UserLoginVO;
import SelfSchedule.Model.UserLoginRegModel;
import SelfSchedule.Model.UserTokenModel;
import SelfSchedule.Result.ActionResult;
import SelfSchedule.Service.EmailService;
import SelfSchedule.Service.JwtService;
import SelfSchedule.Service.RedisCache;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;

@Api(tags="用户控制api")
@RestController
@RequestMapping("/Api/User")
public class UserController extends ControllerBase{
    private final IUserService userService;
    private final EmailService emailService;
    private final JwtService jwtService;

    @Autowired
    public UserController(UserService userService,RedisCache redis,EmailService emailService,JwtService jwtService)
    {
        this.userService = userService;
        this.redis = redis;
        this.emailService = emailService;
        this.jwtService = jwtService;
    }

    @GetMapping("/GetCheckCode/{length}")
    @ApiOperation(value="发送电子邮箱验证码给目标邮箱",notes = "验证码分配")
    public ActionResult GetCheckCode(@RequestParam String email,@PathVariable String length)
            throws MessagingException {
        String res = userService.getCheckCode(email,Integer.parseInt(length),emailService,redis);
        if(res==null)
            return fail("验证码已存在，1分钟内无法再次获取");
        else
            return ok();
    }

    @PutMapping("/Register/{checkCode}")
    @ApiOperation(value="验证验证码并完成注册",notes = "注册")
    public ActionResult Register(@RequestBody UserLoginRegModel model,@PathVariable String checkCode)
    {
        int res = userService.register(model.getEmail(),model.getPassword(),checkCode,redis);
        if(res>Constants.None)
            return ok("注册成功！");
        else if(res == Constants.None)
            return fail("该邮箱已被注册！");
        else
            return fail("验证码错误或验证码已过期！");
    }

    @ApiOperation(value="用户登录",notes = "登录")
    @PostMapping("/Login")
    public ActionResult<UserLoginVO> Login(@RequestBody UserLoginRegModel model) throws IllegalAccessException {
        UserLoginVO res = userService.login(model.getEmail(),model.getPassword(),jwtService,redis);
        if(res.getLoginStatus() == UserLoginStatus.SUCCESS)
            return successWithData("正在登录...",res);
        else if(res.getLoginStatus() == UserLoginStatus.NOT_EXISTS)
            return fail("用户不存在！",HttpStatus.NOT_FOUND);
        else
            return fail("密码错误，登录失败！");
    }

    @PostMapping("/CheckCodeLogin/{checkCode}")
    @ApiOperation(value="使用验证码登录",notes = "验证码登录")
    public ActionResult<UserLoginVO> CheckCodeLogin(@RequestParam String email,@PathVariable String checkCode) throws IllegalAccessException
    {
        UserLoginVO res = userService.checkCodeLogin(email,checkCode,jwtService,redis);
        if(res.getLoginStatus() == UserLoginStatus.SUCCESS)
            return successWithData("正在登录...",res);
        else if(res.getLoginStatus() == UserLoginStatus.FAIL)
            return fail("验证码已过期！");
        else
            return fail("验证码错误请重新获取！");
    }


    @PostMapping("/VerifyToken")
    @ApiOperation(value="校验token",notes="校验token")
    public ActionResult<Boolean> VerifyToken(@RequestBody UserTokenModel model)
    {
        Boolean res = userService.verifyToken(model.getUserId(),model.getToken(),redis);
        if(res == null)
            return fail("身份验证信息已过期！");
        return successWithData(res);
    }

}
