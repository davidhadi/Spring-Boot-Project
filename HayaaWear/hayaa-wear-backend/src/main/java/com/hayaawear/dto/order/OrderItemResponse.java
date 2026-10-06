package com.hayaawear.dto.order;

import com.hayaawear.dto.product.ProductVariantOptionResponse;

import java.util.List;

public class OrderItemResponse {

    private Long productId;
    private String productName;

    private Long variantId;
    private List<ProductVariantOptionResponse> variantOptions;

    private int quantity;
    private Double price;

    public OrderItemResponse() {
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

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}