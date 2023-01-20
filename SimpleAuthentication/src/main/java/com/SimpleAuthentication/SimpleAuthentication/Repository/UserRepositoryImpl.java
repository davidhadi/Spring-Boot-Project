package com.SimpleAuthentication.SimpleAuthentication.Repository;

import com.SimpleAuthentication.SimpleAuthentication.Model.User;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

public class UserRepositoryImpl implements UserRepositoryService{

    @Autowired
    private EntityManager entityManager;

    @Override
    public List<User> findByEmail(String email) {
        Query query = entityManager.createNativeQuery("SELECT * FROM user s WHERE s.email = :email", User.class);
        query.setParameter("email", email);
        return query.getResultList();
    }

    @Override
    public List<User> findBySalaryBetween(int salary1, int salary2) {
        Query query = entityManager.createNativeQuery("SELECT * FROM user u WHERE u.salary BETWEEN :salary1 AND :salary2");
        query.setParameter("salary1", salary1);
        query.setParameter("salary2", salary2);

        return query.getResultList();
    }

}
