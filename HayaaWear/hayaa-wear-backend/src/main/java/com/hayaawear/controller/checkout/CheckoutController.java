package com.hayaawear.controller.checkout;

import com.hayaawear.dto.checkout.CheckoutRequest;
import com.hayaawear.dto.checkout.CheckoutResponse;
import com.hayaawear.service.checkout.CheckoutService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/checkout")
@PreAuthorize("hasRole('CUSTOMER')")
public class CheckoutController {

    private final CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping
    public ResponseEntity<CheckoutResponse> checkout(
            @RequestBody CheckoutRequest request,
            Authentication authentication) {

        CheckoutResponse response =
                checkoutService.checkout(
                        request,
                        authentication.getName()
                );

        return ResponseEntity.ok(response);
    }
}