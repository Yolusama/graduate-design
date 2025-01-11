package SelfSchedule.DbOption.Service;

import SelfSchedule.Entity.Enum.UserLoginStatus;
import SelfSchedule.Entity.User;
import SelfSchedule.Entity.VO.UserLoginVO;
import SelfSchedule.Service.EmailService;
import SelfSchedule.Service.JwtService;
import SelfSchedule.Service.RedisCache;
import com.baomidou.mybatisplus.extension.service.IService;

import javax.mail.MessagingException;

public interface IUserService extends IService<User> {
    String getCheckCode(String email, Integer length, EmailService emailService, RedisCache redis) throws MessagingException;
    int register(String email,String password,String checkCode,RedisCache redis);
    UserLoginVO login(String email, String password, JwtService jwtService, RedisCache redis) throws IllegalAccessException;
    UserLoginVO checkCodeLogin(String email, String checkCode, JwtService jwtService, RedisCache redis) throws IllegalAccessException;
    Boolean verifyToken(String userId,String token,RedisCache redis);
}
