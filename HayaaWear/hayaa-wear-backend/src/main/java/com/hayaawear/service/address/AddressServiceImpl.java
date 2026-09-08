package com.hayaawear.service.address;

import com.hayaawear.entity.Address;
import com.hayaawear.entity.User;
import com.hayaawear.repository.AddressRepository;
import com.hayaawear.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    public AddressServiceImpl(AddressRepository addressRepository,
                              UserRepository userRepository) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }

    private User getLoggedInUser() {
        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public Address addAddress(Address address) {
        User user = getLoggedInUser();
        address.setUser(user);
        return addressRepository.save(address);
    }

    @Override
    public List<Address> getMyAddresses() {
        User user = getLoggedInUser();
        return addressRepository.findByUser(user);
    }

    @Override
    public void deleteAddress(Long id) {
        User user = getLoggedInUser();

        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        if (!address.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        addressRepository.delete(address);
    }
}

