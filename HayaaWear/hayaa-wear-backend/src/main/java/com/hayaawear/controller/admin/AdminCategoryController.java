package com.hayaawear.controller.admin;

import com.hayaawear.entity.Category;
import com.hayaawear.repository.CategoryRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@RestController
@RequestMapping("/admin/categories")
public class AdminCategoryController {

    private final CategoryRepository categoryRepository;

    public AdminCategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // GET ALL CATEGORIES
    @GetMapping
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // DELETE CATEGORY
    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable Long id) {
        categoryRepository.deleteById(id);
    }

    @PostMapping(consumes = "multipart/form-data")
    public Category addCategory(
            @RequestParam("name") String name,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "bannerImage", required = false) MultipartFile bannerImage
    ) throws IOException {

        Category category = new Category();
        category.setName(name);

        // Save category image
        if (image != null && !image.isEmpty()) {
            String imagePath = saveFile(image, "categories");
            category.setImageUrl(imagePath);
        }

        // Save banner image
        if (bannerImage != null && !bannerImage.isEmpty()) {
            String bannerPath = saveFile(bannerImage, "categories");
            category.setBannerImageUrl(bannerPath);
        }

        return categoryRepository.save(category);
    }

    private String saveFile(MultipartFile file, String folder) throws IOException {

        String baseDir = System.getProperty("user.dir"); // project root
        String uploadDirPath = baseDir + File.separator + "uploads" + File.separator + folder;

        Path uploadDir = Paths.get(uploadDirPath);

        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        Path filePath = uploadDir.resolve(fileName);

        // IMPORTANT: Use Files.copy instead of transferTo
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return "/uploads/" + folder + "/" + fileName;
    }
}
