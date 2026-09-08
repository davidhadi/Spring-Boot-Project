package com.hayaawear.dto.auth;

public class AuthResponse {
    private String firstName;
    private String lastName;
    private String email;
    private String mobile;
    private String token;
    private String role;
    private boolean emailVerified;
    private boolean mobileVerified;

    public AuthResponse() {
    }


    public AuthResponse(String firstName,
                         String lastName,
                         String email,
                         String mobile,
                         String token,
                         String role,
                         boolean emailVerified,
                         boolean mobileVerified) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.mobile = mobile;
        this.token = token;
        this.role = role;
        this.emailVerified = emailVerified;
        this.mobileVerified = mobileVerified;
    }


    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }
}
