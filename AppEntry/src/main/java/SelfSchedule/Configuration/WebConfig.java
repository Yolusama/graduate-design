package SelfSchedule.Configuration;

import SelfSchedule.Interceptor.JwtAuthorizer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

import javax.annotation.Resource;

@Configuration
public class WebConfig extends WebMvcConfigurationSupport {
    @Value("${resource.img.location}")
    private String imgLocation;
    @Value("${resource.img.pattern}")
    private String imgPattern;
    @Value("${resource.download.pattern}")
    private String downloadPattern;
    @Value("${resource.download.location}")
    private String downloadLocation;
    @Value("${resource.notify.pattern}")
    private String notifyPattern;
    @Value("${resource.notify.location}")
    private String notifyLocation;

    @Resource
    private JwtAuthorizer jwtAuthorizer;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/Api/**").allowedMethods("*")
                .allowedOrigins("*")
                .allowedHeaders("*");
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
       registry.addInterceptor(jwtAuthorizer).
               excludePathPatterns(jwtAuthorizer.getNotInterceptedPatterns());
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
       registry.addResourceHandler(imgPattern).addResourceLocations(imgLocation);
       registry.addResourceHandler(downloadPattern).addResourceLocations(downloadLocation);
       registry.addResourceHandler(notifyPattern).addResourceLocations(notifyLocation);

       registry.addResourceHandler("/swagger-ui/**")
                .addResourceLocations("classpath:/META-INF/resources/webjars/springfox-swagger-ui/");
       registry.addResourceHandler("/webjars/**")
                .addResourceLocations("classpath:/META-INF/resources/webjars/");
    }
}
