package com.hayaawear.service.user;

import com.hayaawear.entity.User;

public interface UserService {

    User registerCustomer(User user);

    User registerSeller(User user);

    User getUserByEmail(String email);

    User getUserById(Long id);
}
