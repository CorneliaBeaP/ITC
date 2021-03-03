package se.corneliapersson.itc.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import se.corneliapersson.itc.dto.MainCategoryDTO;
import se.corneliapersson.itc.dto.UnderCategoryDTO;
import se.corneliapersson.itc.service.AttributesService;

import java.util.ArrayList;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RestController
public class AttributesController {

private final AttributesService attributesService;

    public AttributesController(AttributesService attributesService) {
        this.attributesService = attributesService;
    }

    @GetMapping(path = "/api/attributes/mcategories")
    public ArrayList<MainCategoryDTO> getAllMainCategories() {
        return attributesService.findAllMainCategories();
    }

    @GetMapping(path = "/api/attributes/ucategories")
    public ArrayList<UnderCategoryDTO> getAllUnderCategories() {
        return attributesService.findAllUnderCategories();
    }
}
