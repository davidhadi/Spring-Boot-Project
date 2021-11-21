package com.Springsecurity.repository;

import com.Springsecurity.model.Alian;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface userRepository extends JpaRepository<Alian, Long> {
   Optional<Alian> findByUsername(String username);
}
