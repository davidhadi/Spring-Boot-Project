package com.coffee.controller;

import com.coffee.model.Customers;
import com.coffee.model.Order;
import com.coffee.payload.response.OrderItemResponse;
import com.coffee.payload.response.OrderResponse;
import com.coffee.repository.CustomerRepository;
import com.coffee.repository.OrderRepository;
import com.coffee.security.JwtUtils;
import com.coffee.services.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private OrderRepository orderRepository;

    // Only authenticated customers can place orders
    @PostMapping("/place")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Order> placeOrder(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7); // remove "Bearer "
        String email = jwtUtils.extractUsername(token); // get email from token
        Customers customer = customerRepository.findByEmail(email);

        Order placedOrder = orderService.placeOrder(customer.getId());
        return ResponseEntity.ok(placedOrder);
    }

    // Admin can view all orders
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    // Admin can get order by ID
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Admin can update an order
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Order> updateOrder(@PathVariable Long id, @RequestBody Order order) {
        Order updated = orderService.updateOrder(id, order);
        return ResponseEntity.ok(updated);
    }

    // Admin can delete an order
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/my-orders")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<Order>> getMyOrders(@RequestHeader("Authorization") String authHeader) {
        String email = jwtUtils.extractUsername(authHeader.substring(7));
        Customers customer = customerRepository.findByEmail(email);
        return ResponseEntity.ok(orderRepository.findByCustomers(customer));
    }

    // Get orders for the currently logged-in user
    @GetMapping("/user")
    @PreAuthorize("hasRole('USER')")
    public List<OrderResponse> getUserOrders(Authentication auth) {
        Customers customer = customerRepository.findByEmail(auth.getName());
        List<Order> orders = orderRepository.findByCustomers(customer);

        return orders.stream().map(order -> {
            List<OrderItemResponse> itemResponses = order.getItems().stream().map(item ->
                    new OrderItemResponse(
                            item.getId(),
                            item.getQuantity(),
                            item.getPrice(),
                            item.getProduct().getName()
                    )
            ).toList();

            return new OrderResponse(
                    order.getId(),
                    order.getTotalPrice(),
                    "pending..",
                    order.getOrderDate(),
                    itemResponses
            );
        }).toList();
    }


}

