package com.coffee.payload.response;

public class OrderItemResponse {
    private Long id;
    private int quantity;
    private double price;
    private String productName;

    public OrderItemResponse(Long id, int quantity, double price, String productName) {
        this.id = id;
        this.quantity = quantity;
        this.price = price;
        this.productName = productName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }
}
