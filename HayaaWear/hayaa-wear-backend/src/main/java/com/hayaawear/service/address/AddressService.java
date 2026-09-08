package com.hayaawear.service.address;

import com.hayaawear.entity.Address;

import java.util.List;

public interface AddressService {
    Address addAddress(Address address);

    List<Address> getMyAddresses();

    void deleteAddress(Long id);
}

