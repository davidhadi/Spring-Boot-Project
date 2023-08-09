package com.JavaDemo.app;

import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    public boolean authenticate(String username, String password){
        boolean isValidUserName = username.equals("Shakil");
        boolean isValidPassword = password.equals("root");
        return isValidUserName && isValidPassword;
    }

}
