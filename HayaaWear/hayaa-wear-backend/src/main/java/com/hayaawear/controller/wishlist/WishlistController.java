package com.hayaawear.controller.wishlist;


import com.hayaawear.entity.Wishlist;
import com.hayaawear.service.wishlist.WishlistService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/wishlist")
public class WishlistController {

    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @PostMapping("/{productId}")
    public ResponseEntity<Wishlist> addToWishlist(
            @PathVariable Long productId,
            Authentication authentication
    ) {

        String userEmail = authentication.getName();

        Wishlist wishlist =
                wishlistService.addToWishlist(
                        productId,
                        userEmail
                );

        return ResponseEntity.ok(wishlist);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> removeFromWishlist(
            @PathVariable Long productId,
            Authentication authentication
    ) {

        String userEmail = authentication.getName();

        wishlistService.removeFromWishlist(
                productId,
                userEmail
        );

        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Wishlist>> getMyWishlist(
            Authentication authentication
    ) {

        String userEmail = authentication.getName();

        return ResponseEntity.ok(
                wishlistService.getMyWishlist(userEmail)
        );
    }

    @GetMapping("/check/{productId}")
    public ResponseEntity<Boolean> isWishlisted(
            @PathVariable Long productId,
            Authentication authentication
    ) {

        String userEmail = authentication.getName();

        return ResponseEntity.ok(
                wishlistService.isWishlisted(
                        productId,
                        userEmail
                )
        );
    }
}