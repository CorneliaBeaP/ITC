package se.corneliapersson.itc.service;

import org.springframework.stereotype.Service;
import se.corneliapersson.itc.domain.ColourRepository;
import se.corneliapersson.itc.domain.MainCategoryRepository;
import se.corneliapersson.itc.domain.ThemeRepository;
import se.corneliapersson.itc.domain.UnderCategoryRepository;
import se.corneliapersson.itc.dto.MainCategoryDTO;
import se.corneliapersson.itc.dto.Response;
import se.corneliapersson.itc.dto.UnderCategoryDTO;
import se.corneliapersson.itc.entity.MainCategory;
import se.corneliapersson.itc.entity.MainCategoryType;
import se.corneliapersson.itc.entity.UnderCategory;

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

    public MainCategoryDTO convertToMainCategoryDTO(MainCategory category){
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

    //findAll

    public ArrayList<MainCategoryDTO> findAllMainCategories(){
        Iterable<MainCategory> mainCategories = mainCategoryRepository.findAll();
        ArrayList<MainCategoryDTO> categories = new ArrayList<>();
        for (MainCategory c: mainCategories
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

}
