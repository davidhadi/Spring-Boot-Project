package com.coffee.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class CustomerController {

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> adminOnly(){
        return ResponseEntity.ok("Admin section");
    }

    @GetMapping("/moderator")
    @PreAuthorize("hasRole('MODERATOR')")
    public ResponseEntity<String> moderatorOnly(){
        return ResponseEntity.ok("Moderator");
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<String> userOnly(){
        return ResponseEntity.ok("user");
    }
}
