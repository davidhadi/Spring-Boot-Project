package com.hayaawear.dto.cart;

public class AddToCartRequest {

    private Long productId;
    private int quantity;

    public AddToCartRequest() {
    }

    public Long getProductId() {
        return productId;
    }

    public int getQuantity() {
        return quantity;
    }
}
