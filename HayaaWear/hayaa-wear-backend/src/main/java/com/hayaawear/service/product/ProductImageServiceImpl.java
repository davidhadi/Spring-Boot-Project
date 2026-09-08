package com.hayaawear.service.product;

import com.hayaawear.entity.Product;
import com.hayaawear.entity.ProductImage;
import com.hayaawear.entity.User;
import com.hayaawear.repository.ProductImageRepository;
import com.hayaawear.repository.ProductRepository;
import com.hayaawear.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class ProductImageServiceImpl implements ProductImageService {

    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;
    private final UserRepository userRepository;

    private static final String UPLOAD_DIR = "uploads/products/";

    public ProductImageServiceImpl(ProductRepository productRepository, ProductImageRepository productImageRepository, UserRepository userRepository) {
        this.productRepository = productRepository;
        this.productImageRepository = productImageRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void uploadProductImage(Long productId, List<MultipartFile> files, String sellerEmail) {

        if (files == null || files.isEmpty()) {
            throw new RuntimeException("No files uploaded");
        }

        User seller = userRepository.findByEmail(sellerEmail)
                .orElseThrow(() -> new RuntimeException("Seller not found"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (!product.getSeller().getId().equals(seller.getId())) {
            throw new RuntimeException("You are not allowed to upload image for this product");
        }

        try {

            String projectRoot = System.getProperty("user.dir");

            String uploadPath = projectRoot
                    + File.separator + "uploads"
                    + File.separator + "products"
                    + File.separator + productId;

            File uploadDir = new File(uploadPath);

            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            boolean hasImages =
                    productImageRepository.existsByProductId(productId);

            for (MultipartFile file : files) {

                if (file.isEmpty()) {
                    throw new RuntimeException("File is empty");
                }

                String contentType = file.getContentType();

                if (contentType == null ||
                        (!contentType.equals("image/jpeg")
                                && !contentType.equals("image/png")
                                && !contentType.equals("image/webp"))) {

                    throw new RuntimeException("Only JPG, PNG, WEBP allowed");
                }

                if (file.getSize() > 5 * 1024 * 1024) {
                    throw new RuntimeException("File size should be less than 5MB");
                }

                String originalName = file.getOriginalFilename();

                if (originalName == null) {
                    throw new RuntimeException("Invalid file name");
                }

                String fileName = UUID.randomUUID() + "_" + originalName;

                File destination = new File(uploadDir, fileName);

                file.transferTo(destination);

                boolean isPrimary = !hasImages;

                ProductImage image = new ProductImage();

                image.setImageUrl("/uploads/products/" + productId + "/" + fileName);
                image.setPrimaryImage(isPrimary);
                image.setProduct(product);

                productImageRepository.save(image);

                if (isPrimary) {
                    product.setPrimaryImageUrl(image.getImageUrl());
                    productRepository.save(product);
                    hasImages = true;
                }
            }

        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Image upload failed", e);
        }
    }

    @Override
    public void deleteProductImage(Long imageId, String sellerEmail) {

        User seller = userRepository.findByEmail(sellerEmail)
                .orElseThrow(() -> new RuntimeException("Seller not found"));

        ProductImage image = productImageRepository.findById(imageId)
                .orElseThrow(() -> new RuntimeException("Image not found"));

        Product product = image.getProduct();

        // 🔐 Ownership check
        if (!product.getSeller().getId().equals(seller.getId())) {
            throw new RuntimeException("You are not allowed to delete this image");
        }

        // 🗂️ Delete file from storage
        String imagePath = image.getImageUrl().replace("/uploads/", "uploads/");
        File file = new File(imagePath);

        if (file.exists()) {
            file.delete();
        }

        // 🗑️ Delete DB record
        productImageRepository.delete(image);
    }

    @Override
    public void changePrimaryImage(Long imageId, String sellerEmail) {

        User seller = userRepository.findByEmail(sellerEmail)
                .orElseThrow(() -> new RuntimeException("Seller not found"));

        ProductImage newPrimary = productImageRepository.findById(imageId)
                .orElseThrow(() -> new RuntimeException("Image not found"));

        Product product = newPrimary.getProduct();

        // 🔐 Ownership check
        if (!product.getSeller().getId().equals(seller.getId())) {
            throw new RuntimeException("You are not allowed to change primary image");
        }

        // 🔄 Remove old primary image
        ProductImage oldPrimary =
                productImageRepository.findByProductIdAndPrimaryImageTrue(product.getId());

        if (oldPrimary != null) {
            oldPrimary.setPrimaryImage(false);
            productImageRepository.save(oldPrimary);
        }


        // ⭐ Set new primary
        newPrimary.setPrimaryImage(true);
        productImageRepository.save(newPrimary);

        product.setPrimaryImageUrl(newPrimary.getImageUrl());
        productRepository.save(product);

    }

}
