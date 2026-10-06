package com.hayaawear.dto.cart;

import com.hayaawear.dto.product.ProductVariantOptionResponse;

import java.util.List;

public class CartItemResponse {

    private Long itemId;
    private Long productId;
    private String productName;

    private Long variantId;
    private List<ProductVariantOptionResponse> variantOptions;

    private double price;
    private int quantity;

    public CartItemResponse() {
    }

    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Long getVariantId() {
        return variantId;
    }

    public void setVariantId(Long variantId) {
        this.variantId = variantId;
    }

    public List<ProductVariantOptionResponse> getVariantOptions() {
        return variantOptions;
    }

    public void setVariantOptions(
            List<ProductVariantOptionResponse> variantOptions) {
        this.variantOptions = variantOptions;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}