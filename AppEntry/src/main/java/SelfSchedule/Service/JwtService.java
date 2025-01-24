package SelfSchedule.Service;

import SelfSchedule.Common.Constants;
import SelfSchedule.Functional.JwtGenerator;
import SelfSchedule.Functional.JwtParser;
import SelfSchedule.Configuration.JwtConfig;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class JwtService {
    private final JwtConfig jwtConfig;

    public String SecretKey()
    {
        return jwtConfig.getSecretKey();
    }

    @Autowired
    public JwtService(JwtConfig jwtConfig)
    {
        this.jwtConfig = jwtConfig;
    }

    public String GenerateToken(String userId, Duration expire)
    {
        return JwtGenerator.generateToken(jwtConfig.getSecretKey(),
                userId,expire,jwtConfig.getIssuer(),jwtConfig.getAudience());
    }

    public String GetUserIdFromToken(String token)
    {
        try {
            return JwtParser.parse(jwtConfig.getSecretKey(), token);
        }
        catch (ExpiredJwtException ex){
            ex.printStackTrace();
            return Constants.TokenExpireSign;
        }
    }
}
