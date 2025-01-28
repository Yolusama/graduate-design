package SelfSchedule.DbOption.Service;

import SelfSchedule.Entity.User;
import SelfSchedule.Entity.VO.UserLoginVO;
import SelfSchedule.Model.UserPwdModel;
import SelfSchedule.Service.EmailService;
import SelfSchedule.Service.FileService;
import SelfSchedule.Service.JwtService;
import SelfSchedule.Service.RedisCache;
import com.baomidou.mybatisplus.extension.service.IService;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;

public interface IUserService extends IService<User> {
    String getCheckCode(String email, Integer length, EmailService emailService, RedisCache redis) throws MessagingException;
    int register(String email,String password,String checkCode,RedisCache redis);
    UserLoginVO login(String email, String password, JwtService jwtService, RedisCache redis) throws IllegalAccessException;
    UserLoginVO checkCodeLogin(String email, String checkCode, JwtService jwtService, RedisCache redis) throws IllegalAccessException;
    Boolean verifyToken(String userId,String token,RedisCache redis);
    int changeNickname(String userId, String nickName);
    int changeAvatar(String avatar, String userId, MultipartFile file, FileService fileService);
    Boolean changePassword(UserPwdModel model,RedisCache redis);
}
