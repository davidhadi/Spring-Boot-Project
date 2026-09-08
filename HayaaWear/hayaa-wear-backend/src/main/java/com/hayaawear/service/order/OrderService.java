package com.hayaawear.service.order;

import com.hayaawear.dto.order.OrderResponse;
import com.hayaawear.dto.order.PlaceOrderResponse;
import com.hayaawear.entity.OrderStatus;

import java.util.List;

public interface OrderService {

    PlaceOrderResponse placeOrder(String userEmail);

    List<OrderResponse> getMyOrders(String userEmail);


    void updateOrderStatus(Long orderId, OrderStatus status);

    List<OrderResponse> getOrdersByStatus(OrderStatus status);

    List<OrderResponse> getAllOrders();

    public List<OrderResponse> getOrdersForSeller(String sellerEmail);

}
