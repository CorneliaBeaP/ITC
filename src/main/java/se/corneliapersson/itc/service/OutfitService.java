package se.corneliapersson.itc.service;

import org.springframework.stereotype.Service;
import se.corneliapersson.itc.domain.outfit.OutfitCategoryRepository;
import se.corneliapersson.itc.domain.outfit.OutfitRepository;
import se.corneliapersson.itc.dto.GarmentDTO;
import se.corneliapersson.itc.dto.OutfitCategoryDTO;
import se.corneliapersson.itc.dto.OutfitDTO;
import se.corneliapersson.itc.dto.Response;
import se.corneliapersson.itc.entity.garment.Garment;
import se.corneliapersson.itc.entity.outfit.Outfit;
import se.corneliapersson.itc.entity.outfit.OutfitCategory;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OutfitService {

    private OutfitRepository repository;
    private OutfitCategoryRepository categoryRepository;
    private GarmentService garmentService;

    public OutfitService(OutfitRepository repository, OutfitCategoryRepository categoryRepository, GarmentService garmentService) {
        this.repository = repository;
        this.categoryRepository = categoryRepository;
        this.garmentService = garmentService;
    }

    public Outfit convertNewOutfitToOutfitObject(OutfitDTO outfitDTO) {
        Outfit outfit = new Outfit();
        outfit.setCategory(getOutfitCategoryById(outfitDTO.getCategoryid()));
        List<Garment> newOutfitGarments = new ArrayList<>();
        for (GarmentDTO garment : outfitDTO.getGarments()
        ) {
            newOutfitGarments.add(garmentService.getGarmentById(garment.getId()));
        }
        outfit.setGarments(newOutfitGarments);
        return outfit;
    }

    public OutfitCategory getOutfitCategoryById(long id) {
        Optional<OutfitCategory> outfitCategory = categoryRepository.findById(id);
        return outfitCategory.get();
    }


    public OutfitDTO convertToOutfitDTO(Outfit outfit) {
        OutfitDTO outfitDTO = new OutfitDTO();
        outfitDTO.setCategoryid(outfit.getCategory().getId());
        List<GarmentDTO> garmentDTOS = new ArrayList<>();
        for (Garment garment : outfit.getGarments()
        ) {
            garmentDTOS.add(garmentService.convertToGarmentDTO(garment));
        }
        outfitDTO.setGarments(garmentDTOS);
        return outfitDTO;
    }

    public OutfitCategoryDTO convertToOutfitCategoryDTO(OutfitCategory outfitCategory) {
        OutfitCategoryDTO outfitCategoryDTO = new OutfitCategoryDTO();
        outfitCategoryDTO.setId(outfitCategory.getId());
        outfitCategoryDTO.setName(outfitCategory.getName());
        List<OutfitDTO> outfitDTOS = new ArrayList<>();
        outfitCategoryDTO.setOutfits(outfitDTOS);
        return outfitCategoryDTO;
    }

    public List<OutfitDTO> getAllOutfitsAsDTOs() {
        List<OutfitDTO> outfitDTOS = new ArrayList<>();
        for (Outfit outfit : repository.findAll()
        ) {
            outfitDTOS.add(convertToOutfitDTO(outfit));
        }
        return outfitDTOS;
    }

    public Response saveOutfit(OutfitDTO outfitDTO) {
        Outfit outfit = convertNewOutfitToOutfitObject(outfitDTO);
        Response response = new Response("OK", "Outfit sparad");
        try {
            repository.save(outfit);
            for (GarmentDTO garmentDTO : outfitDTO.getGarments()
            ) {
                garmentService.saveOutfitToGarmentsOutfits(garmentDTO.getId(), outfit);
            }
        } catch (Exception e) {
            e.printStackTrace();
            response.setMessage("Något gick fel.");
            response.setStatus("ERROR");
        }
        return response;
    }

    public List<OutfitCategoryDTO> getAllOutfitCategoryDTOS() {
        List<OutfitCategoryDTO> categoryDTOS = new ArrayList<>();
        for (OutfitCategory o : categoryRepository.findAll()
        ) {
            categoryDTOS.add(convertToOutfitCategoryDTO(o));
        }
        return categoryDTOS;
    }

    public void generateAllOutfitCategories() {
        OutfitCategory outfitCategory = new OutfitCategory();
        outfitCategory.setName("Fest");
        OutfitCategory outfitCategory2 = new OutfitCategory();
        outfitCategory2.setName("Work");
        OutfitCategory outfitCategory3 = new OutfitCategory();
        outfitCategory3.setName("Vardag");
        categoryRepository.save(outfitCategory);
        categoryRepository.save(outfitCategory2);
        categoryRepository.save(outfitCategory3);
    }
}
