package SelfSchedule.DbOption.Service;

import SelfSchedule.Common.Pair;
import SelfSchedule.Entity.TaskLabel;
import SelfSchedule.Entity.VO.IndexDisplayVO;
import SelfSchedule.Service.FileService;
import SelfSchedule.Service.RedisCache;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface IndexServiceInterface {
    Map<String, List<IndexDisplayVO>> getData(String userId, Long labelId, Date time,RedisCache redis);
    List<TaskLabel> getLabels(String userId,RedisCache redis);
    Pair<Long,String> createLabel(String labelName, String userId, String icon, Boolean isList, MultipartFile file, FileService fileService);
    String updateLabel(Long labelId,String labelName,String icon,Boolean isList, MultipartFile file, FileService fileService);
    boolean checkLabelNameExists(String labelName);
    int hideOrShowLabel(Boolean display,Long labelId);
    int removeLabel(Long labelId);
}
