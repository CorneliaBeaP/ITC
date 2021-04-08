package se.corneliapersson.itc.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import se.corneliapersson.itc.domain.GarmentRepository;
import se.corneliapersson.itc.dto.*;
import se.corneliapersson.itc.entity.*;

import javax.imageio.ImageIO;
import java.awt.image.RenderedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Service
public class GarmentService {

    private GarmentRepository repository;
    private AttributesService attributesService;
    private static final Long NEW_ATTRIBUTE_MIN_ID = 100000L;


    public GarmentService(GarmentRepository repository, AttributesService attributesService) {
        this.repository = repository;
        this.attributesService = attributesService;
    }

    public GarmentDTO convertToGarmentDTO(Garment garment) {
        GarmentDTO garmentDTO = new GarmentDTO();
        garmentDTO.setId(garment.getId());
        garmentDTO.setMainCategory(attributesService.convertToMainCategoryDTO(garment.getMainCategory()));
        garmentDTO.setColours(attributesService.convertToColourDTOList(garment.getColours()));
        garmentDTO.setThemes(attributesService.convertToThemeDTOList(garment.getThemes()));
        garmentDTO.setUnderCategories(attributesService.convertToUnderCategoryDTOList(garment.getUnderCategories()));
        return garmentDTO;
    }

    public List<GarmentDTO> getAllGarments() {
        List<Garment> allGarments = (List<Garment>) repository.findAll();
        List<GarmentDTO> garmentDTOS = new ArrayList<>();
        for (Garment g : allGarments
        ) {
            garmentDTOS.add(convertToGarmentDTO(g));
        }
        return garmentDTOS;
    }

    public Garment addGarment(GarmentDTO garmentDTO) {
        Garment garment = new Garment();
        garment.setMainCategory(attributesService.findMainCategoryById(garmentDTO.getMainCategory().getId()));
        List<Colour> colours = new ArrayList<>();
        List<Theme> themes = new ArrayList<>();
        List<UnderCategory> underCategories = new ArrayList<>();
        for (ColourDTO c : garmentDTO.getColours()
        ) {
            if (c.getId() >= NEW_ATTRIBUTE_MIN_ID) {
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
            if (t.getId() >= NEW_ATTRIBUTE_MIN_ID) {
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
            if (u.getId() >= NEW_ATTRIBUTE_MIN_ID) {
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

    public byte[] getImage(Long id) throws IOException {
        File sourceimage = new File("client/src/assets/garmentpics/" + id + ".png");
        RenderedImage image = ImageIO.read(sourceimage);
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        ImageIO.write(image, "png", bos);
        byte[] data = bos.toByteArray();
        return data;
    }

    public Response removeGarment(Long id) {
        Response response;
        System.out.println("Removing garment with id " + id);
        try {
            repository.deleteById(id);
            response = new Response("OK", "Plagget borttaget.");
            removeGarmentImage(id);
        } catch (Exception e) {
            e.printStackTrace();
            response = new Response("ERROR", "Något gick fel.");
        }
        return response;
    }

    public void removeGarmentImage(Long id) {
        String folder = "client/src/assets/garmentpics/";
        String fileName = id.toString() + ".png";
        Path path = Paths.get(folder + fileName);
        try {
            Files.deleteIfExists(path);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
//
//    public Response updateGarment(GarmentDTO garmentDTO) {
//        Optional<Garment> garment = repository.findById(garmentDTO.getId());
//        if (garment.isPresent()) {
//            for (UnderCategoryDTO u : garmentDTO.getUnderCategories()
//            ) {
//                if (isAttributeNew(u.getId())) {
//
//                }
//            }
//        }
//        //Ta fram garment
//        //Kontrollera om några attribut har id över 1000
//        //Kolla om de redan finns, isåfall ta det attributet
//        //Om de inte finns, lägg till
//    }
//
//    public boolean isAttributeNew(Long id) {
//        if (id >= NEW_ATTRIBUTE_MIN_ID) {
//            return true;
//        }
//        return false;
//    }
}
