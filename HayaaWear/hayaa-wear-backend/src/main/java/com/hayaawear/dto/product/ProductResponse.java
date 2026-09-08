package com.hayaawear.dto.product;

import com.hayaawear.entity.DressLength;
import com.hayaawear.entity.FitType;
import com.hayaawear.entity.OccasionType;
import com.hayaawear.entity.SleeveType;

import java.util.List;
import java.util.Set;

public class ProductResponse {

    private Long id;
    private String name;
    private Double price;
    private Double discountPrice;

    private SleeveType sleeveType;
    private DressLength dressLength;
    private FitType fitType;
    private boolean hijabCompatible;

    private Set<OccasionType> occasions;

    // 🔥 NEW
    private List<ProductImageResponse> images;

    public ProductResponse() {
    }

    // -------- getters & setters --------

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public Set<OccasionType> getOccasions() {
        return occasions;
    }

    public void setOccasions(Set<OccasionType> occasions) {
        this.occasions = occasions;
    }

    public List<ProductImageResponse> getImages() {
        return images;
    }

    public void setImages(List<ProductImageResponse> images) {
        this.images = images;
    }
}
