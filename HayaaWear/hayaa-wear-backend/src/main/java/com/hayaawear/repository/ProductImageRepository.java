package com.hayaawear.repository;

import com.hayaawear.entity.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {

    // Ek product ke saare images
    List<ProductImage> findByProductId(Long productId);

    // Product ka primary (thumbnail) image
    ProductImage findByProductIdAndPrimaryImageTrue(Long productId);

    boolean existsByProductId(Long productId);

    ProductImage findFirstByProductIdAndIdNot(Long productId, Long imageId);

    // Safety: product delete hone par images clean karne ke liye
    void deleteByProductId(Long productId);
}
