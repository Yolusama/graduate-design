package SelfSchedule.Service;

import SelfSchedule.Functional.EMailSender;
import SelfSchedule.Configuration.EmailConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;

@Service
public class EmailService {
    private final EmailConfig config;

    @Autowired
    public EmailService(EmailConfig config)
    {
        this.config = config;
        EMailSender.init(config.getHost(),config.getAuthorizationCode());
    }

    public void sendTo(String to,String title,String content) throws MessagingException
    {
        EMailSender.sendTo(to, title, content);
    }

}
