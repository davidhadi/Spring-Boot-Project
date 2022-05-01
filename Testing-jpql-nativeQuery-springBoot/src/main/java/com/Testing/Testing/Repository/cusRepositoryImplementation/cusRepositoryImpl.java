package com.Testing.Testing.Repository.cusRepositoryImplementation;

import com.Testing.Testing.Repository.cusRepository;
import com.Testing.Testing.Roles.Costomer;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Service("cusRepositoryImpl")
public class cusRepositoryImpl implements cusRepository {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Costomer> getAllCostomer() {

        Query query = entityManager.createNativeQuery("SELECT c.* FROM Costomer c", Costomer.class);
        //query.getParameter(1);
        return query.getResultList();
    }

//    @Override
//    public boolean deleteById(String name) {
//        Query query = entityManager.createQuery("DELETE FROM Costomer c WHERE c.firstName = ?1", Costomer.class);
//        query.getParameter(name);
//        return true;
//  }
}