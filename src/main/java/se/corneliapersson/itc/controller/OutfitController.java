package se.corneliapersson.itc.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.corneliapersson.itc.dto.OutfitDTO;
import se.corneliapersson.itc.service.OutfitService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RestController
@RequestMapping(path = "/api/outfit")
public class OutfitController {

    private final OutfitService outfitService;

    public OutfitController(OutfitService outfitService) {
        this.outfitService = outfitService;
    }

    @GetMapping(path = "/all")
    public List<OutfitDTO> getAllOutfits() {
       return outfitService.getAllOutfitsAsDTOs();
    }
    
}
