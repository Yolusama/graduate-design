package SelfSchedule;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
@EnableCaching
public class AppEntry {
    public static void main(String[] args)
    {
        SpringApplication.run(AppEntry.class,args);
    }
}
