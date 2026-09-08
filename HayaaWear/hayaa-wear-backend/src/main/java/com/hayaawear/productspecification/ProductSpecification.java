package com.hayaawear.productspecification;

import com.hayaawear.entity.FitType;
import com.hayaawear.entity.OccasionType;
import com.hayaawear.entity.Product;
import com.hayaawear.entity.SleeveType;
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

public class ProductSpecification {

    public static Specification<Product> filterProducts(
            SleeveType sleeveType,
            FitType fitType,
            Boolean hijabCompatible,
            OccasionType occasion,
            Double minPrice,
            Double maxPrice
    ) {

        return (root, query, cb) -> {

            List<Predicate> predicates = new ArrayList<>();

            // Only active products
            predicates.add(cb.isTrue(root.get("active")));

            if (sleeveType != null) {
                predicates.add(cb.equal(root.get("sleeveType"), sleeveType));
            }

            if (fitType != null) {
                predicates.add(cb.equal(root.get("fitType"), fitType));
            }

            if (hijabCompatible != null) {
                predicates.add(cb.equal(root.get("hijabCompatible"), hijabCompatible));
            }

            if (occasion != null) {
                predicates.add(cb.isMember(occasion, root.get("occasions")));
            }

            if (minPrice != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("price"), minPrice));
            }

            if (maxPrice != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("price"), maxPrice));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}

