package com.Springsecurity.Service;

import com.Springsecurity.model.Alian;
import com.Springsecurity.repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class userDetailsService implements UserDetailsService {

    @Autowired
    userRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Alian alian = userRepository.findByUsername(username)
                .orElseThrow(()-> new UsernameNotFoundException("user name not found"));
        return userDetails.built(alian);
    }
}
