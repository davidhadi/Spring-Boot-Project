package com.hayaawear.controller.admin;

import com.hayaawear.entity.Category;
import com.hayaawear.entity.SubCategory;
import com.hayaawear.repository.CategoryRepository;
import com.hayaawear.repository.SubCategoryRepository;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/admin/subcategories")
public class AdminSubCategoryController {

    private final SubCategoryRepository subCategoryRepository;
    private final CategoryRepository categoryRepository;

    public AdminSubCategoryController(SubCategoryRepository subCategoryRepository,
                                      CategoryRepository categoryRepository) {
        this.subCategoryRepository = subCategoryRepository;
        this.categoryRepository = categoryRepository;
    }

    // 🔹 ADD SUBCATEGORY
    @PostMapping(value = "/{categoryId}", consumes = "multipart/form-data")
    @PreAuthorize("hasRole('ADMIN')")
    public SubCategory addSubCategory(
            @PathVariable Long categoryId,
            @RequestParam("name") String name,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) throws IOException {

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        SubCategory subCategory = new SubCategory();
        subCategory.setName(name);
        subCategory.setCategory(category);

        if (image != null && !image.isEmpty()) {
            String imagePath = saveFile(image, "subcategories");
            subCategory.setImageUrl(imagePath);
        }

        return subCategoryRepository.save(subCategory);
    }

    // 🔹 GET SUBCATEGORIES BY CATEGORY
    @GetMapping("/category/{categoryId}")
    @PreAuthorize("hasRole('SELLER')")
    public List<SubCategory> getByCategory(@PathVariable Long categoryId) {
        return subCategoryRepository.findByCategoryId(categoryId);
    }

    @GetMapping
//    @PreAuthorize("hasRole('ADMIN')")
    public List<SubCategory> getAllSubCategory(){
        return subCategoryRepository.findAll();
    }

    private String saveFile(MultipartFile file, String folder) throws IOException {

        String baseDir = System.getProperty("user.dir");

        Path uploadPath = Paths.get(baseDir, "uploads", folder);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        Path filePath = uploadPath.resolve(fileName);

        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return "/uploads/" + folder + "/" + fileName;
    }
}

