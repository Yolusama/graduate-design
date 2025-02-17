package SelfSchedule.DbOption.Service;

import SelfSchedule.Entity.VO.IndexDisplayVO;
import SelfSchedule.Entity.VO.TaskLabelOptionVO;
import SelfSchedule.Entity.VO.TaskLabelVO;
import SelfSchedule.Model.ArrayDataModel;
import SelfSchedule.Service.FileService;
import SelfSchedule.Service.RedisCache;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface IndexServiceInterface {
    Map<String, List<IndexDisplayVO>> getData(String userId, Long labelId, Date time,RedisCache redis);
    List<TaskLabelVO> getLabels(String userId,RedisCache redis);
    Long createLabel(String labelName, String userId, String icon, Boolean isList);
    int updateLabel(Long labelId,String labelName);
    String uploadLabelIcon(Long labelId,String icon,boolean isList,MultipartFile file,FileService fileService);
    boolean checkLabelNameExists(String labelName,String userId);
    int hideOrShowLabel(Boolean display,Long labelId);
    int removeLabel(Long labelId,FileService fileService);
    TaskLabelVO createOrCheckLabel(String labelName, String userId);
    List<TaskLabelVO> getHiddenLabels(String userId,RedisCache redis);
    void checkYesterdayTask(Date yesterday,String userId,RedisCache redis);
    void checkHabitContinuousDays(Date yesterday, String userId, RedisCache redis);
    void logout(boolean cancelAccount,String userId,String email, RedisCache redis);
    int removeOrRecoverTask(Long taskId,Boolean isRemove);
    int removeOrRecoverHabit(String habitId,Boolean isRemove);
    List<TaskLabelVO> takeTaskLabelsFor(String userId, Long taskId,Long listId, ArrayDataModel<String> model);
    int moveListTo(Long taskId,Long listId);
    TaskLabelOptionVO getTaskLabels(Long taskId, String userId);
}
