package com.hayaawear.controller.address;


import com.hayaawear.entity.Address;
import com.hayaawear.service.address.AddressService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/addresses")
@CrossOrigin
public class AddressController {

    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    // ✅ Add Address
    @PostMapping
    public Address addAddress(@RequestBody Address address) {
        return addressService.addAddress(address);
    }

    // ✅ Get My Addresses
    @GetMapping("/my")
    public List<Address> getMyAddresses() {
        return addressService.getMyAddresses();
    }

    // ✅ Delete Address
    @DeleteMapping("/{id}")
    public void deleteAddress(@PathVariable Long id) {
        addressService.deleteAddress(id);
    }
}