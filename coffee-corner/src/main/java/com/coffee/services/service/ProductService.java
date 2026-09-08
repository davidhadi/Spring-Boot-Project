package com.coffee.services.service;

import com.coffee.model.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {

    public Product addProduct(Product product);

    public Product updateProduct(Long id, Product product);

    public void deleteProduct(Long id);

    public List<Product> getAllProduct();

    public Optional<Product> getProductById(Long id);

    public Optional<Product> getProductByName(String name);
}
