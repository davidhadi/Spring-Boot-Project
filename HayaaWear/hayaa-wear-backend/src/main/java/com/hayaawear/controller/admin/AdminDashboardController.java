package com.hayaawear.controller.admin;

import com.hayaawear.entity.Role;
import com.hayaawear.repository.OrderRepository;
import com.hayaawear.repository.ProductRepository;
import com.hayaawear.repository.UserRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/admin/dashboard")
@PreAuthorize("hasRole('ADMIN')")
public class AdminDashboardController {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    public AdminDashboardController(UserRepository userRepository,
                                    ProductRepository productRepository,
                                    OrderRepository orderRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
    }

    @GetMapping("/stats")
    public Map<String, Object> getDashboardStats() {

        long totalUsers = userRepository.count();
        long totalProducts = productRepository.count();
        long totalOrders = orderRepository.count();

        long totalSellers = userRepository.countByRole(Role.SELLER);

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", totalUsers);
        stats.put("totalSellers", totalSellers);
        stats.put("totalProducts", totalProducts);
        stats.put("totalOrders", totalOrders);

        return stats;
    }
}

