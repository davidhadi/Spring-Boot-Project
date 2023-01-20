package com.SimpleAuthentication.SimpleAuthentication.Repository;

import com.SimpleAuthentication.SimpleAuthentication.Model.User;

import java.util.List;

public interface UserRepositoryService {

    List<User> findByEmail(String email);

    List<User> findBySalaryBetween(int salary1, int salary2);

}
