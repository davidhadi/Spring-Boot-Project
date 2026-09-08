package com.coffee.controller;

import com.coffee.model.Customers;
import com.coffee.model.ERole;
import com.coffee.model.Role;
import com.coffee.payload.CustomerDto;
import com.coffee.payload.Login;
import com.coffee.payload.response.CustomerResponse;
import com.coffee.repository.RoleRepository;
import com.coffee.repository.CustomerRepository;
import com.coffee.security.JwtUtils;
import com.coffee.services.UserDetailsImpl;
import com.coffee.services.serviceimpl.CartServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/api/auth/v1")
public class AuthController {

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CartServiceImpl cartService;


    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/signin")
    @ResponseBody
    public CustomerResponse login(@RequestBody Login login){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                login.getEmail(), login.getPassword()
        ));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();


        String jwt = jwtUtils.generateToken(userDetails.getUsername());
        System.out.println(login.getEmail() + " " + login.getPassword());
        return new CustomerResponse(
                userDetails.getId(),
                userDetails.getFname(),
                userDetails.getLname(),
                userDetails.getEmail(),
                userDetails.getRoles(),
                userDetails.getContact(),
                userDetails.getAddress(),
                jwt
        );
    }

    @PostMapping("/signup")
    @ResponseBody
    public ResponseEntity<String> signup(@RequestBody CustomerDto customerDto){
        Customers customers = new Customers();
        customers.setFname(customerDto.getFname());
        customers.setLname(customerDto.getLname());
        customers.setEmail(customerDto.getEmail());
        customers.setPassword(passwordEncoder.encode(customerDto.getPassword()));
        customers.setContact(customerDto.getContact());

        Set<String> strRoles = customerDto.getRole();
        Set<Role> roles = new HashSet<>();

        System.out.println(strRoles == null);

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);
                        break;
                    case "mod":
                        Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(modRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        System.out.println(roles);

        customers.setRoles(roles);
        customers.setAddress(customerDto.getAddress());

        customerRepository.save(customers);
        cartService.createCart(customers);

        return ResponseEntity.ok("User created successfully.");
    }
}
