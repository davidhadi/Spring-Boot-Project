package com.Testing.Testing.Repository;

import com.Testing.Testing.Roles.Costomer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CostomerRepository extends JpaRepository<Costomer, Long> , cusRepository{

    @Query(value = "select * from costomer where city=:c" , nativeQuery = true)
    List<Costomer> getbyCityName(@Param("c") String city);

    @Query("SELECT c FROM Costomer c")
    List<Costomer> getAll();

    //@Query(value = "select u.gender from costomer u where u.city=:c and u.first_name=:n" , nativeQuery = true)
    @Query("SELECT c.Gender FROM Costomer c WHERE city = ?1 AND firstname = ?2")
    String getbyCityAndName(String city, String name);

}
