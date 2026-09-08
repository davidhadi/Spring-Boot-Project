package com.hayaawear.service.product;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductImageService {

    void uploadProductImage(
            Long productId,
            List<MultipartFile> files,
            String sellerEmail
    );

    void deleteProductImage(
            Long imageId,
            String sellerEmail
    );

    void changePrimaryImage(
            Long imageId,
            String sellerEmail
    );

}
