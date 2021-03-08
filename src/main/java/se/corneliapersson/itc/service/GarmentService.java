package se.corneliapersson.itc.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import se.corneliapersson.itc.domain.GarmentRepository;
import se.corneliapersson.itc.dto.*;
import se.corneliapersson.itc.entity.*;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Service
public class GarmentService {

    private GarmentRepository repository;
    private AttributesService attributesService;

    public GarmentService(GarmentRepository repository, AttributesService attributesService) {
        this.repository = repository;
        this.attributesService = attributesService;
    }

    public Garment addGarment(GarmentDTO garmentDTO) {
        Garment garment = new Garment();
        garment.setMainCategory(attributesService.findMainCategoryById(garmentDTO.getMainCategory().getId()));
        List<Colour> colours = new ArrayList<>();
        List<Theme> themes = new ArrayList<>();
        List<UnderCategory> underCategories = new ArrayList<>();
        for (ColourDTO c : garmentDTO.getColours()
        ) {
            if (c.getId() > 100000) {
                attributesService.addColour(c.getName());
                Colour col = attributesService.findColourByName(c.getName());
                if (!(col == null)) {
                    colours.add(col);
                }
            } else {
                colours.add(attributesService.findColourById(c.getId()));
            }
        }
        for (ThemeDTO t : garmentDTO.getThemes()
        ) {
            if (t.getId() > 100000) {
                attributesService.addTheme(t.getName());
                Theme theme = attributesService.findThemeByName(t.getName());
                if (!(theme == null)) {
                    themes.add(theme);
                }
            } else {
                themes.add(attributesService.findThemeById(t.getId()));
            }
        }
        for (UnderCategoryDTO u : garmentDTO.getUnderCategories()
        ) {
            if (u.getId() > 100000) {
                if (u.getMainCategory().getId() == 1) {
                    attributesService.addUnderCategory(u.getName(), MainCategoryType.OVERDEL);
                } else if (u.getMainCategory().getId() == 2) {
                    attributesService.addUnderCategory(u.getName(), MainCategoryType.UNDERDEL);
                } else {
                    attributesService.addUnderCategory(u.getName(), MainCategoryType.OVEROCHUNDERDEL);
                }
                UnderCategory underCategory = attributesService.findUnderCategoryByName(u.getName());
                if (!(underCategory == null)) {
                    underCategories.add(underCategory);
                }
            } else {
                underCategories.add(attributesService.findUnderCategoryById(u.getId()));
            }
        }
        garment.setColours(colours);
        garment.setThemes(themes);
        garment.setUnderCategories(underCategories);
        repository.save(garment);
        garment = repository.findLatestGarment();
        return garment;
    }

    public Response saveImage(Long id, MultipartFile multipartFile) {
        Response response = new Response();
        try {
            String folder = "client/src/assets/garmentpics/";
            byte[] bytes = multipartFile.getBytes();
            String fileName = id.toString();
            Path path = Paths.get(folder + fileName + ".png");
            Files.write(path, bytes);
            response.setStatus("OK");
            response.setMessage("Bild sparad");
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus("ERROR");
            response.setMessage("Kunde inte spara bild");
        }
        return response;

    }
}
