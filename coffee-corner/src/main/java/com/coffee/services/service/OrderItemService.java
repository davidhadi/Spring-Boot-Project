package com.coffee.services.service;
import com.coffee.model.OrderItem;

import java.util.List;

public interface OrderItemService {
    OrderItem getOrderItemById(Long id);
    List<OrderItem> getAllOrderItems();
    OrderItem updateOrderItemQuantity(Long id, int quantity);
    void deleteOrderItem(Long id);
}
