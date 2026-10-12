package com.hayaawear.service.payment;

import com.hayaawear.dto.payment.PaymentResponse;
import com.hayaawear.entity.Order;

public interface PaymentService {

    void createCodPayment(Order order);

    PaymentResponse getPaymentByOrderId(
            Long orderId,
            String userEmail
    );
}