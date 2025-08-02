package com.coffee.services.serviceimpl;

import com.coffee.model.OrderItem;
import com.coffee.repository.OrderItemRepository;
import com.coffee.services.service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderItemServiceImpl implements OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Override
    public OrderItem getOrderItemById(Long id) {
        return orderItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order item not found with id: " + id));
    }

    @Override
    public List<OrderItem> getAllOrderItems() {
        return orderItemRepository.findAll();
    }

    @Override
    public OrderItem updateOrderItemQuantity(Long id, int quantity) {
        OrderItem item = getOrderItemById(id);
        item.setQuantity(quantity);
        item.setPrice(item.getProduct().getDiscountPrice() * quantity);
        return orderItemRepository.save(item);
    }

    @Override
    public void deleteOrderItem(Long id) {
        orderItemRepository.deleteById(id);
    }
}

