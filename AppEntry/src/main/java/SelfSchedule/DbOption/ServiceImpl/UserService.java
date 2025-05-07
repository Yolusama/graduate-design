package SelfSchedule.DbOption.ServiceImpl;

import SelfSchedule.Common.CachingKeys;
import SelfSchedule.Common.Constants;
import SelfSchedule.DbOption.Mapper.HabitGroupMapper;
import SelfSchedule.DbOption.Mapper.UserMapper;
import SelfSchedule.DbOption.Mapper.UserTaskLabelMapper;
import SelfSchedule.DbOption.Service.IUserService;
import SelfSchedule.Entity.Enum.UserLoginStatus;
import SelfSchedule.Entity.Enum.UserRole;
import SelfSchedule.Entity.HabitGroup;
import SelfSchedule.Entity.TaskLabel;
import SelfSchedule.Entity.User;
import SelfSchedule.Entity.UserTaskLabel;
import SelfSchedule.Entity.VO.PagedData;
import SelfSchedule.Entity.VO.UserLoginVO;
import SelfSchedule.Entity.VO.UserVO;
import SelfSchedule.Functional.RandomGenerator;
import SelfSchedule.Model.UserLoginModel;
import SelfSchedule.Model.UserModel;
import SelfSchedule.Model.UserPwdModel;
import SelfSchedule.Model.UserRegisterModel;
import SelfSchedule.Service.EmailService;
import SelfSchedule.Service.FileService;
import SelfSchedule.Service.JwtService;
import SelfSchedule.Service.RedisCache;
import SelfSchedule.Utils.ObjectUtil;
import SelfSchedule.Utils.StringEncryptUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService extends ServiceImpl<UserMapper, User> implements IUserService {
    private final UserMapper mapper;
    private final HabitGroupMapper groupMapper;
    private final UserTaskLabelMapper userTaskLabelMapper;

    @Autowired
    public UserService(UserMapper mapper, HabitGroupMapper groupMapper, UserTaskLabelMapper userTaskLabelMapper){
        this.mapper = mapper;
        this.groupMapper = groupMapper;
        this.userTaskLabelMapper = userTaskLabelMapper;
    }

    @Override
    public String getCheckCode(String email, Integer length, EmailService emailService, RedisCache redis)
    {
        String code = RandomGenerator.generateNumber(length);
        String key = String.format("%s_CheckCode",email);
        String key1 = String.format("%s_CheckCode_Get",email);
        if(redis.has(key1))
            return null;
        int res = emailService.sendTo(email,Constants.CheckCodeTitle,String.format
                ("您正在使用电子邮箱%s进行个人信息修改或者用户注册,验证码%s,于五分钟内有效,请及时使用。",email,code));
        if(res==Constants.EOF)
            return Constants.EmailError;
        redis.set(key,code,Constants.CheckCodeExpire);
        redis.set(key1,code,Constants.CheckCodeGetExpire);
        return code;
    }

    @Override
    @Transactional
    public int register(UserRegisterModel model, String checkCode, RedisCache redis) {
        String key = String.format("%s_CheckCode",model.getEmail());
        if(!redis.has(key)||!checkCode.equals(redis.get(key)))
            return Constants.EOF;
        User user = mapper.selectOne(new QueryWrapper<User>().lambda().eq(User::getEmail,model.getEmail()));
        if(user!=null)
            return Constants.AbNormalState;
        user = new User();
        user.setEmail(model.getEmail());
        user.setAvatar(Constants.DefaultAvatar);
        user.setId(RandomGenerator.generateUserId());
        user.setAccount(RandomGenerator.generateUserAccount());
        user.setNickname(String.format("用户%s",user.getId()));
        user.setPassword(StringEncryptUtil.getString(model.getPassword()));
        user.setCreateTime(Constants.now());
        addUserHabitGroups(user.getId());
        addUserDefaultLabels(user.getId());
        redis.remove(key);
        return mapper.insert(user);
    }

    @Override
    @Transactional
    public UserLoginVO login(UserLoginModel model, JwtService jwtService, RedisCache redis)
    {
        var wrapper = new LambdaQueryWrapper<User>();
        wrapper.eq(User::getEmail,model.getAccount()).or().eq(User::getAccount,model.getAccount());
        User user = mapper.selectOne(wrapper);
        UserLoginVO res = new UserLoginVO();
        if(user == null)
        {
            res.setLoginStatus(UserLoginStatus.NOT_EXISTS);
            return res;
        }
        if(!StringEncryptUtil.checkPassword(model.getPassword(),user.getPassword()))
        {
            res.setLoginStatus(UserLoginStatus.FAIL);
            return res;
        }
        if(!user.getStatus())
        {
            res.setLoginStatus(UserLoginStatus.USER_EXCEPTION);
            return res;
        }
        String key =String.format("%s_token",user.getId());
        String token;
        if(!redis.has(key)) {
            token = jwtService.generateToken(user.getId(), Constants.TokenExpire);
            redis.set(key, token, Constants.TokenExpire);
        }
        else
            token = redis.get(key).toString();
        ObjectUtil.copy(user,res);
        res.setLoginStatus(UserLoginStatus.SUCCESS);
        res.setToken(token);
        user.setLastLoginTime(Constants.now());
        mapper.updateById(user);
        return res;
    }

    @Override
    public UserLoginVO checkCodeLogin(String email, String checkCode, JwtService jwtService, RedisCache redis){
        var wrapper = new LambdaQueryWrapper<User>().eq(User::getEmail,email);
        User user = mapper.selectOne(wrapper);
        UserLoginVO res = new UserLoginVO();
        if(user == null)
        {
            res.setLoginStatus(UserLoginStatus.NOT_EXISTS);
            return res;
        }
        String checkCodeKey = String.format("%s_CheckCode",email);
        if(!redis.has(checkCodeKey))
        {
            res.setLoginStatus(UserLoginStatus.FAIL);
            return res;
        }
        if(!redis.get(checkCodeKey).equals(checkCode))
        {
            res.setLoginStatus(UserLoginStatus.CHECK_FAILED);
            return res;
        }
        String key =String.format("%s_token",user.getId());
        String token;
        if(!redis.has(key)) {
            token = jwtService.generateToken(user.getId(), Constants.TokenExpire);
            redis.set(key, token, Constants.TokenExpire);
        }
        else
            token = redis.get(key).toString();
        ObjectUtil.copy(user,res);
        res.setToken(token);
        res.setLoginStatus(UserLoginStatus.SUCCESS);
        user.setLastLoginTime(Constants.now());
        mapper.updateById(user);
        return res;
    }

    @Override
    @Transactional
    public Boolean verifyToken(String userId, String token, RedisCache redis) {
        String key = String.format("%s_token",userId);
        if(!redis.has(key))
           return null;
        boolean res = redis.get(key).equals(token);
        if(res){
           LambdaUpdateWrapper<User> wrapper = new LambdaUpdateWrapper<>();
           wrapper.set(User::getLastLoginTime,Constants.now()).eq(User::getId,userId);
           mapper.update(wrapper);
        }
        return res;
    }

    @Override
    @Transactional
    public int changeNickname(String userId, String nickname) {
        LambdaUpdateWrapper<User> wrapper = new LambdaUpdateWrapper<>();
        wrapper.set(User::getNickname,nickname).eq(User::getId,userId);
        return mapper.update(wrapper);
    }

    @Override
    @Transactional
    public Boolean changePassword(UserPwdModel model, RedisCache redis) {
        String key = String.format("%s_CheckCode",model.getEmail());
        if(!redis.has(key)||!redis.get(key).equals(model.getCheckCode()))
            return null;
        User user = mapper.selectById(model.getUserId());
        String newPwdEncrypted = StringEncryptUtil.getString(model.getNewPassword());
        if(user.getPassword().equals(newPwdEncrypted))
            return false;
        user.setPassword(newPwdEncrypted);
        mapper.updateById(user);
        redis.remove(key);
        return true;
    }

    @Override
    @Transactional
    public String changeAvatar(String avatar, String userId, MultipartFile file, FileService fileService) {
        if(!avatar.equals(Constants.DefaultAvatar))
            fileService.removeImage(avatar);
        String newAvatar = fileService.uploadImage(file);
        LambdaUpdateWrapper<User> wrapper = new LambdaUpdateWrapper<>();
        wrapper.set(User::getAvatar,newAvatar).eq(User::getId,userId);
        mapper.update(wrapper);
        return newAvatar;
    }

    @Override
    @Transactional
    public Boolean changeEmail(String email, String newEmail, String checkCode, RedisCache redis) {
        Long count = mapper.selectCount(new LambdaQueryWrapper<User>().eq(User::getEmail,newEmail));
        if(count!=0)
            return null;
        LambdaUpdateWrapper<User> wrapper = new LambdaUpdateWrapper<>();
        String key = String.format("%s_CheckCode",newEmail);
        if(!redis.has(key)||!redis.get(key).equals(checkCode))
            return false;
        wrapper.set(User::getEmail,newEmail).eq(User::getEmail,email);
        mapper.update(wrapper);
        redis.remove(key);
        return true;
    }

    @Override
    public PagedData<UserVO> getUsers(Integer page, Integer pageSize, Boolean status, Integer role, String queryKey) {
        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
        if(role!=null)
            wrapper.eq(User::getRole,role);
        if(status!=null)
            wrapper.eq(User::getStatus,status);
        if(queryKey!=null)
            wrapper.and(q->q.like(User::getNickname,queryKey).or().like(User::getEmail,queryKey).or().like(User::getId,queryKey));
        Page<User> pageOption = mapper.selectPage(Page.of(page,pageSize),wrapper);
        List<UserVO> data = new ArrayList<>();
        for(User user:pageOption.getRecords())
            data.add(ObjectUtil.copy(user,new UserVO()));
        return new PagedData<>(data,pageOption.getTotal());
    }

    @Override
    @Transactional
    public UserLoginVO adminLogin(String account, String password, JwtService jwtService, RedisCache redis) {
        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(User::getAccount,account).or().eq(User::getEmail,account);
        User user = mapper.selectOne(wrapper);
        UserLoginVO res = new UserLoginVO();
        if(user==null)
        {
            res.setLoginStatus(UserLoginStatus.NOT_EXISTS);
            return res;
        }
        if(!StringEncryptUtil.checkPassword(password,user.getPassword()))
        {
            res.setLoginStatus(UserLoginStatus.FAIL);
            return res;
        }
        if(!user.getRole().equals(UserRole.ADMIN.value()))
        {
            res.setLoginStatus(UserLoginStatus.NOT_ADMIN);
            return res;
        }
        user.setLastLoginTime(Constants.now());
        String key = String.format("%s_token",user.getId());
        if(redis.has(key))
            redis.remove(key);
        String token = jwtService.generateToken(user.getId(),Constants.AdminTokenExpire);
        ObjectUtil.copy(user,res);
        res.setLoginStatus(UserLoginStatus.SUCCESS);
        res.setToken(token);
        user.setLastLoginTime(Constants.now());
        mapper.updateById(user);
        redis.set(key,token,Constants.AdminTokenExpire);
        return res;
    }

    @Override
    @Transactional
    public int changeStatus(String userId, Boolean status) {
        LambdaUpdateWrapper<User> wrapper = new LambdaUpdateWrapper<>();
        wrapper.eq(User::getId,userId).set(User::getStatus,status);
        return mapper.update(wrapper);
    }

    @Override
    public void feedback(String email, String content, EmailService emailService, FileService fileService) {
        emailService.receiveFrom(email,content,fileService);
    }

    @Override
    @Transactional
    public int bindEmail(String account,String email, String checkCode,RedisCache redis) {
        String key = String.format("%s_CheckCode",email);
        if(!redis.has(key)||!redis.get(key).equals(checkCode))
            return Constants.EOF;
        User user = mapper.selectOne(new LambdaQueryWrapper<User>().eq(User::getAccount,email));
        if(user!=null)
            return Constants.AbNormalState;
        user = mapper.selectOne(new LambdaQueryWrapper<User>().eq(User::getAccount,account));
        user.setEmail(email);
        mapper.updateById(user);
        redis.remove(key);
        return Constants.NormalState;
    }

    @Override
    @Transactional
    public UserVO addUser(UserModel model) {
        User user = new User();
        user.setId(RandomGenerator.generateUserId());
        user.setAccount(RandomGenerator.generateUserAccount());
        user.setPassword(StringEncryptUtil.getString(user.getDefaultPassword()));
        user.setNickname(model.getNickname());
        user.setCreateTime(Constants.now());
        user.setRole(model.getRole());
        user.setStatus(true);
        user.setAvatar(model.getAvatar());

        mapper.insert(user);
        addUserHabitGroups(user.getId());
        addUserDefaultLabels(user.getId());
        return ObjectUtil.copy(user,new UserVO());
    }

    @Override
    @Transactional
    public int updateUser(UserModel model) {
        LambdaUpdateWrapper<User> wrapper = new LambdaUpdateWrapper<>();
        wrapper.set(User::getNickname,model.getNickname()).set(User::getRole,model.getRole())
                .eq(User::getId,model.getId());
        return mapper.update(wrapper);
    }

    @Override
    @Transactional
    public String uploadAvatar(String userId, String avatar, MultipartFile file, FileService fileService) {
        if(!avatar.equals(Constants.DefaultAvatar))
            fileService.removeImage(avatar);
        String newAvatar = fileService.uploadImage(file);
        LambdaUpdateWrapper<User> wrapper = new LambdaUpdateWrapper<>();
        wrapper.set(User::getAvatar,newAvatar).eq(User::getId,userId);
        mapper.update(wrapper);
        return newAvatar;
    }

    private void addUserHabitGroups(String userId) {
        List<HabitGroup> groups = new ArrayList<>();
        for(int i=0;i<Constants.DefaultGroupNames.length;i++){
            String groupName = Constants.DefaultGroupNames[i];
            HabitGroup group = new HabitGroup();
            group.setUserId(userId);
            group.setCode(i+1);
            group.setName(groupName);
            groups.add(group);
        }
        groupMapper.batchInsert(groups);
    }

    private void addUserDefaultLabels(String userId){
         List<UserTaskLabel> userTaskLabels = new ArrayList<>();
         for(Long labelId:TaskLabel.BaseIds){
             UserTaskLabel userTaskLabel = new UserTaskLabel();
             userTaskLabel.setUserId(userId);
             userTaskLabel.setLabelId(labelId);
             userTaskLabel.setDisplay(true);
             userTaskLabels.add(userTaskLabel);
         }
         userTaskLabelMapper.batchInsert(userTaskLabels);
    }

    @Override
    public String getUserSubject(String userId, RedisCache redis) {
        String key = String.format("%s_%s",userId, CachingKeys.GetUserSubject);
        if(redis.has(key))
            return redis.get(key).toString();
        return null;
    }

    @Override
    public void setUserSubject(String userId, String subject, RedisCache redis) {
        String key = String.format("%s_%s",userId, CachingKeys.GetUserSubject);
        if(redis.has(key))
            redis.remove(key);
        redis.set(key, subject);
    }
}
