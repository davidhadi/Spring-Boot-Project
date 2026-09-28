package com.hayaawear.controller.subcategory;

import com.hayaawear.entity.SubCategory;
import com.hayaawear.repository.SubCategoryRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/subcategories")
public class SubCategoryController {

    private final SubCategoryRepository subCategoryRepository;

    public SubCategoryController(SubCategoryRepository subCategoryRepository) {
        this.subCategoryRepository = subCategoryRepository;
    }

    @GetMapping("/category/{categoryId}")
    public List<SubCategory> getByCategory(@PathVariable Long categoryId) {
        return subCategoryRepository.findByCategoryId(categoryId);
    }
}