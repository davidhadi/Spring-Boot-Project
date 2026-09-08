package com.hayaawear.dto.cart;

import java.util.List;

public class CartResponse {

    private List<CartItemResponse> items;
    private Double totalAmount;

    public CartResponse() {
    }

    public List<CartItemResponse> getItems() {
        return items;
    }

    public void setItems(List<CartItemResponse> items) {
        this.items = items;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }
}
