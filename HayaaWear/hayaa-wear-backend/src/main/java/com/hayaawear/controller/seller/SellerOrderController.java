package com.hayaawear.controller.seller;

import com.hayaawear.dto.order.OrderResponse;
import com.hayaawear.service.order.OrderService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/seller/orders")
@PreAuthorize("hasRole('SELLER')")
public class SellerOrderController {

    private final OrderService orderService;

    public SellerOrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public List<OrderResponse> getSellerOrders(Authentication authentication) {
        return orderService.getOrdersForSeller(authentication.getName());
    }
}
