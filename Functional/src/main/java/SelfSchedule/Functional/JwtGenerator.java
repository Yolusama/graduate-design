package SelfSchedule.Functional;

import SelfSchedule.Common.Constants;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JwtGenerator {
    public static String generateToken(String secretKey,String userId,Long expire,String issuer,String audience)
    {
        Long nowTicks=new Date().getTime();
        Date exp = new Date(nowTicks+expire);
        Map<String,Object> claims=new HashMap<>();
        claims.put(Constants.JwtUserClaim,userId);
        JwtBuilder builder = Jwts.builder()
                .setClaims(claims)
                .setAudience(audience)
                .setIssuer(issuer)
                .signWith(SignatureAlgorithm.HS256, secretKey.getBytes(StandardCharsets.UTF_8))
                .setExpiration(exp);
        return builder.compact();
    }

    public static String generateToken(String secretKey, String userId, Duration expire, String issuer, String audience)
    {
        return generateToken(secretKey,userId,expire.toMillis(),issuer,audience);
    }
}
