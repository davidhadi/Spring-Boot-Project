package com.coffee.services.service;
import com.coffee.model.Order;
import com.coffee.model.Customers;

public interface CheckoutService {
    Order checkoutCart(Customers customer);
}
