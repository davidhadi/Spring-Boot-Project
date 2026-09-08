package com.hayaawear.controller.cart;

import com.hayaawear.dto.cart.*;
import com.hayaawear.entity.Product;
import com.hayaawear.repository.ProductRepository;
import com.hayaawear.service.cart.CartService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
@PreAuthorize("hasRole('CUSTOMER')")
public class CartController {

    private final CartService cartService;

    private final ProductRepository productRepository;

    public CartController(CartService cartService, ProductRepository productRepository) {
        this.cartService = cartService;
        this.productRepository = productRepository;
    }

    @PostMapping
    public String addToCart(@RequestBody AddToCartRequest request, Authentication authentication) {

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if(product.getStock() < request.getQuantity()){
            throw new RuntimeException("Insufficient stock");
        }
        cartService.addToCart(request, authentication.getName());
        return "Added to cart";
    }

    @GetMapping
    public CartResponse getMyCart(Authentication authentication) {
        return cartService.getMyCart(authentication.getName());
    }

    @PutMapping("/{itemId}")
    public String updateQuantity(@PathVariable Long itemId, @RequestParam int quantity, Authentication authentication) {
        cartService.updateQuantity(itemId, quantity, authentication.getName());
        return "Quantity updated";
    }

    @DeleteMapping("/{itemId}")
    public String removeItem(@PathVariable Long itemId, Authentication authentication) {
        cartService.removeItem(itemId, authentication.getName());
        return "Item removed";
    }
}
