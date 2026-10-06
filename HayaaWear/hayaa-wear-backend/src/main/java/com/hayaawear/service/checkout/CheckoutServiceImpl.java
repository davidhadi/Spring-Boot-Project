package com.hayaawear.service.checkout;

import com.hayaawear.dto.checkout.CheckoutRequest;
import com.hayaawear.dto.checkout.CheckoutResponse;
import com.hayaawear.dto.order.PlaceOrderResponse;
import com.hayaawear.entity.Address;
import com.hayaawear.entity.User;
import com.hayaawear.repository.AddressRepository;
import com.hayaawear.repository.UserRepository;
import com.hayaawear.service.order.OrderService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    private final OrderService orderService;

    public CheckoutServiceImpl(
            AddressRepository addressRepository,
            UserRepository userRepository,
            OrderService orderService) {

        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
        this.orderService = orderService;
    }

    @Override
    @Transactional
    public CheckoutResponse checkout(
            CheckoutRequest request,
            String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Address address = addressRepository.findByUser(user)
                .stream()
                .filter(a ->
                        a.getId().equals(request.getShippingAddressId()))
                .findFirst()
                .orElseThrow(() ->
                        new RuntimeException(
                                "Shipping address not found"));

        PlaceOrderResponse orderResponse =
                orderService.placeOrder(userEmail, address);

        CheckoutResponse response = new CheckoutResponse();

        response.setOrderId(orderResponse.getOrderId());
        response.setTotalAmount(orderResponse.getTotalAmount());
        response.setMessage("Checkout completed successfully");

        return response;
    }
}