package com.coffee.services.service;

import com.coffee.model.Cart;
import com.coffee.model.Customers;

import java.util.Optional;

public interface CartService {

    Cart createCart(Customers customer);
    Optional<Cart> getCartByCustomer(Customers customer);
    Cart addItemToCart(Long cartId, Long productId, int quantity);
    void removeItemFromCart(Long cartId, Long productId);
    void clearCart(Long cartId);
}
