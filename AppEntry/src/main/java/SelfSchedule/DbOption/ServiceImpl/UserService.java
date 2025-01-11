package SelfSchedule.DbOption.ServiceImpl;

import SelfSchedule.Common.Constants;
import SelfSchedule.DbOption.Mapper.HabitGroupMapper;
import SelfSchedule.DbOption.Mapper.UserMapper;
import SelfSchedule.DbOption.Service.IUserService;
import SelfSchedule.Entity.Enum.UserLoginStatus;
import SelfSchedule.Entity.HabitGroup;
import SelfSchedule.Entity.User;
import SelfSchedule.Entity.VO.UserLoginVO;
import SelfSchedule.Functional.RandomGenerator;
import SelfSchedule.Service.EmailService;
import SelfSchedule.Service.JwtService;
import SelfSchedule.Service.RedisCache;
import SelfSchedule.Utils.ObjectUtil;
import SelfSchedule.Utils.StringEncryptUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService extends ServiceImpl<UserMapper, User> implements IUserService {
    private final UserMapper mapper;
    private final HabitGroupMapper groupMapper;

    @Autowired
    public UserService(UserMapper mapper,HabitGroupMapper groupMapper){
        this.mapper = mapper;
        this.groupMapper = groupMapper;
    }

    @Override
    public String getCheckCode(String email, Integer length, EmailService emailService, RedisCache redis)
            throws MessagingException {
        String code = RandomGenerator.generateNumber(length);
        String key = String.format("%s_checkCode",email);
        String key1 = String.format("%s_checkCode_Get",email);
        if(redis.has(key1))
            return null;
        emailService.sendTo(email,Constants.CheckCodeTitle,String.format
                ("您正在使用电子邮箱%s进行个人信息修改或者用户注册,验证码%s,于五分钟内有效,请及时使用。",email,code));
        redis.set(key,code,Constants.CheckCodeExpire);
        redis.set(key1,code,Constants.CheckCodeGetExpire);
        return code;
    }

    @Override
    @Transactional
    public int register(String email,String password,String checkCode,RedisCache redis) {
        String key = String.format("%s_checkCode",email);
        if(!redis.has(key)||!checkCode.equals(redis.get(key)))
            return Constants.EOF;
        User user = mapper.selectOne(new QueryWrapper<User>().lambda().eq(User::getEmail,email));
        if(user!=null)
            return Constants.AbNormalState;
        user = new User();
        user.setEmail(email);
        user.setAvatar(Constants.DefaultAvatar);
        user.setId(RandomGenerator.generateUserId());
        user.setNickName(String.format("用户%s",user.getId()));
        user.setPassword(StringEncryptUtil.getString(password));
        user.setCreateTime(Constants.Now());
        List<HabitGroup> groups = new ArrayList<>();
        for(int i=0;i<Constants.DefaultGroupNames.length;i++){
            String groupName = Constants.DefaultGroupNames[i];
            HabitGroup group = new HabitGroup();
            group.setUserId(user.getId());
            group.setCode(i+1);
            group.setName(groupName);
            groups.add(group);
        }
        groupMapper.batchInsert(groups);
        return mapper.insert(user);
    }

    @Override
    public UserLoginVO login(String email, String password, JwtService jwtService, RedisCache redis)
            throws IllegalAccessException {
        var wrapper = new LambdaQueryWrapper<User>().eq(User::getEmail,email);
        User user = mapper.selectOne(wrapper);
        UserLoginVO res = new UserLoginVO();
        if(user == null)
        {
            res.setLoginStatus(UserLoginStatus.NOT_EXISTS);
            return res;
        }
        if(!StringEncryptUtil.checkPassword(password,user.getPassword()))
        {
            res.setLoginStatus(UserLoginStatus.FAIL);
            return null;
        }
        String key =String.format("%s_token",user.getId());
        String token = jwtService.GenerateToken(user.getId(),Constants.TokenExpire);
        redis.set(key,token,Constants.TokenExpire);
        ObjectUtil.copy(user,res);
        res.setLoginStatus(UserLoginStatus.SUCCESS);
        res.setToken(token);
        user.setLastLoginTime(Constants.Now());
        mapper.updateById(user);
        return res;
    }

    @Override
    public UserLoginVO checkCodeLogin(String email, String checkCode, JwtService jwtService, RedisCache redis) throws IllegalAccessException {
        var wrapper = new LambdaQueryWrapper<User>().eq(User::getEmail,email);
        User user = mapper.selectOne(wrapper);
        UserLoginVO res = new UserLoginVO();
        if(user == null)
        {
            res.setLoginStatus(UserLoginStatus.NOT_EXISTS);
            return res;
        }
        String checkCodeKey = String.format("%s_checkCode",email);
        if(!redis.has(checkCodeKey))
        {
            res.setLoginStatus(UserLoginStatus.FAIL);
            return res;
        }
        if(!redis.get(checkCodeKey).equals(checkCode))
        {
            res.setLoginStatus(UserLoginStatus.CHECKFAILED);
            return res;
        }
        String key =String.format("%s_token",user.getId());
        String token = jwtService.GenerateToken(user.toString(),Constants.TokenExpire);
        redis.set(key,token,Constants.CheckCodeExpire);
        ObjectUtil.copy(user,res);
        res.setLoginStatus(UserLoginStatus.SUCCESS);
        user.setLastLoginTime(Constants.Now());
        mapper.updateById(user);
        return res;
    }

    @Override
    public Boolean verifyToken(String userId, String token, RedisCache redis) {
        String key = String.format("%s_token",userId);
        if(!redis.has(key))
           return null;
        return redis.get(key).equals(token);
    }
}
