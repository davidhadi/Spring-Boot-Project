package com.hayaawear.entity;

import jakarta.persistence.*;

@Table(
        name = "cart_items",
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {"cart_id", "product_id", "variant_id"}
                )
        }
)
@Entity
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cart_id", nullable = false)
    private Cart cart;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne
    @JoinColumn(name = "variant_id", nullable = false)
    private ProductVariant variant;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private Double priceAtTime;

    public CartItem() {
    }

    public CartItem(
            Product product,
            ProductVariant variant,
            int quantity,
            double priceAtTime) {

        this.product = product;
        this.variant = variant;
        this.quantity = quantity;
        this.priceAtTime = priceAtTime;
    }

    public CartItem(
            Cart cart,
            Product product,
            ProductVariant variant,
            int quantity,
            double priceAtTime) {

        this.cart = cart;
        this.product = product;
        this.variant = variant;
        this.quantity = quantity;
        this.priceAtTime = priceAtTime;
    }

    public Long getId() {
        return id;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public ProductVariant getVariant() {
        return variant;
    }

    public void setVariant(ProductVariant variant) {
        this.variant = variant;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Double getPriceAtTime() {
        return priceAtTime;
    }

    public void setPriceAtTime(Double priceAtTime) {
        this.priceAtTime = priceAtTime;
    }
}