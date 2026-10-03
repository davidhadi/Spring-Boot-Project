package com.hayaawear.dto.product;

import com.hayaawear.entity.OccasionType;
import com.hayaawear.entity.ProductStatus;
import com.hayaawear.entity.Category;

import java.util.Set;

public class ProductListResponse {

    private Long id;
    private String name;
    private Double price;
    private Double discountPrice;

    private ProductStatus status;

    private String primaryImage;

    private Category category;

    private Set<OccasionType> occasions;

    public ProductListResponse() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Double getDiscountPrice() { return discountPrice; }
    public void setDiscountPrice(Double discountPrice) { this.discountPrice = discountPrice; }

    public String getPrimaryImage() { return primaryImage; }
    public void setPrimaryImage(String primaryImage) { this.primaryImage = primaryImage; }

    public ProductStatus getStatus() {
        return status;
    }

    public void setStatus(ProductStatus status) {
        this.status = status;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Set<OccasionType> getOccasions() {
        return occasions;
    }

    public void setOccasions(Set<OccasionType> occasions) {
        this.occasions = occasions;
    }
}
