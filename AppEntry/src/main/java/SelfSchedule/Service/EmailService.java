package SelfSchedule.Service;

import SelfSchedule.Functional.EMailSender;
import SelfSchedule.Configuration.EmailConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;

@Service
public class EmailService {
    private final EMailSender host;
    private final String feedback = "已收到用户反馈";

    @Autowired
    public EmailService(EmailConfig config)
    {
        host = new EMailSender(config.getHost(),config.getAuthorizationCode());
    }

    public Integer sendTo(String to,String title,String content)
    {
        return host.sendTo(to, title, content);
    }

    public void receiveFrom(String from,String content,FileService fileService){
        sendTo(from,feedback,"已收到您的反馈，会对此加以改进！");
        fileService.writeFeedbackFile(from,content);
    }

}
