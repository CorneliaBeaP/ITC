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
    private static final long OVERDEL_ID = 1;
    private static final long UNDERDEL_ID = 2;
    private static final long OVERDELOCHUNDERDEL_ID = 3;
    private static final long ACCESSOAR_ID = 4;

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

    public List<UnderCategoryDTO> convertToUnderCategoryDTOList(List<UnderCategory> list) {
        List<UnderCategoryDTO> underCategoryDTOS = new ArrayList<>();
        for (UnderCategory u : list
        ) {
            underCategoryDTOS.add(convertToUnderCategoryDTO(u));
        }
        return underCategoryDTOS;
    }

    public ColourDTO convertToColourDTO(Colour colour) {
        ColourDTO colourDTO = new ColourDTO();
        colourDTO.setId(colour.getId());
        colourDTO.setName(colour.getName());
        return colourDTO;
    }

    public List<ColourDTO> convertToColourDTOList(List<Colour> colours) {
        List<ColourDTO> colourDTOS = new ArrayList<>();
        for (Colour c : colours
        ) {
            colourDTOS.add(convertToColourDTO(c));
        }
        return colourDTOS;
    }

    public ThemeDTO convertToThemeDTO(Theme theme) {
        ThemeDTO themeDTO = new ThemeDTO();
        themeDTO.setId(theme.getId());
        themeDTO.setName(theme.getName());
        return themeDTO;
    }

    public List<ThemeDTO> convertToThemeDTOList(List<Theme> list) {
        List<ThemeDTO> themeDTOS = new ArrayList<>();
        for (Theme t : list
        ) {
            themeDTOS.add(convertToThemeDTO(t));
        }
        return themeDTOS;
    }

    public MainCategoryType getMainCategoryTypeFromMainCategoryId(long id) {
        MainCategoryType mainCategoryType = null;
        if (id == OVERDEL_ID) {
            mainCategoryType = MainCategoryType.OVERDEL;
        } else if (id == OVERDELOCHUNDERDEL_ID) {
            mainCategoryType = MainCategoryType.OVEROCHUNDERDEL;
        } else if (id == UNDERDEL_ID) {
            mainCategoryType = MainCategoryType.UNDERDEL;
        } else if (id == ACCESSOAR_ID) {
            mainCategoryType = MainCategoryType.ACCESSOAR;
        }
        return mainCategoryType;
    }

    private String generateDatabaseFriendlyAttributeName(String attributeName) {
        return attributeName.substring(0, 1).toUpperCase() + attributeName.substring(1).toLowerCase();
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

    //findBy

    public MainCategory findMainCategoryById(Long id) {
        return mainCategoryRepository.findById(id).get();
    }

    public Colour findColourById(Long id) {
        return colourRepository.findById(id).get();
    }

    public Theme findThemeById(Long id) {
        return themeRepository.findById(id).get();
    }

    public UnderCategory findUnderCategoryById(Long id) {
        return underCategoryRepository.findById(id).get();
    }

    public Colour findColourByName(String name) {
        Colour colour;
        Optional<Colour> foundColour = colourRepository.findByName(name);
        colour = foundColour.orElse(null);
        return colour;
    }

    public Theme findThemeByName(String name) {
        Theme theme;
        Optional<Theme> foundTheme = themeRepository.findByName(name);
        theme = foundTheme.orElse(null);
        return theme;
    }

    public UnderCategory findUnderCategoryByName(String name) {
        UnderCategory underCategory;
        Optional<UnderCategory> foundUC = underCategoryRepository.findByName(name);
        underCategory = foundUC.orElse(null);
        return underCategory;
    }

    //Add

    public Response addUnderCategory(String name, MainCategoryType type) {
        Response response = new Response("ERROR", "Kunde inte spara kategori.");
        UnderCategory category = new UnderCategory();
        category.setName(generateDatabaseFriendlyAttributeName(name));
        Optional<MainCategory> mainCategory;

        if (type.equals(MainCategoryType.OVERDEL)) {
            mainCategory = mainCategoryRepository.findById(1L);
        } else if (type.equals(MainCategoryType.UNDERDEL)) {
            mainCategory = mainCategoryRepository.findById(2L);
        } else if (type.equals(MainCategoryType.OVEROCHUNDERDEL)) {
            mainCategory = mainCategoryRepository.findById(3L);
        } else {
            mainCategory = mainCategoryRepository.findById(4L);
        }
        if (mainCategory.isPresent()) {
            category.setMainCategory(mainCategory.get());
            underCategoryRepository.save(category);
            List<UnderCategory> underCategoriesToMainCategory = mainCategory.get().getUnderCategories();
            underCategoriesToMainCategory.add(category);
            mainCategory.get().setUnderCategories(underCategoriesToMainCategory);
            mainCategoryRepository.save(mainCategory.get());
            response.setStatus("OK");
            response.setMessage("Kategori " + category.getName() + " sparad");
        }
        System.out.println(response.getMessage());
        return response;
    }

    public Response addColour(String name) {
        Colour colour = new Colour();
        colour.setName(generateDatabaseFriendlyAttributeName(name));
        Response response = new Response("OK", "Färgen " + colour.getName() + " är sparad.");
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
        Theme theme = new Theme();
        theme.setName(generateDatabaseFriendlyAttributeName(name));
        Response response = new Response("OK", "Temat " + theme.getName() + " är sparat.");
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
