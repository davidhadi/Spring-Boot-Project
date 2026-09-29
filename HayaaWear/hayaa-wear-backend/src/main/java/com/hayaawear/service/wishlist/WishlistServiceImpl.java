package com.hayaawear.service.wishlist;


import com.hayaawear.entity.Product;
import com.hayaawear.entity.User;
import com.hayaawear.entity.Wishlist;
import com.hayaawear.service.wishlist.WishlistService;
import com.hayaawear.repository.ProductRepository;
import com.hayaawear.repository.UserRepository;
import com.hayaawear.repository.WishlistRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class WishlistServiceImpl implements WishlistService {

    private final WishlistRepository wishlistRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public WishlistServiceImpl(
            WishlistRepository wishlistRepository,
            ProductRepository productRepository,
            UserRepository userRepository
    ) {
        this.wishlistRepository = wishlistRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Wishlist addToWishlist(Long productId, String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new RuntimeException("Product not found")
                );

        Optional<Wishlist> existingWishlist =
                wishlistRepository.findByUserIdAndProductId(
                        user.getId(),
                        productId
                );

        if (existingWishlist.isPresent()) {
            return existingWishlist.get();
        }

        Wishlist wishlist = new Wishlist(user, product);

        return wishlistRepository.save(wishlist);
    }

    @Override
    @Transactional
    public void removeFromWishlist(
            Long productId,
            String userEmail
    ) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );

        boolean exists = wishlistRepository
                .existsByUserIdAndProductId(
                        user.getId(),
                        productId
                );

        if (!exists) {
            throw new RuntimeException(
                    "Product is not in wishlist"
            );
        }

        wishlistRepository.deleteByUserIdAndProductId(
                user.getId(),
                productId
        );
    }

    @Override
    public List<Wishlist> getMyWishlist(String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );

        return wishlistRepository.findByUserId(
                user.getId()
        );
    }

    @Override
    public boolean isWishlisted(
            Long productId,
            String userEmail
    ) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );

        return wishlistRepository
                .existsByUserIdAndProductId(
                        user.getId(),
                        productId
                );
    }
}
