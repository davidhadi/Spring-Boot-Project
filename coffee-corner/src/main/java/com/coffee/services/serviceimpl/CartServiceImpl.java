package com.coffee.services.serviceimpl;

import com.coffee.model.*;
import com.coffee.repository.CartItemRepository;
import com.coffee.repository.CartRepository;
import com.coffee.repository.CustomerRepository;
import com.coffee.repository.ProductRepository;
import com.coffee.services.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CustomerRepository customerRepository; // Add this if not present

    @Override
    public Cart createCart(Customers customer) {
        Customers dbCustomer = customerRepository.findById(customer.getId())
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + customer.getId()));

        // Check if a cart already exists for this customer
        Optional<Cart> existingCart = cartRepository.findByCustomers(dbCustomer);
        if (existingCart.isPresent()) {
            return existingCart.get();  // ✅ Return existing cart instead of creating a new one
        }

        // Create new cart only if none exists
        Cart cart = new Cart();
        cart.setCustomers(dbCustomer);
        return cartRepository.save(cart);
    }


    @Override
    public Optional<Cart> getCartByCustomer(Customers customer) {
        return cartRepository.findByCustomers(customer);
    }

    @Override
    public Cart addItemToCart(Long cartId, Long productId, int quantity) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found with id: " + cartId));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));

        CartItem item = new CartItem();
        item.setCart(cart);
        item.setProduct(product);
        item.setQuantity(quantity);

        cart.getItems().add(item);
        cartItemRepository.save(item);
        return cartRepository.save(cart);
    }

    @Override
    public void removeItemFromCart(Long cartId, Long productId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found with id: " + cartId));

        cart.getItems().removeIf(item -> item.getProduct().getId().equals(productId));
        cartRepository.save(cart);
    }

    @Override
    public void clearCart(Long cartId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found with id: " + cartId));

        cart.getItems().clear();
        cartRepository.save(cart);
    }
}
