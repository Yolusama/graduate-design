package SelfSchedule;

import SelfSchedule.Functional.VoskModel;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
@EnableCaching
public class AppEntry implements CommandLineRunner {
    @Value("${vosk.path}")
    private String voskPath;

    public static void main(String[] args)
    {
        SpringApplication.run(AppEntry.class,args);
    }

    @Override
    public void run(String... args) throws Exception {
        VoskModel.getModel(voskPath);
    }
}
