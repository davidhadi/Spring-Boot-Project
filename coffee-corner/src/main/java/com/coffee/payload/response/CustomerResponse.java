package com.coffee.payload.response;

import com.coffee.model.Role;

import java.util.HashSet;
import java.util.Set;

public class CustomerResponse {

    private long id;
    private String fname;
    private String lname;
    private String email;
    private Set<Role> roles = new HashSet<>();

    private String contact;
    private String Address;

    private String jwt;

    public CustomerResponse() {
    }

    public CustomerResponse(long id, String fname, String lname, String email, Set<Role> roles, String contact, String address, String jwt) {
        this.id = id;
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.roles = roles;
        this.contact = contact;
        this.Address = address;
        this.jwt = jwt;
    }



    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getAddress() {
        return Address;
    }

    public void setAddress(String address) {
        Address = address;
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }
}
