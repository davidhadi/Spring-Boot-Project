package com.hayaawear.service.cart;

import com.hayaawear.dto.cart.*;
import com.hayaawear.entity.*;
import com.hayaawear.repository.*;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public CartServiceImpl(
            CartRepository cartRepository,
            CartItemRepository cartItemRepository,
            ProductRepository productRepository,
            UserRepository userRepository
    ) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    // ================= ADD TO CART =================

    @Override
    public void addToCart(AddToCartRequest request, String userEmail) {

        if (request.getQuantity() <= 0) {
            throw new RuntimeException("Quantity must be greater than 0");
        }

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

//        if (product.getStatus() == ProductStatus.PENDING) {
//            throw new RuntimeException("Product is not available");
//        }

        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() -> cartRepository.save(new Cart(user)));

        Optional<CartItem> existingItem =
                cartItemRepository.findByCartAndProduct(cart, product);

        if (existingItem.isPresent()) {

            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + request.getQuantity());
            cartItemRepository.save(item);

        } else {

            CartItem newItem = new CartItem(
                    product,
                    request.getQuantity(),
                    product.getPrice()
            );

            cart.addItem(newItem);
            cartRepository.save(cart);
        }
    }

    // ================= GET MY CART =================

    @Override
    public CartResponse getMyCart(String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartRepository.findByUser(user)
                .orElse(new Cart(user)); // return empty cart if not exists

        List<CartItemResponse> items = cart.getItems()
                .stream()
                .map(item -> {

                    CartItemResponse res = new CartItemResponse();

                    res.setItemId(item.getId());
                    res.setProductId(item.getProduct().getId());
                    res.setProductName(item.getProduct().getName());

                    double price = item.getProduct().getDiscountPrice() != null
                            ? item.getProduct().getDiscountPrice()
                            : item.getProduct().getPrice();

                    res.setPrice(price);
                    res.setQuantity(item.getQuantity());

                    return res;
                })
                .collect(Collectors.toList());

        double total = items.stream()
                .mapToDouble(i -> i.getPrice() * i.getQuantity())
                .sum();

        CartResponse response = new CartResponse();
        response.setItems(items);
        response.setTotalAmount(total);

        return response;
    }

    // ================= UPDATE QUANTITY =================

    @Override
    public void updateQuantity(Long itemId, int quantity, String userEmail) {

        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        if (!item.getCart().getUser().getEmail().equals(userEmail)) {
            throw new RuntimeException("Not allowed");
        }

        if (quantity <= 0) {
            cartItemRepository.delete(item);
            return;
        }

        item.setQuantity(quantity);
        cartItemRepository.save(item);
    }

    // ================= REMOVE ITEM =================

    @Override
    public void removeItem(Long itemId, String userEmail) {

        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        if (!item.getCart().getUser().getEmail().equals(userEmail)) {
            throw new RuntimeException("Not allowed");
        }

        cartItemRepository.delete(item);
    }
}
