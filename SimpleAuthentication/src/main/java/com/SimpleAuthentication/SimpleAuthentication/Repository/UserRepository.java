package com.SimpleAuthentication.SimpleAuthentication.Repository;

import com.SimpleAuthentication.SimpleAuthentication.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User findByUsername(String username);


    @Query(value = "SELECT COUNT(*) FROM user", nativeQuery = true)
    int countUser();
}
