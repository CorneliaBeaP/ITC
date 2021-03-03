package se.corneliapersson.itc.service;

import org.springframework.stereotype.Service;
import se.corneliapersson.itc.domain.MainCategoryRepository;
import se.corneliapersson.itc.domain.UnderCategoryRepository;
import se.corneliapersson.itc.dto.UnderCategoryDTO;
import se.corneliapersson.itc.entity.MainCategory;
import se.corneliapersson.itc.entity.MainCategoryType;
import se.corneliapersson.itc.entity.UnderCategory;
import se.corneliapersson.itc.dto.*;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UnderCategoryService {

    private UnderCategoryRepository repository;
    private MainCategoryRepository mainCategoryRepository;

    public UnderCategoryService(UnderCategoryRepository repository, MainCategoryRepository mainCategoryRepository) {
        this.repository = repository;
        this.mainCategoryRepository = mainCategoryRepository;
    }

//    public UnderCategoryDTO convertToUnderCategoryDTO(UnderCategory category) {
//        UnderCategoryDTO categoryDTO = new UnderCategoryDTO();
//        categoryDTO.setId(category.getId());
//        categoryDTO.setName(category.getName());
//        categoryDTO.setMainCategory();
//        return categoryDTO;
//    }
//
//    public ArrayList<UnderCategoryDTO> findAllUnderCategories() {
//        Iterable<UnderCategory> categories = repository.findAll();
//        ArrayList<UnderCategoryDTO> categoryDTOS = new ArrayList<>();
//        for (UnderCategory c : categories
//        ) {
//            categoryDTOS.add(convertToUnderCategoryDTO(c));
//        }
//        return categoryDTOS;
//    }
//
//    public Response addUnderCategory(String name, MainCategoryType type) {
//        Response response = new Response("ERROR", "Kunde inte spara kategori.");
//        UnderCategory category = new UnderCategory();
//        category.setName(name);
//        Optional<MainCategory> mainCategory;
//
//        if (type.equals(MainCategoryType.OVERDEL)) {
//            mainCategory = mainCategoryRepository.findById(1L);
//        } else if (type.equals(MainCategoryType.UNDERDEL)) {
//            mainCategory = mainCategoryRepository.findById(2L);
//        } else {
//            mainCategory = mainCategoryRepository.findById(3L);
//        }
//        if (mainCategory.isPresent()) {
//            category.setMainCategory(mainCategory.get());
//            repository.save(category);
//            List<UnderCategory> underCategoriesToMainCategory = mainCategory.get().getUnderCategories();
//            underCategoriesToMainCategory.add(category);
//            mainCategory.get().setUnderCategories(underCategoriesToMainCategory);
//            mainCategoryRepository.save(mainCategory.get());
//            response.setStatus("OK");
//            response.setMessage("Kategori " + name + " sparad");
//        }
//        System.out.println(response.getMessage());
//        return response;
//    }
}
