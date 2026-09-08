package com.hayaawear.dto.product;

import com.hayaawear.entity.*;

import java.util.List;
import java.util.Set;

public class ProductRequest {

    private String name;
    private String description;
    private double price;
    private double discountPrice;
    private int stock;

    private SleeveType sleeveType;
    private DressLength dressLength;
    private FitType fitType;

    private boolean hijabCompatible;
    private boolean transparent;

    private Long categoryId;
    private Long subCategoryId;

    private List<String> images;

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    private Set<OccasionType> occasions;

    public ProductRequest() {}

    // getters & setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public double getDiscountPrice() { return discountPrice; }
    public void setDiscountPrice(double discountPrice) { this.discountPrice = discountPrice; }

    public int getStock() { return stock; }
    public void setStock(int stock) { this.stock = stock; }

    public SleeveType getSleeveType() { return sleeveType; }
    public void setSleeveType(SleeveType sleeveType) { this.sleeveType = sleeveType; }

    public DressLength getDressLength() { return dressLength; }
    public void setDressLength(DressLength dressLength) { this.dressLength = dressLength; }

    public FitType getFitType() { return fitType; }
    public void setFitType(FitType fitType) { this.fitType = fitType; }

    public boolean isHijabCompatible() { return hijabCompatible; }
    public void setHijabCompatible(boolean hijabCompatible) { this.hijabCompatible = hijabCompatible; }

    public boolean isTransparent() { return transparent; }
    public void setTransparent(boolean transparent) { this.transparent = transparent; }

    public Long getCategoryId() { return categoryId; }
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }

    public Long getSubCategoryId() { return subCategoryId; }
    public void setSubCategoryId(Long subCategoryId) { this.subCategoryId = subCategoryId; }

    public Set<OccasionType> getOccasions() { return occasions; }
    public void setOccasions(Set<OccasionType> occasions) { this.occasions = occasions; }
}
