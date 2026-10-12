package com.hayaawear.controller.payment;

import com.hayaawear.dto.payment.PaymentResponse;
import com.hayaawear.service.payment.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
@PreAuthorize("hasRole('CUSTOMER')")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<PaymentResponse> getPaymentByOrderId(
            @PathVariable Long orderId,
            Authentication authentication) {

        return ResponseEntity.ok(
                paymentService.getPaymentByOrderId(
                        orderId,
                        authentication.getName()
                )
        );
    }
}