package com.hayaawear.service.product;

import com.hayaawear.dto.product.*;
import com.hayaawear.entity.*;
import com.hayaawear.productspecification.ProductSpecification;
import com.hayaawear.repository.*;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.List;
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

        if (request.getAttributes() != null) {

            List<ProductAttribute> attributes = request.getAttributes()
                    .stream()
                    .map(attributeRequest -> {

                        ProductAttribute attribute = new ProductAttribute();

                        attribute.setAttributeName(
                                attributeRequest.getAttributeName()
                        );

                        attribute.setAttributeValue(
                                attributeRequest.getAttributeValue()
                        );

                        attribute.setProduct(product);

                        return attribute;
                    })
                    .toList();

            product.setAttributes(attributes);
        }


        if (request.getVariants() != null) {

            List<ProductVariant> variants = request.getVariants()
                    .stream()
                    .map(variantRequest -> {

                        Set<String> variantCombinations = new HashSet<>();

                        ProductVariant variant = new ProductVariant();

                        if (variantRequest.getOptions() == null
                                || variantRequest.getOptions().isEmpty()) {
                            throw new RuntimeException(
                                    "Variant must have at least one option"
                            );
                        }

                        String combination = variantRequest.getOptions()
                                .stream()
                                .sorted(
                                        Comparator.comparing(
                                                ProductVariantOptionRequest::getOptionName
                                        )
                                )
                                .map(option ->
                                        option.getOptionName() + "=" + option.getOptionValue()
                                )
                                .collect(Collectors.joining("|"));

                        if (!variantCombinations.add(combination)) {
                            throw new RuntimeException(
                                    "Duplicate variant combination: " + combination
                            );
                        }

                        variant.setProduct(product);

                        if (variantRequest.getPrice() == null || variantRequest.getPrice() < 0) {
                            throw new RuntimeException("Variant price cannot be negative");
                        }

                        if (variantRequest.getDiscountPrice() != null
                                && variantRequest.getDiscountPrice() < 0) {
                            throw new RuntimeException("Variant discount price cannot be negative");
                        }

                        if (variantRequest.getDiscountPrice() != null
                                && variantRequest.getDiscountPrice() > variantRequest.getPrice()) {
                            throw new RuntimeException(
                                    "Variant discount price cannot be greater than price"
                            );
                        }

                        if (variantRequest.getStock() < 0) {
                            throw new RuntimeException("Variant stock cannot be negative");
                        }

                        variant.setPrice(variantRequest.getPrice());
                        variant.setDiscountPrice(variantRequest.getDiscountPrice());
                        variant.setStock(variantRequest.getStock());

                        if (variantRequest.getOptions() != null) {

                            List<ProductVariantOption> options =
                                    variantRequest.getOptions()
                                            .stream()
                                            .map(optionRequest -> {

                                                ProductVariantOption option =
                                                        new ProductVariantOption();

                                                option.setVariant(variant);
                                                option.setOptionName(
                                                        optionRequest.getOptionName()
                                                );
                                                option.setOptionValue(
                                                        optionRequest.getOptionValue()
                                                );

                                                return option;
                                            })
                                            .toList();

                            variant.setOptions(options);
                        }

                        return variant;
                    })
                    .toList();

            product.setVariants(variants);
        }

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

                    response.setCategory(product.getCategory());

                    // 🔥 Only primary image
                    response.setPrimaryImage(product.getPrimaryImageUrl());
                    response.setOccasions(product.getOccasions());

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

        if (product.getAttributes() != null) {
            response.setAttributes(
                    product.getAttributes()
                            .stream()
                            .map(attribute ->
                                    new ProductAttributeResponse(
                                            attribute.getAttributeName(),
                                            attribute.getAttributeValue()
                                    )
                            )
                            .toList()
            );
        }

        if (product.getVariants() != null) {

            response.setVariants(
                    product.getVariants()
                            .stream()
                            .map(variant -> {

                                ProductVariantResponse variantResponse =
                                        new ProductVariantResponse();

                                variantResponse.setId(variant.getId());
                                variantResponse.setPrice(variant.getPrice());
                                variantResponse.setDiscountPrice(
                                        variant.getDiscountPrice()
                                );
                                variantResponse.setStock(variant.getStock());

                                if (variant.getOptions() != null) {

                                    variantResponse.setOptions(
                                            variant.getOptions()
                                                    .stream()
                                                    .map(option ->
                                                            new ProductVariantOptionResponse(
                                                                    option.getOptionName(),
                                                                    option.getOptionValue()
                                                            )
                                                    )
                                                    .toList()
                                    );
                                }

                                return variantResponse;
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
    @Cacheable(value = "products", key = "#id")
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
        response.setOccasions(
                product.getOccasions() == null
                        ? null
                        : new HashSet<>(product.getOccasions())
        );

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

        if (product.getVariants() != null) {

            response.setVariants(
                    product.getVariants()
                            .stream()
                            .map(variant -> {

                                ProductVariantResponse variantResponse =
                                        new ProductVariantResponse();

                                variantResponse.setId(variant.getId());
                                variantResponse.setPrice(variant.getPrice());
                                variantResponse.setDiscountPrice(
                                        variant.getDiscountPrice()
                                );
                                variantResponse.setStock(variant.getStock());

                                if (variant.getOptions() != null) {

                                    variantResponse.setOptions(
                                            variant.getOptions()
                                                    .stream()
                                                    .map(option ->
                                                            new ProductVariantOptionResponse(
                                                                    option.getOptionName(),
                                                                    option.getOptionValue()
                                                            )
                                                    )
                                                    .toList()
                                    );
                                }

                                return variantResponse;
                            })
                            .toList()
            );
        }
        if (product.getAttributes() != null) {
            response.setAttributes(
                    product.getAttributes()
                            .stream()
                            .map(attribute ->
                                    new ProductAttributeResponse(
                                            attribute.getAttributeName(),
                                            attribute.getAttributeValue()
                                    )
                            )
                            .toList()
            );
        }

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

    @Override
    @CachePut(value = "products", key = "#productId")
    public ProductResponse updateProduct(
            Long productId,
            ProductRequest request,
            String sellerEmail) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Ownership check
        if (!product.getSeller().getEmail().equals(sellerEmail)) {
            throw new RuntimeException("You can update only your own product");
        }

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        SubCategory subCategory = subCategoryRepository.findById(request.getSubCategoryId())
                .orElseThrow(() -> new RuntimeException("SubCategory not found"));

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
        product.setOccasions(request.getOccasions());

        // ================= UPDATE ATTRIBUTES =================

        product.getAttributes().clear();

        if (request.getAttributes() != null) {

            List<ProductAttribute> attributes = request.getAttributes()
                    .stream()
                    .map(attributeRequest -> {

                        ProductAttribute attribute = new ProductAttribute();

                        attribute.setAttributeName(
                                attributeRequest.getAttributeName()
                        );

                        attribute.setAttributeValue(
                                attributeRequest.getAttributeValue()
                        );

                        attribute.setProduct(product);

                        return attribute;
                    })
                    .toList();

            product.getAttributes().addAll(attributes);
        }

        // ================= UPDATE VARIANTS =================

        product.getVariants().clear();

        if (request.getVariants() != null) {

            Set<String> variantCombinations = new HashSet<>();

            List<ProductVariant> variants = request.getVariants()
                    .stream()
                    .map(variantRequest -> {

                        // Variant must have at least one option
                        if (variantRequest.getOptions() == null
                                || variantRequest.getOptions().isEmpty()) {

                            throw new RuntimeException(
                                    "Variant must have at least one option"
                            );
                        }

                        // Create unique combination key
                        String combination = variantRequest.getOptions()
                                .stream()
                                .sorted(
                                        Comparator.comparing(
                                                ProductVariantOptionRequest::getOptionName
                                        )
                                )
                                .map(option ->
                                        option.getOptionName()
                                                + "="
                                                + option.getOptionValue()
                                )
                                .collect(Collectors.joining("|"));

                        // Prevent duplicate combinations
                        if (!variantCombinations.add(combination)) {
                            throw new RuntimeException(
                                    "Duplicate variant combination: "
                                            + combination
                            );
                        }

                        ProductVariant variant = new ProductVariant();

                        variant.setProduct(product);

                        // ================= VARIANT VALIDATION =================

                        if (variantRequest.getPrice() == null
                                || variantRequest.getPrice() < 0) {

                            throw new RuntimeException(
                                    "Variant price cannot be negative"
                            );
                        }

                        if (variantRequest.getDiscountPrice() != null
                                && variantRequest.getDiscountPrice() < 0) {

                            throw new RuntimeException(
                                    "Variant discount price cannot be negative"
                            );
                        }

                        if (variantRequest.getDiscountPrice() != null
                                && variantRequest.getDiscountPrice()
                                > variantRequest.getPrice()) {

                            throw new RuntimeException(
                                    "Variant discount price cannot be greater than price"
                            );
                        }

                        if (variantRequest.getStock() < 0) {

                            throw new RuntimeException(
                                    "Variant stock cannot be negative"
                            );
                        }

                        // ================= SET VARIANT DATA =================

                        variant.setPrice(variantRequest.getPrice());
                        variant.setDiscountPrice(
                                variantRequest.getDiscountPrice()
                        );
                        variant.setStock(variantRequest.getStock());

                        // ================= VARIANT OPTIONS =================

                        List<ProductVariantOption> options =
                                variantRequest.getOptions()
                                        .stream()
                                        .map(optionRequest -> {

                                            ProductVariantOption option =
                                                    new ProductVariantOption();

                                            option.setVariant(variant);

                                            option.setOptionName(
                                                    optionRequest.getOptionName()
                                            );

                                            option.setOptionValue(
                                                    optionRequest.getOptionValue()
                                            );

                                            return option;
                                        })
                                        .toList();

                        variant.setOptions(options);

                        return variant;
                    })
                    .toList();

            product.getVariants().addAll(variants);
        }

        // ================= CATEGORY =================

        product.setCategory(category);
        product.setSubCategory(subCategory);

        // ================= STATUS =================

        if (product.getStatus() == ProductStatus.ACTIVE) {
            product.setStatus(ProductStatus.PENDING);
        }

        // ================= SAVE =================

        Product updatedProduct = productRepository.save(product);

        return mapToResponse(updatedProduct);
    }

    @Override
    @CacheEvict(value = "products", key = "#productId")
    public void deleteProduct(Long productId, String sellerEmail) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (!product.getSeller().getEmail().equals(sellerEmail)) {
            throw new RuntimeException("You can delete only your own product");
        }

        productRepository.delete(product);
    }

}
