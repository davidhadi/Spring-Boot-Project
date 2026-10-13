package com.hayaawear.service.payment;

import com.hayaawear.dto.payment.PaymentResponse;
import com.hayaawear.entity.*;
import com.hayaawear.repository.OrderRepository;
import com.hayaawear.repository.PaymentRepository;
import com.hayaawear.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    public PaymentServiceImpl(PaymentRepository paymentRepository,
                              OrderRepository orderRepository,
                              UserRepository userRepository
    ) {
        this.paymentRepository = paymentRepository;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void createCodPayment(Order order) {

        Payment payment = new Payment(
                order,
                PaymentMethod.COD,
                PaymentStatus.PENDING,
                order.getTotalAmount()
        );

        paymentRepository.save(payment);
    }

    @Override
    public PaymentResponse getPaymentByOrderId(
            Long orderId,
            String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() ->
                        new RuntimeException("User not found!"));

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException("Order not found!"));

        if (!order.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Not allowed");
        }

        Payment payment = paymentRepository.findByOrder(order)
                .orElseThrow(() ->
                        new RuntimeException("Payment not found"));

        PaymentResponse response = new PaymentResponse();

        response.setPaymentId(payment.getId());
        response.setOrderId(order.getId());
        response.setAmount(payment.getAmount());
        response.setPaymentMethod(payment.getPaymentMethod());
        response.setPaymentStatus(payment.getPaymentStatus());

        return response;
    }
}