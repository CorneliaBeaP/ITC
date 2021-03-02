package se.corneliapersson.itc.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import se.corneliapersson.itc.dto.MainCategoryDTO;
import se.corneliapersson.itc.service.MainCategoryService;

import java.util.ArrayList;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RestController
public class AttributesController {

    private final MainCategoryService mainCategoryService;

    public AttributesController(MainCategoryService mainCategoryService) {
        this.mainCategoryService = mainCategoryService;
    }

    @GetMapping(path = "/api/attributes/mcategories")
    public ArrayList<MainCategoryDTO> getAllMainCategories(){
        System.out.println(mainCategoryService.findAllMainCategories());
        return mainCategoryService.findAllMainCategories();
    }
}
