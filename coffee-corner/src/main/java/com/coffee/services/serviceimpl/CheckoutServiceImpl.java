package com.coffee.services.serviceimpl;


import com.coffee.model.*;
import com.coffee.repository.*;
import com.coffee.services.service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Order checkoutCart(Customers customer) {
        Cart cart = cartRepository.findByCustomers(customer)
                .orElseThrow(() -> new RuntimeException("Cart not found for customer"));

        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty. Cannot checkout.");
        }

        Order order = new Order();
        order.setOrderDate(LocalDateTime.now());
        order.setCustomers(customer);

        List<OrderItem> orderItems = new ArrayList<>();
        double total = 0;

        for (CartItem cartItem : cart.getItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItems.add(orderItem);

            total += cartItem.getProduct().getDiscountPrice() * cartItem.getQuantity();
        }

        order.setItems(orderItems);
        order.setTotalPrice(total);

        cart.getItems().clear();
        cartRepository.save(cart);

        return orderRepository.save(order);
    }
}

