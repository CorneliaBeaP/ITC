package se.corneliapersson.itc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.corneliapersson.itc.domain.MainCategoryRepository;
import se.corneliapersson.itc.dto.MainCategoryDTO;
import se.corneliapersson.itc.entity.MainCategory;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class MainCategoryService {

    public MainCategoryService(MainCategoryRepository mainCategoryRepository) {
        this.mainCategoryRepository = mainCategoryRepository;
    }

    private MainCategoryRepository mainCategoryRepository;

    public MainCategoryDTO convertToMainCategoryDTO(MainCategory category){
        MainCategoryDTO mainCategoryDTO = new MainCategoryDTO();
        mainCategoryDTO.setId(category.getId());
        mainCategoryDTO.setName(category.getName());
        return mainCategoryDTO;
    }

    public ArrayList<MainCategoryDTO> findAllMainCategories(){
       Iterable<MainCategory> mainCategories = mainCategoryRepository.findAll();
       ArrayList<MainCategoryDTO> categories = new ArrayList<>();
        for (MainCategory c: mainCategories
             ) {
            categories.add(convertToMainCategoryDTO(c));
        }
        return categories;
    }
}
