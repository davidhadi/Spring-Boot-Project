package com.hayaawear.repository;

import com.hayaawear.entity.SellerProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SellerProfileRepository extends JpaRepository<SellerProfile, Long> {

    Optional<SellerProfile> findByUserId(Long userId);

    List<SellerProfile> findByApprovedFalse();

}

