package com.hayaawear.controller.admin;

import com.hayaawear.entity.SellerProfile;
import com.hayaawear.repository.SellerProfileRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/sellers")
public class AdminSellerController {

    private final SellerProfileRepository sellerProfileRepository;

    public AdminSellerController(SellerProfileRepository sellerProfileRepository) {
        this.sellerProfileRepository = sellerProfileRepository;
    }

    // GET PENDING SELLERS
    @GetMapping("/pending")
    public List<SellerProfile> getPendingSellers() {
        return sellerProfileRepository.findByApprovedFalse();
    }

    // APPROVE SELLER
    @PutMapping("/approve/{id}")
    public SellerProfile approveSeller(@PathVariable Long id) {
        SellerProfile seller = sellerProfileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Seller not found"));

        seller.setApproved(true);
        return sellerProfileRepository.save(seller);
    }
}
