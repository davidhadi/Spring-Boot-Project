package com.coffee.services.service;

import com.coffee.model.CartItem;

import java.util.List;

public interface CartItemService {
    CartItem getCartItemById(Long id);
    List<CartItem> getAllCartItems();
    CartItem updateCartItemQuantity(Long id, int quantity);
    void deleteCartItem(Long id);
}