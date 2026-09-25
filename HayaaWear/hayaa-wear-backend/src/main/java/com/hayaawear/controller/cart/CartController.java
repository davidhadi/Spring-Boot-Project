package com.hayaawear.controller.cart;

import com.hayaawear.dto.cart.*;
import com.hayaawear.service.cart.CartService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
@PreAuthorize("hasRole('CUSTOMER')")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping
    public ResponseEntity<String> addToCart(@RequestBody AddToCartRequest request, Authentication authentication) {

        cartService.addToCart(request, authentication.getName());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Added to cart");
    }

    @GetMapping
    public CartResponse getMyCart(Authentication authentication) {
        return cartService.getMyCart(authentication.getName());
    }

    @PutMapping("/{itemId}")
    public ResponseEntity<String> updateQuantity(@PathVariable Long itemId, @RequestParam int quantity, Authentication authentication) {
        cartService.updateQuantity(itemId, quantity, authentication.getName());
        return ResponseEntity.ok("Quantity updated");
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<Void> removeItem(
            @PathVariable Long itemId,
            Authentication authentication) {

        cartService.removeItem(itemId, authentication.getName());
        return ResponseEntity.noContent().build();
    }
}
