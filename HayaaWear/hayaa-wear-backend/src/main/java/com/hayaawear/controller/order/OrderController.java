package com.hayaawear.controller.order;

import com.hayaawear.dto.order.OrderResponse;
import com.hayaawear.dto.order.PlaceOrderResponse;
import com.hayaawear.service.order.OrderService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@PreAuthorize("hasRole('CUSTOMER')")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public PlaceOrderResponse placeOrder(Authentication authentication) {
        return orderService.placeOrder(authentication.getName());
    }

    @GetMapping
    public List<OrderResponse> myOrders(Authentication authentication) {
        return orderService.getMyOrders(authentication.getName());
    }
}
