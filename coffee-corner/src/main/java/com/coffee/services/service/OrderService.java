package com.coffee.services.service;

import com.coffee.model.Customers;
import com.coffee.model.Order;

import java.util.List;
import java.util.Optional;

public interface OrderService {
    Order placeOrder(Long id);
    List<Order> getAllOrders();
    Optional<Order> getOrderById(Long id);
    void deleteOrder(Long id);
    Order updateOrder(Long id, Order updatedOrder);

    List<Order> getOrdersByEmail(String email);
}
