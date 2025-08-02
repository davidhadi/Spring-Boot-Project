//package com.coffee.controller;
//
//import com.coffee.model.Customers;
//import com.coffee.model.Order;
//import com.coffee.services.service.CheckoutService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.*;
//
//import java.security.Principal;
//
//@RestController
//@RequestMapping("/api/checkout")
//public class CheckoutController {
//
//    @Autowired
//    private CheckoutService checkoutService;
//
//    private Customers getAuthenticatedCustomer(Principal principal) {
//        Customers customer = new Customers();
//        customer.setEmail(principal.getName());
//        return customer;
//    }
//
//    @PostMapping
//    @PreAuthorize("hasRole('USER')")
//    public ResponseEntity<Order> checkout(Principal principal) {
//        Customers customer = getAuthenticatedCustomer(principal);
//        Order order = checkoutService.checkoutCart(customer);
//        return ResponseEntity.ok(order);
//    }
//}
