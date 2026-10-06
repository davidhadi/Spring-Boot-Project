package com.hayaawear.repository;

import com.hayaawear.entity.Cart;
import com.hayaawear.entity.CartItem;
import com.hayaawear.entity.Product;
import com.hayaawear.entity.ProductVariant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    Optional<CartItem> findByCartAndProduct(Cart cart, Product product);

    Optional<CartItem> findByCartAndProductAndVariant(
            Cart cart,
            Product product,
            ProductVariant variant
    );

}
