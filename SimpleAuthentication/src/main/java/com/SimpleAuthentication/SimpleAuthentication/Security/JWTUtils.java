package com.SimpleAuthentication.SimpleAuthentication.Security;


import com.SimpleAuthentication.SimpleAuthentication.Service.UserDetailService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JWTUtils {

    private static final Logger logger = LoggerFactory.getLogger(JWTUtils.class);

    public String generateToken(Authentication authentication) {

        UserDetailService userDetailService = (UserDetailService) authentication.getPrincipal();

        String secretKey = "secret";
        return Jwts.builder()
                .setSubject(userDetailService.getUsername())
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public String getUsernameFromToken(String token) {
        String secretKey = "secret";
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateToken(String token) {
        try {
            String secretKey = "secret";
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
