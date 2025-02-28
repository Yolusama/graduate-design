package SelfSchedule.Aspect;

import SelfSchedule.Common.Constants;
import SelfSchedule.Functional.JwtParser;
import SelfSchedule.Service.RedisCache;
import SelfSchedule.Annotation.ClearRedisCache;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Method;

@Aspect
@Component
public class RedisCachingAspect {
    @Autowired
    private RedisCache redis;
    @Value("${jwt.secretKey}")
    private String secretKey;

    @Pointcut("@annotation(SelfSchedule.Annotation.ClearRedisCache)")
    private void aspect(){}

    @Before("aspect()")
    public void ActBefore(JoinPoint joinPoint) {
        try {
            Signature signature = joinPoint.getSignature();
            Object[] args = joinPoint.getArgs();
            HttpServletRequest request = (HttpServletRequest) args[args.length-1];
            String userId = JwtParser.parse(secretKey,request.getHeader(Constants.JwtTokenSign));
            Method method = ((MethodSignature)signature).getMethod();
            ClearRedisCache annotation = method.getAnnotation(ClearRedisCache.class);
            String[] keys = annotation.keys();
            for(String key:keys)
            {
                String toOperate = String.format("Caching_%s_%s",userId,key);
                if(redis.has(toOperate))
                    redis.remove(toOperate);
            }
        }
        catch (Throwable throwable){
            throwable.printStackTrace();
        }
    }
}
