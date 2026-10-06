package com.hayaawear.dto.product;

import java.util.List;

public class ProductVariantResponse {

    private Long id;
    private Double price;
    private Double discountPrice;
    private int stock;

    private List<ProductVariantOptionResponse> options;

    public ProductVariantResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getDiscountPrice() {
        return discountPrice;
    }

    public void setDiscountPrice(Double discountPrice) {
        this.discountPrice = discountPrice;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public List<ProductVariantOptionResponse> getOptions() {
        return options;
    }

    public void setOptions(List<ProductVariantOptionResponse> options) {
        this.options = options;
    }
}
