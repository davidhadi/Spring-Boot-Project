package com.SimpleAuthentication.SimpleAuthentication.DataService;

import com.SimpleAuthentication.SimpleAuthentication.Model.User;
import com.SimpleAuthentication.SimpleAuthentication.Repository.UserRepositoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DataService {

    @Autowired
    private UserRepositoryService userRepositoryService;

    public List<User> getDataByEmail(String email){
        return userRepositoryService.findByEmail(email);
    }

    public List<User> getDataBySalaryBetween(int salary1, int salary2){
        return userRepositoryService.findBySalaryBetween(salary1, salary2);
    }
 }
