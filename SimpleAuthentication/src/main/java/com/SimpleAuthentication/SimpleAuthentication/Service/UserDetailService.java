package com.SimpleAuthentication.SimpleAuthentication.Service;


import com.SimpleAuthentication.SimpleAuthentication.Model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Set;

public class UserDetailService implements UserDetails {

    private static final long serialVersionUID = 1L;
    public int id;

    public String username;

    public String password;

    private Collection<? extends GrantedAuthority> authorities;

    public UserDetailService(int id, String username, String password){
        this.id = id;
        this.username = username;
        this.password = password;
    }

    public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
        this.authorities = authorities;
    }

    public static UserDetails build(User user){
        return new UserDetailService(user.getId(), user.getUsername(), user.getPassword());

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
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
