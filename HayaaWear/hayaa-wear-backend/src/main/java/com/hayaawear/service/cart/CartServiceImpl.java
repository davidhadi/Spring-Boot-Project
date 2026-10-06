package com.hayaawear.service.cart;

import com.hayaawear.dto.cart.*;
import com.hayaawear.dto.product.ProductVariantOptionResponse;
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
    private final ProductVariantRepository productVariantRepository;
    private final UserRepository userRepository;

    public CartServiceImpl(
            CartRepository cartRepository,
            CartItemRepository cartItemRepository,
            ProductRepository productRepository,
            ProductVariantRepository productVariantRepository,
            UserRepository userRepository
    ) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.productVariantRepository = productVariantRepository;
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

        // ================= FIND VARIANT =================

        ProductVariant variant = productVariantRepository
                .findById(request.getVariantId())
                .orElseThrow(() -> new RuntimeException("Product variant not found"));

        // ================= VERIFY VARIANT BELONGS TO PRODUCT =================

        if (!variant.getProduct().getId().equals(product.getId())) {
            throw new RuntimeException(
                    "Selected variant does not belong to this product"
            );
        }

        // ================= STOCK CHECK =================

        if (variant.getStock() < request.getQuantity()) {
            throw new RuntimeException("Insufficient variant stock");
        }

        // ================= PRODUCT STATUS =================

        if (product.getStatus() == ProductStatus.PENDING) {
            throw new RuntimeException("Product is not available");
        }

        // ================= GET / CREATE CART =================

        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() -> cartRepository.save(new Cart(user)));

        // ================= FIND EXISTING VARIANT ITEM =================

        Optional<CartItem> existingItem =
                cartItemRepository.findByCartAndProductAndVariant(
                        cart,
                        product,
                        variant
                );

        if (existingItem.isPresent()) {

            CartItem item = existingItem.get();

            int newQuantity =
                    item.getQuantity() + request.getQuantity();

            if (newQuantity > variant.getStock()) {
                throw new RuntimeException(
                        "Requested quantity exceeds available stock"
                );
            }

            item.setQuantity(newQuantity);

            cartItemRepository.save(item);

        } else {

            // Use variant price
            double price = variant.getDiscountPrice() != null
                    ? variant.getDiscountPrice()
                    : variant.getPrice();

            CartItem newItem = new CartItem(
                    product,
                    variant,
                    request.getQuantity(),
                    price
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
                .orElse(new Cart(user));

        List<CartItemResponse> items = cart.getItems()
                .stream()
                .map(item -> {

                    CartItemResponse res = new CartItemResponse();

                    res.setItemId(item.getId());

                    res.setProductId(
                            item.getProduct().getId()
                    );

                    res.setProductName(
                            item.getProduct().getName()
                    );

                    res.setVariantId(item.getVariant().getId());

                    res.setVariantOptions(
                            item.getVariant()
                                    .getOptions()
                                    .stream()
                                    .map(option ->
                                            new ProductVariantOptionResponse(
                                                    option.getOptionName(),
                                                    option.getOptionValue()
                                            )
                                    )
                                    .collect(Collectors.toList())
                    );
                    // Variant price
                    double price = item.getPriceAtTime();

                    res.setPrice(price);

                    res.setQuantity(
                            item.getQuantity()
                    );

                    return res;
                })
                .collect(Collectors.toList());

        double total = items.stream()
                .mapToDouble(i ->
                        i.getPrice() * i.getQuantity()
                )
                .sum();

        CartResponse response = new CartResponse();

        response.setItems(items);
        response.setTotalAmount(total);

        return response;
    }

    // ================= UPDATE QUANTITY =================

    @Override
    public void updateQuantity(
            Long itemId,
            int quantity,
            String userEmail) {

        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Cart item not found"
                        )
                );

        if (!item.getCart()
                .getUser()
                .getEmail()
                .equals(userEmail)) {

            throw new RuntimeException("Not allowed");
        }

        if (quantity <= 0) {
            throw new RuntimeException(
                    "Quantity must be greater than zero"
            );
        }

        // Variant stock validation
        if (quantity > item.getVariant().getStock()) {
            throw new RuntimeException(
                    "Requested quantity exceeds available stock"
            );
        }

        item.setQuantity(quantity);

        cartItemRepository.save(item);
    }

    // ================= REMOVE ITEM =================

    @Override
    public void removeItem(
            Long itemId,
            String userEmail) {

        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Cart item not found"
                        )
                );

        if (!item.getCart()
                .getUser()
                .getEmail()
                .equals(userEmail)) {

            throw new RuntimeException("Not allowed");
        }

        cartItemRepository.delete(item);
    }
}