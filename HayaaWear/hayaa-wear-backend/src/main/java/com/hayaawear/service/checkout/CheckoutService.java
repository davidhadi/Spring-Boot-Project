package com.hayaawear.service.checkout;

import com.hayaawear.dto.checkout.CheckoutRequest;
import com.hayaawear.dto.checkout.CheckoutResponse;

public interface CheckoutService {

    CheckoutResponse checkout(
            CheckoutRequest request,
            String userEmail
    );
}