package SelfSchedule.DbOption.Service;

import SelfSchedule.Entity.VO.IndexDisplayVO;
import SelfSchedule.Service.RedisCache;

import java.util.List;
import java.util.Map;

public interface IndexServiceInterface {
    Map<String, List<IndexDisplayVO>> getData(String userId, RedisCache redis);
}
