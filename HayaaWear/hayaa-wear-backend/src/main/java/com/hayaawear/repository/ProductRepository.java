package com.hayaawear.repository;

import com.hayaawear.entity.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {

    List<Product> findBySellerId(Long sellerId);

    List<Product> findByOccasionsContaining(OccasionType occasion);

    List<Product> findBySleeveTypeAndHijabCompatible(SleeveType sleeveType, boolean hijabCompatible);

    Page<Product> findBySellerEmail(String email, Pageable pageable);

    Page<Product> findByStatus(ProductStatus status, Pageable pageable);

    List<Product> findByCategoryId(Long categoryId);

    @Query("""
        SELECT p FROM Product p
        WHERE (:sleeveType IS NULL OR p.sleeveType = :sleeveType)
        AND (:fitType IS NULL OR p.fitType = :fitType)
        AND (:hijabCompatible IS NULL OR p.hijabCompatible = :hijabCompatible)
        AND (:occasion IS NULL OR :occasion MEMBER OF p.occasions)
    """)
    List<Product> filterProducts(
            SleeveType sleeveType,
            FitType fitType,
            Boolean hijabCompatible,
            OccasionType occasion
    );

}

