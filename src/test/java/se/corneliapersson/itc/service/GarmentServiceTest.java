package se.corneliapersson.itc.service;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import se.corneliapersson.itc.domain.garment.*;
import se.corneliapersson.itc.dto.GarmentDTO;
import se.corneliapersson.itc.entity.garment.*;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class GarmentServiceTest {

    @Autowired
    GarmentService garmentService;

    @Autowired
    GarmentRepository garmentRepository;

    @Autowired
    ColourRepository colourRepository;

    @Autowired
    ThemeRepository themeRepository;

    @Autowired
    MainCategoryRepository mainCategoryRepository;

    @Autowired
    UnderCategoryRepository underCategoryRepository;


    MainCategory overdel = new MainCategory();
    UnderCategory skjorta = new UnderCategory();
    UnderCategory linne = new UnderCategory();
    Colour gron = new Colour();
    Colour svart = new Colour();
    Theme vardag = new Theme();
    Theme work = new Theme();
    List<Theme> themes = new ArrayList<>();
    List<UnderCategory> underCategories = new ArrayList<>();
    List<Colour> colours = new ArrayList<>();

    Garment garment = new Garment();
    Garment garment2 = new Garment();


    @BeforeEach
    void setUp() {
        overdel.setName("Överdel");
        mainCategoryRepository.save(overdel);

        gron.setName("Grön");
        svart.setName("Svart");
        colourRepository.save(gron);
        colourRepository.save(svart);

        vardag.setName("Vardag");
        work.setName("Work");
        themeRepository.save(vardag);
        themeRepository.save(work);

        skjorta.setName("Skjorta");
        skjorta.setMainCategory(overdel);
        linne.setName("Linne");
        linne.setMainCategory(overdel);
        underCategoryRepository.save(skjorta);
        underCategoryRepository.save(linne);

        themes.add(vardag);
        themes.add(work);
        colours.add(svart);
        underCategories.add(skjorta);
        garment.setMainCategory(overdel);
        garment.setUnderCategories(underCategories);
        garment.setColours(colours);
        garment.setThemes(themes);
        garmentRepository.save(garment);

        colours.clear();
        colours.add(gron);
        underCategories.clear();
        underCategories.add(linne);
        garment2.setMainCategory(overdel);
        garment2.setThemes(themes);
        garment2.setColours(colours);
        garment2.setUnderCategories(underCategories);
        garmentRepository.save(garment2);

    }

    @AfterEach
    void tearDown() {
        garmentRepository.deleteAll();
        underCategoryRepository.deleteAll();
        themeRepository.deleteAll();
        colourRepository.deleteAll();
        mainCategoryRepository.deleteAll();

        themes.clear();
        colours.clear();
        underCategories.clear();
    }

    @Test
    void convertToGarmentDTO() {

    }

    @Test
    void getAllGarments() {
        List<GarmentDTO> garments = garmentService.getAllGarments();
        assertNotNull(garments);
        assertEquals(2, garments.size());
    }

    @Test
    void addGarment() {

    }

    @Test
    void saveImage() {
    }

    @Test
    void getImage() {
    }

    @Test
    void removeGarment() {
    }

    @Test
    void updateGarment() {
    }
}