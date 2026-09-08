package com.hayaawear.controller.product;

import com.hayaawear.dto.product.ProductListResponse;
import com.hayaawear.dto.product.ProductRequest;
import com.hayaawear.dto.product.ProductResponse;
import com.hayaawear.entity.FitType;
import com.hayaawear.entity.OccasionType;
import com.hayaawear.entity.SleeveType;
import com.hayaawear.service.product.ProductService;
import com.hayaawear.service.product.ProductImageService;
import com.hayaawear.service.user.UserPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;


import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;
    private final ProductImageService productImageService;

    // ✅ SINGLE constructor (correct)
    public ProductController(ProductService productService, ProductImageService productImageService) {
        this.productService = productService;
        this.productImageService = productImageService;
    }

    @PostMapping
    @PreAuthorize("hasRole('SELLER')")
    public ProductResponse addProduct(
            @RequestBody ProductRequest request,
            Authentication authentication
    ) {

        System.out.println("Authentication: " + authentication);
        System.out.println("Authorities: " + authentication.getAuthorities());

        String sellerEmail = authentication.getName();
        return productService.addProduct(request, sellerEmail);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ProductListResponse>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }


    // ================= FILTER BY OCCASION (PUBLIC) =================
    @GetMapping("/occasion/{occasion}")
    public List<ProductResponse> getProductsByOccasion(@PathVariable OccasionType occasion) {
        return productService.getProductsByOccasion(occasion);
    }

    // ================= FILTER BY CATEGORY (PUBLIC) =================
    @GetMapping("/category/{categoryId}")
    public List<ProductResponse> getProductsByCategory(@PathVariable Long categoryId) {
        return productService.getProductsByCategory(categoryId);
    }

    // ================= ADVANCED FILTER (PUBLIC) =================
    @GetMapping("/filter")
    public List<ProductResponse> filterProducts(
            @RequestParam(required = false) SleeveType sleeveType,
            @RequestParam(required = false) FitType fitType,
            @RequestParam(required = false) Boolean hijabCompatible,
            @RequestParam(required = false) OccasionType occasion
    ) {
        return productService.filterProducts(
                sleeveType,
                fitType,
                hijabCompatible,
                occasion
        );
    }

    // ================= UPLOAD PRODUCT IMAGE (SELLER ONLY) =================
    @PreAuthorize("hasRole('SELLER')")
    @PostMapping("/{productId}/images")
    public String uploadProductImage(@PathVariable Long productId, @RequestParam("file") List<MultipartFile> file, @AuthenticationPrincipal UserPrincipal userPrincipal){

        System.out.println("Principal ID = " + userPrincipal.getUser().getId());

        productImageService.uploadProductImage(productId, file, userPrincipal.getUser().getEmail());

        return "Image uploaded successfully";
    }

    @PreAuthorize("hasRole('SELLER')")
    @DeleteMapping("/images/{imageId}")
    public String deleteProductImage(
            @PathVariable Long imageId,
            Authentication authentication
    ) {
        productImageService.deleteProductImage(
                imageId,
                authentication.getName()
        );
        return "Image deleted successfully";
    }

    @PreAuthorize("hasRole('SELLER')")
    @PutMapping("/images/{imageId}/primary")
    public String changePrimaryImage(
            @PathVariable Long imageId,
            Authentication authentication
    ) {
        productImageService.changePrimaryImage(
                imageId,
                authentication.getName()
        );
        return "Primary image updated successfully";
    }

    // ================= ADMIN: ENABLE PRODUCT =================
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{productId}/enable")
    public String enableProduct(@PathVariable Long productId) {
        productService.enableProduct(productId);
        return "Product enabled successfully";
    }

    // ================= ADMIN: DISABLE PRODUCT =================
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{productId}/disable")
    public String disableProduct(@PathVariable Long productId) {
        productService.disableProduct(productId);
        return "Product disabled successfully";
    }

    // ================= PRODUCT DETAIL (PUBLIC) =================
    @GetMapping("/{productId}")
    public ProductResponse getProductDetails(@PathVariable Long productId) {
        return productService.getProductById(productId);
    }


    @GetMapping
    public ResponseEntity<Page<ProductListResponse>> getAllProducts(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {

        Page<ProductListResponse> products =
                productService.getAllProducts(page, size);

        return ResponseEntity.ok(products);
    }

    @GetMapping("/search")
    public Page<ProductListResponse> searchProducts(
            @RequestParam(required = false) SleeveType sleeveType,
            @RequestParam(required = false) FitType fitType,
            @RequestParam(required = false) Boolean hijabCompatible,
            @RequestParam(required = false) OccasionType occasion,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "desc") String direction
    ) {

        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        return productService.filterProducts(
                sleeveType,
                fitType,
                hijabCompatible,
                occasion,
                minPrice,
                maxPrice,
                pageable
        );
    }

    @PreAuthorize("hasRole('SELLER')")
    @GetMapping("/seller")
    public Page<ProductListResponse> getSellerProducts(Authentication authentication, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);

        return productService.getSellerProducts(
                authentication.getName(),
                pageable
        );
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin")
    public Page<ProductListResponse> getAllProductsForAdmin(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productService.getAllProducts(page, size);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{productId}/approve")
    public String approveProduct(@PathVariable Long productId) {
        productService.approveProduct(productId);
        return "Product approved successfully";
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{productId}/reject")
    public String rejectProduct(@PathVariable Long productId) {
        productService.rejectProduct(productId);
        return "Product rejected successfully";
    }
}
