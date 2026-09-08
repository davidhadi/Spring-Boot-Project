package com.hayaawear.repository;

import com.hayaawear.entity.Order;
import com.hayaawear.entity.OrderStatus;
import com.hayaawear.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
    List<Order> findByStatus(OrderStatus status);

    List<Order> findAllByOrderByCreatedAtDesc();

    @Query("""
       SELECT DISTINCT o
       FROM Order o
       JOIN o.items i
       WHERE i.product.seller.email = :email
       """)
    List<Order> findOrdersBySellerEmail(@Param("email") String email);

}
