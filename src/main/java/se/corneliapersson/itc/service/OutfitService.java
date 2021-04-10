package se.corneliapersson.itc.service;

import org.springframework.stereotype.Service;
import se.corneliapersson.itc.domain.OutfitRepository;
import se.corneliapersson.itc.dto.GarmentDTO;
import se.corneliapersson.itc.dto.OutfitDTO;
import se.corneliapersson.itc.dto.Response;
import se.corneliapersson.itc.entity.Garment;
import se.corneliapersson.itc.entity.Outfit;

import java.util.ArrayList;
import java.util.List;

@Service
public class OutfitService {

    private OutfitRepository repository;
    private GarmentService garmentService;

    public OutfitService(OutfitRepository repository, GarmentService garmentService) {
        this.repository = repository;
        this.garmentService = garmentService;
    }

    public Outfit convertNewOutfitToOutfitObject(OutfitDTO outfitDTO) {
        Outfit outfit = new Outfit();
        List<Garment> newOutfitGarments = new ArrayList<>();
        for (GarmentDTO garment : outfitDTO.getGarments()
        ) {
            newOutfitGarments.add(garmentService.getGarmentById(garment.getId()));
        }
        outfit.setGarments(newOutfitGarments);
        return outfit;
    }

    public OutfitDTO convertToOutfitDTO(Outfit outfit) {
        OutfitDTO outfitDTO = new OutfitDTO();
        List<GarmentDTO> garmentDTOS = new ArrayList<>();
        for (Garment garment : outfit.getGarments()
        ) {
            garmentDTOS.add(garmentService.convertToGarmentDTO(garment));
        }
        outfitDTO.setGarments(garmentDTOS);
        return outfitDTO;
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
}
