package com.hayaawear.service.product;

import com.hayaawear.dto.product.ProductListResponse;
import com.hayaawear.dto.product.ProductRequest;
import com.hayaawear.dto.product.ProductResponse;
import com.hayaawear.entity.FitType;
import com.hayaawear.entity.OccasionType;
import com.hayaawear.entity.Product;
import com.hayaawear.entity.SleeveType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {

    ProductResponse addProduct(ProductRequest request, String sellerEmail);

    List<ProductListResponse> getAllProducts();

    List<ProductResponse> getProductsByOccasion(OccasionType occasion);

    List<ProductResponse> getProductsByCategory(Long categoryId);

    List<ProductResponse> filterProducts(SleeveType sleeveType, FitType fitType, Boolean hijabCompatible, OccasionType occasion
    );

    public Page<ProductListResponse> getSellerProducts(
            String sellerEmail,
            Pageable pageable
    );

    public void rejectProduct(Long productId);

    public void approveProduct(Long productId);

    ProductResponse getProductById(Long productId);

    Page<ProductResponse> getActiveProducts(Pageable pageable);

    void enableProduct(Long productId);
    void disableProduct(Long productId);

    Page<ProductListResponse> getAllProducts(int page, int size);

    public Page<ProductListResponse> filterProducts(
            SleeveType sleeveType,
            FitType fitType,
            Boolean hijabCompatible,
            OccasionType occasion,
            Double minPrice,
            Double maxPrice,
            Pageable pageable
    );


    ProductResponse updateProduct(Long productId, ProductRequest request, String sellerEmail);

    void deleteProduct(Long productId, String sellerEmail);
}

