package com.hayaawear.service.order;

import com.hayaawear.dto.order.*;
import com.hayaawear.entity.*;
import com.hayaawear.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    private final CartRepository cartRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public OrderServiceImpl(
            CartRepository cartRepository,
            OrderRepository orderRepository,
            UserRepository userRepository,
            ProductRepository productRepository
    ) {
        this.cartRepository = cartRepository;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    @Transactional
    @Override
    public PlaceOrderResponse placeOrder(String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Cart is empty"));

        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        Order order = new Order(user);
        double total = 0;

        for (CartItem cartItem : cart.getItems()) {

            Product product = cartItem.getProduct();

            if (product.getStock() < cartItem.getQuantity()) {
                throw new RuntimeException(
                        "Insufficient stock for product: " + product.getName()
                );
            }

            product.setStock(product.getStock() - cartItem.getQuantity());

            if (product.getStock() == 0) {
                product.setStatus(ProductStatus.PENDING);
            }

            productRepository.save(product);

            double price = product.getDiscountPrice() != null
                    ? product.getDiscountPrice()
                    : product.getPrice();

            OrderItem orderItem = new OrderItem(
                    product,
                    cartItem.getQuantity(),
                    price
            );

            order.addItem(orderItem);

            total += price * cartItem.getQuantity();
        }

        order.setTotalAmount(total);

        Order savedOrder = orderRepository.save(order);

        cart.getItems().clear();
        cartRepository.save(cart);

        PlaceOrderResponse response = new PlaceOrderResponse();
        response.setOrderId(savedOrder.getId());
        response.setMessage("Order placed successfully (COD)");

        return response;
    }

    @Override
    public List<OrderResponse> getMyOrders(String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return orderRepository.findByUser(user)
                .stream()
                .map(order -> {
                    OrderResponse res = new OrderResponse();
                    res.setOrderId(order.getId());
                    res.setTotalAmount(order.getTotalAmount());
                    res.setStatus(order.getStatus());
                    res.setCreatedAt(order.getCreatedAt());

                    List<OrderItemResponse> items =
                            order.getItems().stream().map(item -> {
                                OrderItemResponse ir = new OrderItemResponse();
                                ir.setProductId(item.getProduct().getId());
                                ir.setProductName(item.getProduct().getName());
                                ir.setQuantity(item.getQuantity());
                                ir.setPrice(item.getPriceAtPurchase());
                                return ir;
                            }).collect(Collectors.toList());

                    res.setItems(items);
                    return res;
                })
                .collect(Collectors.toList());
    }

    @Override
    public void updateOrderStatus(Long orderId, OrderStatus newStatus) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        OrderStatus current = order.getStatus();

        // ❌ Delivered orders are final
        if (current == OrderStatus.DELIVERED) {
            throw new RuntimeException("Delivered order cannot be updated");
        }

        // ❌ Cancel rules
        if (current == OrderStatus.SHIPPED && newStatus == OrderStatus.CANCELLED) {
            throw new RuntimeException("Shipped order cannot be cancelled");
        }

        if (current == OrderStatus.CANCELLED) {
            throw new RuntimeException("Cancelled order cannot be updated");
        }

        // ✅ Valid transitions
        order.setStatus(newStatus);
        orderRepository.save(order);
    }

    @Override
    public List<OrderResponse> getOrdersByStatus(OrderStatus status) {

        return orderRepository.findByStatus(status)
                .stream()
                .map(order -> {
                    OrderResponse res = new OrderResponse();
                    res.setOrderId(order.getId());
                    res.setTotalAmount(order.getTotalAmount());
                    res.setStatus(order.getStatus());
                    res.setCreatedAt(order.getCreatedAt());
                    return res;
                })
                .toList();
    }

    @Override
    public List<OrderResponse> getAllOrders() {

        return orderRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(order -> {
                    OrderResponse res = new OrderResponse();
                    res.setOrderId(order.getId());
                    res.setTotalAmount(order.getTotalAmount());
                    res.setStatus(order.getStatus());
                    res.setCreatedAt(order.getCreatedAt());
                    return res;
                }).toList();
    }

    @Override
    public List<OrderResponse> getOrdersForSeller(String sellerEmail) {

        List<Order> orders =
                orderRepository.findOrdersBySellerEmail(sellerEmail);

        return orders.stream()
                .map(order -> mapToSellerOrderResponse(order, sellerEmail))
                .toList();
    }
    private OrderResponse mapToSellerOrderResponse(Order order, String sellerEmail) {

        OrderResponse response = new OrderResponse();

        response.setOrderId(order.getId());
        response.setTotalAmount(order.getTotalAmount());
        response.setStatus(order.getStatus());
        response.setCreatedAt(order.getCreatedAt());

        List<OrderItemResponse> itemResponses =
                order.getItems()   // ✅ YOUR field
                        .stream()
                        .filter(item ->
                                item.getProduct()
                                        .getSeller()
                                        .getEmail()
                                        .equals(sellerEmail)
                        )
                        .map(item -> {

                            OrderItemResponse itemRes =
                                    new OrderItemResponse();

                            itemRes.setProductName(
                                    item.getProduct().getName()
                            );
                            itemRes.setQuantity(item.getQuantity());
                            itemRes.setPrice(item.getPriceAtPurchase());

                            return itemRes;
                        })
                        .toList();

        response.setItems(itemResponses);

        return response;
    }



}
