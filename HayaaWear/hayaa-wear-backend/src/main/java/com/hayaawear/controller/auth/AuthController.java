package com.hayaawear.controller.auth;

import com.hayaawear.dto.auth.AuthResponse;
import com.hayaawear.dto.auth.LoginRequest;
import com.hayaawear.dto.auth.RegisterRequest;
import com.hayaawear.entity.User;
import com.hayaawear.security.jwt.JwtTokenProvider;
import com.hayaawear.service.user.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private  AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public AuthResponse registerCustomer(@Valid @RequestBody RegisterRequest request) {

        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setMobile(request.getMobile());
        user.setPassword(request.getPassword());

        User savedUser = userService.registerCustomer(user);

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        String token = jwtTokenProvider.generateToken(userDetails);

        return new AuthResponse(
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getMobile(),
                token,
                user.getRole().name(),
                user.isEmailVerified(),
                user.isMobileVerified()
        );
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.getEmail(),
                                request.getPassword()
                        )
                );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        String token = jwtTokenProvider.generateToken(userDetails);

        User user = userService.getUserByEmail(request.getEmail());

        return new AuthResponse(
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getMobile(),
                token,
                user.getRole().name(),
                user.isEmailVerified(),
                user.isMobileVerified()
        );
    }
}
