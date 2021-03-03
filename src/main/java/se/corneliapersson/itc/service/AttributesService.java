package se.corneliapersson.itc.service;

import org.springframework.stereotype.Service;
import se.corneliapersson.itc.domain.ColourRepository;
import se.corneliapersson.itc.domain.MainCategoryRepository;
import se.corneliapersson.itc.domain.ThemeRepository;
import se.corneliapersson.itc.domain.UnderCategoryRepository;
import se.corneliapersson.itc.dto.*;
import se.corneliapersson.itc.entity.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AttributesService {

    private MainCategoryRepository mainCategoryRepository;
    private UnderCategoryRepository underCategoryRepository;
    private ThemeRepository themeRepository;
    private ColourRepository colourRepository;

    public AttributesService(MainCategoryRepository mainCategoryRepository, UnderCategoryRepository underCategoryRepository, ThemeRepository themeRepository, ColourRepository colourRepository) {
        this.mainCategoryRepository = mainCategoryRepository;
        this.underCategoryRepository = underCategoryRepository;
        this.themeRepository = themeRepository;
        this.colourRepository = colourRepository;
    }

    //Convertions

    public MainCategoryDTO convertToMainCategoryDTO(MainCategory category) {
        MainCategoryDTO mainCategoryDTO = new MainCategoryDTO();
        mainCategoryDTO.setId(category.getId());
        mainCategoryDTO.setName(category.getName());
        return mainCategoryDTO;
    }

    public UnderCategoryDTO convertToUnderCategoryDTO(UnderCategory category) {
        UnderCategoryDTO categoryDTO = new UnderCategoryDTO();
        categoryDTO.setId(category.getId());
        categoryDTO.setName(category.getName());
        categoryDTO.setMainCategory(convertToMainCategoryDTO(category.getMainCategory()));
        return categoryDTO;
    }

    public ColourDTO convertToColourDTO(Colour colour) {
        ColourDTO colourDTO = new ColourDTO();
        colourDTO.setId(colour.getId());
        colourDTO.setName(colour.getName());
        return colourDTO;
    }

    public ThemeDTO convertToThemeDTO(Theme theme) {
        ThemeDTO themeDTO = new ThemeDTO();
        themeDTO.setId(theme.getId());
        themeDTO.setName(theme.getName());
        return themeDTO;
    }

    //findAll

    public ArrayList<MainCategoryDTO> findAllMainCategories() {
        Iterable<MainCategory> mainCategories = mainCategoryRepository.findAll();
        ArrayList<MainCategoryDTO> categories = new ArrayList<>();
        for (MainCategory c : mainCategories
        ) {
            categories.add(convertToMainCategoryDTO(c));
        }
        return categories;
    }

    public ArrayList<UnderCategoryDTO> findAllUnderCategories() {
        Iterable<UnderCategory> categories = underCategoryRepository.findAll();
        ArrayList<UnderCategoryDTO> categoryDTOS = new ArrayList<>();
        for (UnderCategory c : categories
        ) {
            categoryDTOS.add(convertToUnderCategoryDTO(c));
        }
        return categoryDTOS;
    }

    public ArrayList<ColourDTO> findAllColours() {
        Iterable<Colour> colours = colourRepository.findAll();
        ArrayList<ColourDTO> colourDTOS = new ArrayList<>();
        for (Colour c : colours
        ) {
            colourDTOS.add(convertToColourDTO(c));
        }
        return colourDTOS;
    }

    public ArrayList<ThemeDTO> findAllThemes() {
        Iterable<Theme> themes = themeRepository.findAll();
        ArrayList<ThemeDTO> themeDTOS = new ArrayList<>();
        for (Theme t : themes
        ) {
            themeDTOS.add(convertToThemeDTO(t));
        }
        return themeDTOS;
    }

    //Add

    public Response addUnderCategory(String name, MainCategoryType type) {
        Response response = new Response("ERROR", "Kunde inte spara kategori.");
        UnderCategory category = new UnderCategory();
        category.setName(name);
        Optional<MainCategory> mainCategory;

        if (type.equals(MainCategoryType.OVERDEL)) {
            mainCategory = mainCategoryRepository.findById(1L);
        } else if (type.equals(MainCategoryType.UNDERDEL)) {
            mainCategory = mainCategoryRepository.findById(2L);
        } else {
            mainCategory = mainCategoryRepository.findById(3L);
        }
        if (mainCategory.isPresent()) {
            category.setMainCategory(mainCategory.get());
            underCategoryRepository.save(category);
            List<UnderCategory> underCategoriesToMainCategory = mainCategory.get().getUnderCategories();
            underCategoriesToMainCategory.add(category);
            mainCategory.get().setUnderCategories(underCategoriesToMainCategory);
            mainCategoryRepository.save(mainCategory.get());
            response.setStatus("OK");
            response.setMessage("Kategori " + name + " sparad");
        }
        System.out.println(response.getMessage());
        return response;
    }

    public Response addColour(String name) {
        Response response = new Response("Ok", "Färgen " + name + " är sparad.");
        Colour colour = new Colour();
        colour.setName(name);
        try {
            colourRepository.save(colour);
        } catch (Exception e) {
            response.setStatus("ERROR");
            response.setMessage("Kunde inte spara färg.");
            e.printStackTrace();
        }
        System.out.println(response.getMessage());
        return response;
    }

    public Response addTheme(String name) {
        Response response = new Response("Ok", "Temat " + name + " är sparat.");
        Theme theme = new Theme();
        theme.setName(name);
        try {
            themeRepository.save(theme);
        } catch (Exception e) {
            response.setStatus("ERROR");
            response.setMessage("Kunde inte spara tema.");
            e.printStackTrace();
        }
        System.out.println(response.getMessage());
        return response;
    }

}
