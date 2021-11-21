package com.Springsecurity.Service;

import com.Springsecurity.model.Alian;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class userDetails implements UserDetails {

    private String username;
    private String password;

    public userDetails(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public static userDetails built(Alian alian){
        return new userDetails(
                alian.getUsername(),
                alian.getPassword()
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
