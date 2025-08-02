package com.coffee.repository;

import com.coffee.model.Customers;
import com.coffee.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByCustomers(Customers customers);

}
