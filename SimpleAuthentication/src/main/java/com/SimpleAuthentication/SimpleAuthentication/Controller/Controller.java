package com.SimpleAuthentication.SimpleAuthentication.Controller;

import com.SimpleAuthentication.SimpleAuthentication.Model.User;
import com.SimpleAuthentication.SimpleAuthentication.Repository.UserRepository;
import com.SimpleAuthentication.SimpleAuthentication.Request.LoginRequest;
import com.SimpleAuthentication.SimpleAuthentication.Security.JWTUtils;
import com.SimpleAuthentication.SimpleAuthentication.Service.UserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class Controller {

    @Autowired
    JWTUtils jwtUtils;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailService userDetailService = (UserDetailService) authentication.getPrincipal();

        String jwt = jwtUtils.generateToken(authentication);

        return "Loging successfull , JWT : " + jwt;
    }

    @PostMapping("/signup")
    public String signup(@RequestBody User user){
        userRepository.save(new User(user.getUsername(), passwordEncoder.encode(user.getPassword()), user.getFirstName(),
                user.getEmail(), user.getGender(), user.getSalary()));

        return "Data Enter Successfull";
    }

    @GetMapping("/getname")
    public String getUser(Authentication authentication) {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

}
