package SelfSchedule.DbOption.ServiceImpl;

import SelfSchedule.Common.CachingKeys;
import SelfSchedule.Common.Constants;
import SelfSchedule.DbOption.Mapper.*;
import SelfSchedule.DbOption.Service.IHabitService;
import SelfSchedule.Entity.*;
import SelfSchedule.Entity.VO.HabitRecordVO;
import SelfSchedule.Entity.VO.HabitReminderVO;
import SelfSchedule.Entity.VO.HabitVO;
import SelfSchedule.Entity.VO.PagedData;
import SelfSchedule.Functional.RandomGenerator;
import SelfSchedule.Model.ArrayDataModel;
import SelfSchedule.Model.HabitModel;
import SelfSchedule.Model.HabitRecordModel;
import SelfSchedule.Model.HabitReminderModel;
import SelfSchedule.Service.FileService;
import SelfSchedule.Service.RedisCache;
import SelfSchedule.Utils.DateUtil;
import SelfSchedule.Utils.ObjectUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.Duration;
import java.util.*;

@Service
public class HabitService extends ServiceImpl<HabitMapper, Habit> implements IHabitService {
    private final HabitMapper mapper;
    private final HabitRecordMapper recordMapper;
    private final HabitReminderMapper reminderMapper;
    private final HabitGroupMapper groupMapper;
    private final HabitOptionMapper optionMapper;
    private final HabitFrequencyMapper frequencyMapper;

    @Autowired
    public HabitService(HabitMapper mapper,HabitRecordMapper recordMapper,HabitReminderMapper reminderMapper,
                        HabitGroupMapper groupMapper, HabitOptionMapper optionMapper,
                        HabitFrequencyMapper frequencyMapper)
    {
        this.mapper = mapper;
        this.recordMapper = recordMapper;
        this.reminderMapper = reminderMapper;
        this.groupMapper = groupMapper;
        this.optionMapper = optionMapper;
        this.frequencyMapper = frequencyMapper;
    }

    @Override
    @Transactional
    public String createHabit(HabitModel model) {
        Habit habit = new Habit(RandomGenerator.generateHabitId());
        habit.setCreateTime(Constants.Now());
        habit.setBeginDate(model.getBeginDate());
        habit.setDeleteFlag(false);
        habit.setDescription(model.getDescription());
        habit.setName(model.getName());
        habit.setPriority(model.getPriority());
        habit.setThumb(model.getThumb());
        habit.setUserId(model.getUserId());
        habit.setGroupId(model.getGroupId());
        mapper.insert(habit);
        HabitOption option = new HabitOption();
        option.setHabitId(habit.getId());
        option.setContinuousDays(Constants.None);
        option.setPersistDays(Constants.None);
        option.setMostDays(Constants.None);
        option.setAimDays(model.getAimDays());
        optionMapper.insert(option);
        List<HabitReminderModel> reminderModels = model.getReminderModels();
        if(reminderModels.size()>Constants.None)
        {
            List<HabitReminder> reminders = new ArrayList<>();
            for(HabitReminderModel reminderModel:reminderModels){
                HabitReminder reminder = new HabitReminder();
                reminder.setHabitId(habit.getId());
                reminder.setTime(reminderModel.getTime());
                reminders.add(reminder);
            }
            reminderMapper.batchInsert(reminders);
        }
        HabitFrequency frequency = new HabitFrequency();
        frequency.setHabitId(habit.getId());
        frequency.setDays(model.getDays());
        frequency.setWeekPersistDays(model.getWeekPersistDays());
        frequency.setPeriod(model.getPeriod());
        frequencyMapper.insert(frequency);
        HabitRecord record = new HabitRecord();
        record.setDay(model.getRecordDay());
        record.setFinished(false);
        record.setHabitId(habit.getId());
        recordMapper.insert(record);
        return habit.getId();
    }

    @Override
    public PagedData<HabitVO> getHabits(Integer current, Integer pageSize, String userId, Date time, RedisCache redis) {
        final String key1 = String.format("Caching_%s_%s",userId, CachingKeys.GetHabits);
        final String key2 = String.format("Caching_%s_%s",userId,CachingKeys.GetHabitsDateValue);
        if(redis.has(key1)&&(redis.has(key2)&& DateUtil.onlyDateEquals((Date)redis.get(key2),time)))
            return (PagedData<HabitVO>)redis.get(key1);
        else
        {
            redis.remove(key1);
            redis.remove(key2);
        }
        Page<HabitVO> page = Page.of(current,pageSize);
        PagedData<HabitVO> res = new PagedData<>();
        List<HabitVO> habits = mapper.getHabits(page,userId);
        Date date = DateUtil.onlyDate(time);
        Date today = DateUtil.onlyDate(Constants.Now());
        boolean flag = false;
        for(HabitVO habit:habits){
            if(date.getTime()<habit.getBeginDate().getTime())
                continue;
            if(habit.getAimDays()!=Constants.EOF)
            {
                Date limit = new Date(habit.getBeginDate().getTime());
                limit.setDate(limit.getDate()+habit.getAimDays());
                if(date.getTime()>=limit.getTime())
                    continue;
            }
            if(habit.getWeekPersistDays()!=null){
                Date temp = new Date(time.getTime());
                temp.setDate(temp.getDate()-temp.getDay());
                Date leftBound = new Date(temp.getTime());
                temp.setDate(temp.getDate()+Constants.Week);
                Date rightBound = new Date(temp.getTime());
                LambdaQueryWrapper<HabitRecord> wrapper1 = new LambdaQueryWrapper<>();
                wrapper1.ge(HabitRecord::getFinishTime,leftBound).lt(HabitRecord::getFinishTime,rightBound);
                Long count = recordMapper.selectCount(wrapper1);
                if(count<habit.getWeekPersistDays())
                    res.getData().add(habit);
                else
                    continue;
            }
            if(habit.getPeriod()!=null)
            {
                Date beginDate = new Date(habit.getBeginDate().getTime());
                if(beginDate.getTime()==date.getTime()){
                    res.getData().add(habit);
                    continue;
                }
                Duration period = Duration.ofDays(habit.getPeriod());
                if((date.getTime()-beginDate.getTime())%period.toMillis()!=0)
                    continue;
                res.getData().add(habit);
            }
            if(habit.getDays()!=null){
                Map<String,Integer> days = habit.getDays();
                for(String day:days.keySet()){
                    if(days.get(day).equals(time.getDay()))
                    {
                       res.getData().add(habit);
                       break;
                    }
                }
            }
            if(today.getTime()>=date.getTime()) {
                LambdaQueryWrapper<HabitRecord> wrapper = new LambdaQueryWrapper<>();
                wrapper.eq(HabitRecord::getHabitId, habit.getHabitId()).eq(HabitRecord::getDay, date);
                HabitRecord record = recordMapper.selectOne(wrapper);
                if (record == null) {
                    record = new HabitRecord();
                    record.setHabitId(habit.getHabitId());
                    record.setDay(date);
                    record.setFinished(false);
                    recordMapper.insert(record);
                    flag = true;
                }
                habit.setFinished(record.getFinished());
                habit.setFinishTime(record.getFinishTime());
            }
        }
        res.setTotal(page.getTotal());
        if(!flag) {
            redis.set(key1, res, Constants.CachingExpire);
            redis.set(key2, time, Constants.CachingExpire);
        }
        else{
            if(redis.has(key1)&&redis.has(key2))
            {
                redis.remove(key1);
                redis.remove(key2);
            }
        }
        return res;
    }

    @Override
    public List<HabitGroup> getHabitGroups(String userId, RedisCache redis) {
        final String key =String.format("Caching_%s_%s",userId,CachingKeys.GetHabitGroups);
        ArrayDataModel<HabitGroup> model;
        if(redis.has(key))
        {
            model = (ArrayDataModel<HabitGroup>) redis.get(key);
            return  List.of(model.getData());
        }
        LambdaQueryWrapper<HabitGroup> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(HabitGroup::getUserId,userId);
        List<HabitGroup> res = groupMapper.selectList(wrapper);
        model = new ArrayDataModel<>();
        HabitGroup[] data = new HabitGroup[res.size()];
        model.setData(res.toArray(data));
        redis.set(key,model,Constants.CachingExpire);
        return res;
    }

    @Override
    @Transactional
    public Long createHabitGroup(String userId, String habitName) {
        HabitGroup group = new HabitGroup();
        group.setName(habitName);
        group.setUserId(userId);
        Integer maxCode = groupMapper.getMaxCode(userId);
        group.setCode(maxCode+1);
        groupMapper.insert(group);
        return group.getId();
    }

    @Transactional
    @Override
    public HabitModel updateHabit(HabitModel model){
        LambdaUpdateWrapper<Habit> wrapper = new LambdaUpdateWrapper<>();
        wrapper.set(Habit::getBeginDate,model.getBeginDate()).set(Habit::getDescription,model.getDescription())
                .set(Habit::getName,model.getName()).set(Habit::getPriority,model.getPriority())
                .set(Habit::getThumb,model.getThumb()).set(Habit::getGroupId,model.getGroupId())
                .eq(Habit::getId,model.getHabitId());
        LambdaUpdateWrapper<HabitOption> wrapper1 = new LambdaUpdateWrapper<>();
        wrapper1.set(HabitOption::getAimDays,model.getAimDays()).eq(HabitOption::getHabitId,model.getHabitId());
        LambdaUpdateWrapper<HabitFrequency> wrapper2 = new LambdaUpdateWrapper<>();
        String value = model.getDays()==null? null:ObjectUtil.asJsonStr(model.getDays());
        wrapper2.set(HabitFrequency::getDays,value).set(HabitFrequency::getWeekPersistDays,model.getWeekPersistDays())
                .set(HabitFrequency::getPeriod,model.getPeriod()).eq(HabitFrequency::getHabitId,model.getHabitId());
        LambdaQueryWrapper<HabitReminder> wrapper3 = new LambdaQueryWrapper<>();
        wrapper3.eq(HabitReminder::getHabitId,model.getHabitId());
        List<HabitReminderModel> reminderModels= model.getReminderModels();
        List<Long> toDeleteReminderIds = new ArrayList<>();
        List<Integer> toDeleteIndexes = new ArrayList<>();
        for(int i=0;i<reminderModels.size();i++){
            HabitReminderModel reminderModel = reminderModels.get(i);
            if(reminderModel.getReminderId()==null){
                if(reminderModel.getToDelete()){
                    toDeleteIndexes.add(i);
                    continue;
                }
                HabitReminder reminder = new HabitReminder();
                reminder.setHabitId(model.getHabitId());
                reminder.setTime(reminderModel.getTime());
                reminderMapper.insert(reminder);
                reminderModel.setReminderId(reminder.getId());
            }
            else{
                if(!reminderModel.getToDelete()){
                    LambdaUpdateWrapper<HabitReminder> wrapper4 = new LambdaUpdateWrapper<>();
                    wrapper4.set(HabitReminder::getTime,reminderModel.getTime())
                            .set(HabitReminder::getUpdateTime,Constants.Now())
                            .eq(HabitReminder::getId,reminderModel.getReminderId());
                    reminderMapper.update(wrapper4);
                }
                else{
                    toDeleteIndexes.add(i);
                    toDeleteReminderIds.add(reminderModel.getReminderId());
                }
            }
        }
        for(int index:toDeleteIndexes)
            reminderModels.remove(index);
        if(toDeleteReminderIds.size()>Constants.None) {
            LambdaQueryWrapper<HabitReminder> wrapper5 = new LambdaQueryWrapper<>();
            wrapper5.in(HabitReminder::getId, toDeleteReminderIds);
            reminderMapper.delete(wrapper5);
        }
        mapper.update(wrapper);
        optionMapper.update(wrapper1);
        frequencyMapper.update(wrapper2);
        return model;
    }

    @Override
    public String uploadThumb(MultipartFile image, String habitId, String originalFileName, FileService fileService) {
        LambdaUpdateWrapper<Habit> wrapper = new LambdaUpdateWrapper<>();
        if(originalFileName!=null&&!Constants.isDefaultThumb(originalFileName))
            fileService.removeImage(originalFileName);
        String newFileName = fileService.uploadImage(image);
        wrapper.set(Habit::getThumb,newFileName).eq(Habit::getId,habitId);
        mapper.update(wrapper);
        return newFileName;
    }

    @Override
    @Transactional
    public int removeGroup(String userId, Long groupId, Integer code) {
        groupMapper.beforeRemove(userId,code);
        return groupMapper.deleteById(groupId);
    }

    @Override
    @Transactional
    public int finishOrNot(HabitRecordModel model) {
        LambdaUpdateWrapper<HabitRecord> wrapper = new LambdaUpdateWrapper<>();
        wrapper.set(HabitRecord::getFinished,model.getFinished()).set(HabitRecord::getFinishTime,model.getFinishTime());
        HabitOption option = optionMapper.selectOne(new LambdaQueryWrapper<HabitOption>()
                .eq(HabitOption::getHabitId,model.getHabitId()));
        int continuousDays = 0;
        List<Boolean> states = recordMapper.getFinishStatesOrdered(model.getHabitId());
        for(int i=0;i<states.size();i++){
            if(states.get(i))
                continuousDays++;
            else
            if(i!= states.size()-1)
                break;
        }
        if(model.getFinished())
        {
            option.setPersistDays(option.getPersistDays()+1);
            if(continuousDays>option.getMostDays())
                option.setMostDays(continuousDays);
        }
        else
            option.setPersistDays(option.getPersistDays()-1);
        option.setContinuousDays(continuousDays);
        wrapper.eq(HabitRecord::getHabitId,model.getHabitId()).eq(HabitRecord::getDay,model.getDay());
        optionMapper.updateById(option);
        recordMapper.update(wrapper);
        return continuousDays;
    }

    @Override
    public List<HabitReminderVO> getReminders(String habitId) {
       return reminderMapper.getHabitReminders(habitId);
    }

    @Override
    @Transactional
    public int removeHabit(String habitId) {
        LambdaUpdateWrapper<Habit> wrapper = new LambdaUpdateWrapper<>();
        wrapper.set(Habit::getDeleteFlag,true).eq(Habit::getId,habitId);
       /* optionMapper.delete(habitId);
        reminderMapper.delete(habitId);
        recordMapper.delete(habitId);
        frequencyMapper.delete(habitId);*/
        return mapper.update(wrapper);
    }

    @Override
    public boolean isInFrequency(String habitId, Date day, Long habitBeginDate) {
        HabitFrequency frequency = frequencyMapper.selectOne(new LambdaQueryWrapper<HabitFrequency>()
                .eq(HabitFrequency::getHabitId,habitId));
        boolean canGen = false;
        if(frequency.getDays()!=null){
            var days = frequency.getDays();
            for (String key:days.keySet()){
                if(days.get(key).equals(day.getDay()))
                {
                    canGen = true;
                    break;
                }
            }
        }
        if(frequency.getWeekPersistDays()!=null) {
            Date temp = new Date(day.getTime());
            temp.setDate(temp.getDate() - temp.getDay());
            Date leftBound = new Date(temp.getTime());
            temp.setDate(temp.getDate() + Constants.Week);
            Date rightBound = new Date(temp.getTime());
            LambdaQueryWrapper<HabitRecord> wrapper = new LambdaQueryWrapper<>();
            wrapper.ge(HabitRecord::getFinishTime, leftBound).lt(HabitRecord::getFinishTime, rightBound);
            Long count = recordMapper.selectCount(wrapper);
            canGen = count<frequency.getWeekPersistDays();
        }
        if(frequency.getPeriod()!=null){
            Duration duration = Duration.ofDays(frequency.getPeriod());
            canGen = ((day.getTime() - habitBeginDate)%duration.toMillis()) == 0;
        }
       return canGen;
    }

    @Override
    public List<HabitRecordVO> getHabitRecords(String habitId) {
        return recordMapper.getHabitRecords(habitId);
    }
}
