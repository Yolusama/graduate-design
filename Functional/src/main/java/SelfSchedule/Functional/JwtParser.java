package SelfSchedule.Functional;

import SelfSchedule.Common.Constants;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import java.nio.charset.StandardCharsets;

public class JwtParser {
    public static String parse(String secretKey,String jwtToken){
        Claims claims = Jwts.parser()
                .setSigningKey(secretKey.getBytes(StandardCharsets.UTF_8))
                .parseClaimsJws(jwtToken).getBody();
        return claims.get(Constants.JwtUserClaim).toString();
    }
}
