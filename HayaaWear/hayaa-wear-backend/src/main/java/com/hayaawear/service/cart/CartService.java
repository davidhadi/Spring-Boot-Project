package com.hayaawear.service.cart;

import com.hayaawear.dto.cart.AddToCartRequest;
import com.hayaawear.dto.cart.CartResponse;

public interface CartService {

    void addToCart(AddToCartRequest request, String userEmail);

    CartResponse getMyCart(String userEmail);

    void updateQuantity(Long itemId, int quantity, String userEmail);

    void removeItem(Long itemId, String userEmail);
}
