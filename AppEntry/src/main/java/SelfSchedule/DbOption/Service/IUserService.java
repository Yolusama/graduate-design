package SelfSchedule.DbOption.Service;

import SelfSchedule.Entity.User;
import SelfSchedule.Entity.VO.PagedData;
import SelfSchedule.Entity.VO.UserLoginVO;
import SelfSchedule.Entity.VO.UserVO;
import SelfSchedule.Model.UserLoginModel;
import SelfSchedule.Model.UserModel;
import SelfSchedule.Model.UserPwdModel;
import SelfSchedule.Model.UserRegisterModel;
import SelfSchedule.Service.EmailService;
import SelfSchedule.Service.FileService;
import SelfSchedule.Service.JwtService;
import SelfSchedule.Service.RedisCache;
import com.baomidou.mybatisplus.extension.service.IService;
import org.springframework.web.multipart.MultipartFile;

public interface IUserService extends IService<User> {
    String getCheckCode(String email, Integer length, EmailService emailService, RedisCache redis);
    int register(UserRegisterModel model, String checkCode, RedisCache redis);
    UserLoginVO login(UserLoginModel model, JwtService jwtService, RedisCache redis);
    UserLoginVO checkCodeLogin(String email, String checkCode, JwtService jwtService, RedisCache redis);
    Boolean verifyToken(String userId,String token,RedisCache redis);
    int changeNickname(String userId, String nickName);
    String changeAvatar(String avatar, String userId, MultipartFile file, FileService fileService);
    Boolean changePassword(UserPwdModel model,RedisCache redis);
    Boolean changeEmail(String email, String newEmail, String checkCode, RedisCache redis);
    PagedData<UserVO> getUsers(Integer page,Integer pageSize,Boolean status,Integer role,String queryKey);
    UserLoginVO adminLogin(String account,String password,JwtService jwtService,RedisCache redis);
    int changeStatus(String userId,Boolean status);
    void feedback(String email,String content,EmailService emailService,FileService fileService);
    int bindEmail(String account,String email,String checkCode,RedisCache redis);
    UserVO addUser(UserModel model);
    int updateUser(UserModel model);
    String uploadAvatar(String userId,String avatar,MultipartFile file,FileService fileService);
}
