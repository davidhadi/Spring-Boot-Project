package com.Springsecurity.api;

import com.Springsecurity.Payload.request.LoginRequest;
import com.Springsecurity.Payload.request.SignupRequest;
import com.Springsecurity.model.Alian;
import com.Springsecurity.repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class Controller {

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    userRepository userRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    @PostMapping("/signin")
    public String signin(@RequestBody LoginRequest loginRequest){
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        return "Login Successfully";
    }

    @PostMapping("/register")
    public String register(@RequestBody SignupRequest signupRequest){
        Alian alian = new Alian(signupRequest.getUsername(), encoder.encode(signupRequest.getPassword()));
     userRepository.save(alian);
     return "Data enter Successfully..!";

    }

}
