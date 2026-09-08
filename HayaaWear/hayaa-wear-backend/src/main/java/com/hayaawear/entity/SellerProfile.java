package com.hayaawear.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;

@Entity
public class SellerProfile extends BaseEntity {

    @OneToOne
    private User user;

    private String boutiqueName;
    private String city;

    private boolean approved = false;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getBoutiqueName() {
        return boutiqueName;
    }

    public void setBoutiqueName(String boutiqueName) {
        this.boutiqueName = boutiqueName;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public boolean isApproved() {
        return approved;
    }

    public void setApproved(boolean approved) {
        this.approved = approved;
    }
}
