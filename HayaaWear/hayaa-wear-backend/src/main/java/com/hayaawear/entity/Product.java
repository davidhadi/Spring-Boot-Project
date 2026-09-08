package com.hayaawear.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
public class Product extends BaseEntity {

    private String name;

    @Column(length = 2000)
    private String description;

    private Double price;
    private Double discountPrice;
    private int stock;

    @Enumerated(EnumType.STRING)
    private SleeveType sleeveType;

    @Enumerated(EnumType.STRING)
    private DressLength dressLength;

    @Enumerated(EnumType.STRING)
    private ProductStatus status;

    @Enumerated(EnumType.STRING)
    private FitType fitType;

    private boolean hijabCompatible;
    private boolean transparent;

    @ManyToOne
    private Category category;

    @ManyToOne
    private SubCategory subCategory;

    @ManyToOne
    private User seller;

    @Column(name = "primary_image_url")
    private String primaryImageUrl;

    @ElementCollection(targetClass = OccasionType.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "product_occasions")
    private Set<OccasionType> occasions;

    @OneToMany(
            mappedBy = "product",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    @JsonManagedReference
    private List<ProductImage> images = new ArrayList<>();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getDiscountPrice() {
        return discountPrice;
    }

    public void setDiscountPrice(Double discountPrice) {
        this.discountPrice = discountPrice;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public SleeveType getSleeveType() {
        return sleeveType;
    }

    public void setSleeveType(SleeveType sleeveType) {
        this.sleeveType = sleeveType;
    }

    public DressLength getDressLength() {
        return dressLength;
    }

    public void setDressLength(DressLength dressLength) {
        this.dressLength = dressLength;
    }

    public ProductStatus getStatus() {
        return status;
    }

    public void setStatus(ProductStatus status) {
        this.status = status;
    }

    public FitType getFitType() {
        return fitType;
    }

    public void setFitType(FitType fitType) {
        this.fitType = fitType;
    }

    public boolean isHijabCompatible() {
        return hijabCompatible;
    }

    public void setHijabCompatible(boolean hijabCompatible) {
        this.hijabCompatible = hijabCompatible;
    }

    public boolean isTransparent() {
        return transparent;
    }

    public void setTransparent(boolean transparent) {
        this.transparent = transparent;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public SubCategory getSubCategory() {
        return subCategory;
    }

    public void setSubCategory(SubCategory subCategory) {
        this.subCategory = subCategory;
    }

    public User getSeller() {
        return seller;
    }

    public void setSeller(User seller) {
        this.seller = seller;
    }

    public String getPrimaryImageUrl() {
        return primaryImageUrl;
    }

    public void setPrimaryImageUrl(String primaryImageUrl) {
        this.primaryImageUrl = primaryImageUrl;
    }

    public Set<OccasionType> getOccasions() {
        return occasions;
    }

    public void setOccasions(Set<OccasionType> occasions) {
        this.occasions = occasions;
    }

    public List<ProductImage> getImages() {
        return images;
    }

    public void setImages(List<ProductImage> images) {
        this.images = images;
    }
}