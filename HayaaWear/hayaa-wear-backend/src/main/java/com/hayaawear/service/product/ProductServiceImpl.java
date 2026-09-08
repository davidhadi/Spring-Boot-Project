package com.hayaawear.service.product;

import com.hayaawear.dto.product.ProductImageResponse;
import com.hayaawear.dto.product.ProductListResponse;
import com.hayaawear.dto.product.ProductRequest;
import com.hayaawear.dto.product.ProductResponse;
import com.hayaawear.entity.*;
import com.hayaawear.productspecification.ProductSpecification;
import com.hayaawear.repository.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final SubCategoryRepository subCategoryRepository;
    private final UserRepository userRepository;

    private final ProductImageRepository productImageRepository;

    public ProductServiceImpl(ProductRepository productRepository,
                              CategoryRepository categoryRepository,
                              SubCategoryRepository subCategoryRepository,
                              UserRepository userRepository,
                              ProductImageRepository productImageRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.subCategoryRepository = subCategoryRepository;
        this.userRepository = userRepository;
        this.productImageRepository = productImageRepository;
    }

    // ================= ADD PRODUCT (SELLER) =================
    @Override
    public ProductResponse addProduct(ProductRequest request, String sellerEmail) {

        User seller = userRepository.findByEmail(sellerEmail)
                .orElseThrow(() -> new RuntimeException("Seller not found"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        SubCategory subCategory = subCategoryRepository.findById(request.getSubCategoryId())
                .orElseThrow(() -> new RuntimeException("SubCategory not found"));

        Product product = new Product();

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setDiscountPrice(request.getDiscountPrice());
        product.setStock(request.getStock());

        product.setSleeveType(request.getSleeveType());
        product.setDressLength(request.getDressLength());
        product.setFitType(request.getFitType());
        product.setHijabCompatible(request.isHijabCompatible());
        product.setTransparent(request.isTransparent());

        // First image = primary image
        if (request.getImages() != null && !request.getImages().isEmpty()) {
            product.setPrimaryImageUrl(request.getImages().get(0));
        }

        product.setCategory(category);
        product.setSubCategory(subCategory);
        product.setOccasions(request.getOccasions());
        product.setSeller(seller);

        product.setStatus(ProductStatus.PENDING);

        Product savedProduct = productRepository.save(product);

        return mapToResponse(savedProduct);
    }

    // ================= GET ALL PRODUCTS (ADMIN) =================
    @Override
    public List<ProductListResponse> getAllProducts() {

        List<Product> products = productRepository.findAll();

        return products.stream()
                .map(product -> {

                    ProductListResponse response = new ProductListResponse();

                    response.setId(product.getId());
                    response.setName(product.getName());
                    response.setPrice(product.getPrice());
                    response.setDiscountPrice(product.getDiscountPrice());

                    // 🔥 Only primary image
                    String primaryImage = product.getImages()
                            .stream()
                            .filter(ProductImage::isPrimaryImage)
                            .map(ProductImage::getImageUrl)
                            .findFirst()
                            .orElse(null);

                    response.setPrimaryImage(primaryImage);

                    return response;
                })
                .toList();
    }


    // ================= FILTER BY OCCASION (CUSTOMER) =================
    @Override
    public List<ProductResponse> getProductsByOccasion(OccasionType occasion) {
        return productRepository.findByOccasionsContaining(occasion)
                .stream()
                .filter(product -> product.getStatus() == ProductStatus.ACTIVE)
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ================= FILTER BY CATEGORY (CUSTOMER) =================
    @Override
    public List<ProductResponse> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId)
                .stream()
                .filter(product -> product.getStatus() == ProductStatus.ACTIVE)
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ================= ADVANCED FILTER (CUSTOMER) =================
    @Override
    public List<ProductResponse> filterProducts(
            SleeveType sleeveType,
            FitType fitType,
            Boolean hijabCompatible,
            OccasionType occasion) {

        return productRepository
                .filterProducts(sleeveType, fitType, hijabCompatible, occasion)
                .stream()
                .filter(product -> product.getStatus() == ProductStatus.ACTIVE)
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private ProductResponse mapToResponse(Product product) {

        ProductResponse response = new ProductResponse();
        response.setId(product.getId());
        response.setName(product.getName());
        response.setPrice(product.getPrice());
        response.setDiscountPrice(product.getDiscountPrice());

        response.setSleeveType(product.getSleeveType());
        response.setDressLength(product.getDressLength());
        response.setFitType(product.getFitType());
        response.setHijabCompatible(product.isHijabCompatible());
        response.setOccasions(product.getOccasions());

        // 🔥 MAP IMAGES
        if (product.getImages() != null) {
            response.setImages(
                    product.getImages()
                            .stream()
                            .map(image -> {
                                ProductImageResponse img = new ProductImageResponse();
                                img.setId(image.getId());
                                img.setImageUrl(image.getImageUrl());
                                img.setPrimary(image.isPrimaryImage());
                                return img;
                            })
                            .toList()
            );
        }

        return response;
    }

    @Override
    public void enableProduct(Long productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setStatus(ProductStatus.ACTIVE);
        productRepository.save(product);
    }

    @Override
    public void disableProduct(Long productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setStatus(ProductStatus.REJECTED);
        productRepository.save(product);
    }

    @Override
    public ProductResponse getProductById(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        ProductResponse response = new ProductResponse();

        // Basic fields
        response.setId(product.getId());
        response.setName(product.getName());
        response.setPrice(product.getPrice());
        response.setDiscountPrice(product.getDiscountPrice());
        response.setSleeveType(product.getSleeveType());
        response.setDressLength(product.getDressLength());
        response.setFitType(product.getFitType());
        response.setHijabCompatible(product.isHijabCompatible());
        response.setOccasions(product.getOccasions());

        // 🔥 Map & sort images (Primary first)
        List<ProductImageResponse> imageResponses =
                product.getImages()
                        .stream()
                        .sorted((a, b) ->
                                Boolean.compare(b.isPrimaryImage(), a.isPrimaryImage()))
                        .map(img -> {
                            ProductImageResponse res = new ProductImageResponse();
                            res.setId(img.getId());
                            res.setImageUrl(img.getImageUrl());
                            res.setPrimary(img.isPrimaryImage());
                            return res;
                        })
                        .toList();

        response.setImages(imageResponses);

        return response;
    }

    @Override
    public Page<ProductResponse> getActiveProducts(Pageable pageable) {

        return productRepository
                .findByStatus(ProductStatus.ACTIVE, pageable)
                .map(this::mapToResponse);
    }


    @Override
    public Page<ProductListResponse> getAllProducts(int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        Page<Product> productPage = productRepository.findAll(pageable);

        return productPage.map(product -> {

            ProductListResponse response = new ProductListResponse();

            response.setId(product.getId());
            response.setName(product.getName());
            response.setPrice(product.getPrice());
            response.setDiscountPrice(product.getDiscountPrice());

            // 🔥 Direct from Product table (No N+1)
            response.setPrimaryImage(product.getPrimaryImageUrl());

            return response;
        });
    }


    @Override
    public Page<ProductListResponse> filterProducts(
            SleeveType sleeveType,
            FitType fitType,
            Boolean hijabCompatible,
            OccasionType occasion,
            Double minPrice,
            Double maxPrice,
            Pageable pageable
    ) {

        Specification<Product> spec =
                ProductSpecification.filterProducts(
                        sleeveType,
                        fitType,
                        hijabCompatible,
                        occasion,
                        minPrice,
                        maxPrice
                );

        Specification<Product> finalSpec =
                spec.and((root, query, cb) ->
                        cb.equal(root.get("status"), ProductStatus.ACTIVE)
                );

        return productRepository.findAll(finalSpec, pageable)
                .map(product -> {

                    ProductListResponse response =
                            new ProductListResponse();

                    response.setId(product.getId());
                    response.setName(product.getName());
                    response.setPrice(product.getPrice());
                    response.setDiscountPrice(product.getDiscountPrice());
                    response.setPrimaryImage(product.getPrimaryImageUrl());

                    return response;
                });
    }

    @Override
    public Page<ProductListResponse> getSellerProducts(
            String sellerEmail,
            Pageable pageable
    ) {

        return productRepository
                .findBySellerEmail(sellerEmail, pageable)
                .map(product -> {

                    ProductListResponse response =
                            new ProductListResponse();

                    response.setId(product.getId());
                    response.setName(product.getName());
                    response.setPrice(product.getPrice());
                    response.setDiscountPrice(product.getDiscountPrice());
                    response.setPrimaryImage(product.getPrimaryImageUrl());

                    // 🔥 IMPORTANT
                    response.setStatus(product.getStatus());

                    return response;
                });
    }

    @Override
    public void approveProduct(Long productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setStatus(ProductStatus.ACTIVE);
        productRepository.save(product);
    }

    @Override
    public void rejectProduct(Long productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setStatus(ProductStatus.REJECTED);
        productRepository.save(product);
    }



}
