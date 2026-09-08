package com.hayaawear.dto.order;

public class PlaceOrderResponse {

    private Long orderId;
    private String message;

    public PlaceOrderResponse() {
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
