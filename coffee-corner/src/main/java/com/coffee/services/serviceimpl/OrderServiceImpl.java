package com.coffee.services.serviceimpl;

import com.coffee.model.*;
import com.coffee.repository.*;
import com.coffee.services.service.OrderService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ProductRepository productRepository;


    @Override
    @Transactional
    public Order placeOrder(Long customerId) {
        Customers customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        Cart cart = cartRepository.findById(customerId).orElseThrow(()-> new RuntimeException("customer not found"));

        List<CartItem> cartItems = cart.getItems();
        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        Order order = new Order();
        order.setCustomers(customer);
        order.setOrderDate(LocalDateTime.now());

        List<OrderItem> orderItems = new ArrayList<>();
        double total = 0;

        for (CartItem cartItem : cartItems) {
            Product product = cartItem.getProduct();

            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(product);
            orderItem.setQuantity(cartItem.getQuantity());
            double price = product.getDiscountPrice() * cartItem.getQuantity();
            orderItem.setPrice(price);
            orderItem.setOrder(order);

            total += price;
            orderItems.add(orderItem);
        }

        order.setItems(orderItems);
        order.setTotalPrice(total);

        cart.getItems().clear();
        Order savedOrder = orderRepository.save(order);

//        for (CartItem item : cartItems) {
//            cartItemRepository.deleteById(item.getId());
//        }

        return savedOrder;

    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    @Override
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }

    @Override
    public Order updateOrder(Long id, Order updatedOrder) {
        Order existingOrder = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));

        existingOrder.setOrderDate(updatedOrder.getOrderDate());
        existingOrder.setTotalPrice(updatedOrder.getTotalPrice());
        existingOrder.setCustomers(updatedOrder.getCustomers());
        existingOrder.setItems(updatedOrder.getItems());

        return orderRepository.save(existingOrder);
    }

    @Override
    public List<Order> getOrdersByEmail(String email) {
        Customers customer = customerRepository.findByEmail(email);

        return orderRepository.findByCustomers(customer);
    }

}
