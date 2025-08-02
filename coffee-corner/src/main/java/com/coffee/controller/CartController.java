package com.coffee.controller;

import com.coffee.model.Cart;
import com.coffee.model.Customers;
import com.coffee.repository.CustomerRepository;
import com.coffee.services.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Optional;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private CustomerRepository customerRepository;


    // Example method to fetch customer from Principal (you may replace this with a proper service lookup)
    private Customers getAuthenticatedCustomer(Principal principal) {
        return customerRepository.findByEmail(principal.getName());
    }


    // Create a cart for the authenticated customer
    @PostMapping("/create")
    public ResponseEntity<Cart> createCart(Principal principal) {
        Customers customer = getAuthenticatedCustomer(principal);
        Cart cart = cartService.createCart(customer);
        return ResponseEntity.ok(cart);
    }


    // Get cart by customer
    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Cart> getCart(Principal principal) {
        Customers customer = getAuthenticatedCustomer(principal);
        Optional<Cart> cart = cartService.getCartByCustomer(customer);
        return cart.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Add item to cart
    @PostMapping("/{cartId}/add")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Cart> addItemToCart(@PathVariable Long cartId,
                                              @RequestParam Long productId,
                                              @RequestParam int quantity) {
        System.out.println("➡️ AddItemToCart called: cartId=" + cartId + ", productId=" + productId + ", qty=" + quantity);

        Cart updatedCart = cartService.addItemToCart(cartId, productId, quantity);
        return ResponseEntity.ok(updatedCart);
    }

    // Remove item from cart
    @DeleteMapping("/{cartId}/remove")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Void> removeItemFromCart(@PathVariable Long cartId,
                                                   @RequestParam Long productId) {
        cartService.removeItemFromCart(cartId, productId);
        return ResponseEntity.noContent().build();
    }

    // Clear all items from cart
    @DeleteMapping("/{cartId}/clear")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Void> clearCart(@PathVariable Long cartId) {
        cartService.clearCart(cartId);
        return ResponseEntity.noContent().build();
    }
}

