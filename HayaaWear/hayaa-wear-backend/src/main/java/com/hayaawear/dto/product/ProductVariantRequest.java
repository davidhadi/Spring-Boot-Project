package com.hayaawear.dto.product;

import java.util.List;

public class ProductVariantRequest {

    private Double price;
    private Double discountPrice;
    private int stock;

    private List<ProductVariantOptionRequest> options;

    public ProductVariantRequest() {
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

    public List<ProductVariantOptionRequest> getOptions() {
        return options;
    }

    public void setOptions(List<ProductVariantOptionRequest> options) {
        this.options = options;
    }
}
