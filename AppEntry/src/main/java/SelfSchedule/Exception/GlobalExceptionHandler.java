package SelfSchedule.Exception;

import SelfSchedule.Result.ActionResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Arrays;


@ControllerAdvice
public class GlobalExceptionHandler
{
    private final Logger logger = LoggerFactory.getLogger(getClass());
    @ExceptionHandler(Exception.class)
    public ActionResult Handle(Exception ex)
    {
        logger.error(ex.getMessage()+ Arrays.toString(ex.getStackTrace()));
        ex.printStackTrace();
        return ActionResult.ServerError;
    }
}
