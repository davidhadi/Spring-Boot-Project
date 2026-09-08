package com.hayaawear.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public class Category extends BaseEntity {

    private String name; // Abaya, Hijab, Suit

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "banner_image_url")
    private String bannerImageUrl; // future shop banner use

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBannerImageUrl() {
        return bannerImageUrl;
    }

    public void setBannerImageUrl(String bannerImageUrl) {
        this.bannerImageUrl = bannerImageUrl;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}

