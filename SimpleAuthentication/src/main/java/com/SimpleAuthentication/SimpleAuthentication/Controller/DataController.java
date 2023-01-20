package com.SimpleAuthentication.SimpleAuthentication.Controller;

import com.SimpleAuthentication.SimpleAuthentication.DataService.DataService;
import com.SimpleAuthentication.SimpleAuthentication.Model.User;
import com.SimpleAuthentication.SimpleAuthentication.Repository.UserRepository;
import com.SimpleAuthentication.SimpleAuthentication.Repository.UserRepositoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/test")
public class DataController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRepositoryService userRepositoryService;

    @Autowired
    private DataService dataService;

    @PostMapping("/email")
    public List<User> getData(@RequestBody User user){
        return dataService.getDataByEmail(user.getEmail());
    }

    @GetMapping("/salary")
    public List<User> getDataBySalary(@RequestParam("salary1") int salary1, @RequestParam("salary2") int salary2){
        return dataService.getDataBySalaryBetween(salary1, salary2);
    }

    @GetMapping("/count")
    public int countUser(){
        return userRepository.countUser();
    }

}
