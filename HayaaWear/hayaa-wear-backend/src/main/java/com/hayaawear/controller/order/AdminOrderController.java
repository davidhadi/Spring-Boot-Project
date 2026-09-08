package com.hayaawear.controller.order;

import com.hayaawear.dto.order.OrderResponse;
import com.hayaawear.entity.OrderStatus;
import com.hayaawear.service.order.OrderService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/orders")
@PreAuthorize("hasRole('ADMIN')")
public class AdminOrderController {

    private final OrderService orderService;

    public AdminOrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // 🔄 Update order status
    @PutMapping("/{orderId}/status")
    public String updateOrderStatus(
            @PathVariable Long orderId,
            @RequestParam OrderStatus status
    ) {
        orderService.updateOrderStatus(orderId, status);
        return "Order status updated to " + status;
    }

    // 📦 Orders by status
    @GetMapping
    public List<OrderResponse> getOrdersByStatus(
            @RequestParam OrderStatus status
    ) {
        return orderService.getOrdersByStatus(status);
    }

    @GetMapping("/all")
    public List<OrderResponse> allOrders() {
        return orderService.getAllOrders();
    }
}
