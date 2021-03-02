package se.corneliapersson.itc.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import se.corneliapersson.itc.dto.MainCategoryDTO;
import se.corneliapersson.itc.dto.UnderCategoryDTO;
import se.corneliapersson.itc.service.MainCategoryService;
import se.corneliapersson.itc.service.UnderCategoryService;

import java.util.ArrayList;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RestController
public class AttributesController {

    private final MainCategoryService mainCategoryService;
    private final UnderCategoryService underCategoryService;

    public AttributesController(MainCategoryService mainCategoryService, UnderCategoryService underCategoryService) {
        this.mainCategoryService = mainCategoryService;
        this.underCategoryService = underCategoryService;
    }

    @GetMapping(path = "/api/attributes/mcategories")
    public ArrayList<MainCategoryDTO> getAllMainCategories() {
        return mainCategoryService.findAllMainCategories();
    }

    @GetMapping(path = "/api/attributes/ucategories")
    public ArrayList<UnderCategoryDTO> getAllUnderCategories() {
        return underCategoryService.findAllUnderCategories();
    }
}
