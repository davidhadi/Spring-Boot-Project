package com.Springsecurity.model;

import javax.annotation.processing.Generated;
import javax.persistence.*;

@Entity
@Table(name = "useralian")
public class Alian {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;

    private String username;
    private String password;

    public Alian() {
    }

    public Alian(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
