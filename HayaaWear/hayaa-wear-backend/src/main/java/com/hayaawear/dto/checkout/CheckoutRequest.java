package com.hayaawear.dto.checkout;

public class CheckoutRequest {

    private Long shippingAddressId;

    public CheckoutRequest() {
    }

    public Long getShippingAddressId() {
        return shippingAddressId;
    }

    public void setShippingAddressId(Long shippingAddressId) {
        this.shippingAddressId = shippingAddressId;
    }
}