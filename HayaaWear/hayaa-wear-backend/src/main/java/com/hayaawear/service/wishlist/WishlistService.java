package com.hayaawear.service.wishlist;

import com.hayaawear.entity.Wishlist;

import java.util.List;

public interface WishlistService {

    Wishlist addToWishlist(Long productId, String userEmail);

    void removeFromWishlist(Long productId, String userEmail);

    List<Wishlist> getMyWishlist(String userEmail);

    boolean isWishlisted(Long productId, String userEmail);
}
