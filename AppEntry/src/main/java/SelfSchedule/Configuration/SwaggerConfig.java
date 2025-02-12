package SelfSchedule.Configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket docket() {
        return new Docket(DocumentationType.SWAGGER_2)
              .groupName("项目接口文档")
                .apiInfo(apiInfo("接口文档"))
                .select()
                .apis(RequestHandlerSelectors.basePackage("SelfSchedule.Controller"))
                .paths(PathSelectors.any())
                .build();
    }
    private ApiInfo apiInfo(String desc) {
        return new ApiInfoBuilder()
                //页面标题
                .title(desc)
                .version("1.0")
                .description("API 描述")
                .build();

    }
}
