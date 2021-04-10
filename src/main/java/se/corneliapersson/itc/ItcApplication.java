package se.corneliapersson.itc;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import se.corneliapersson.itc.dto.MainCategoryDTO;
import se.corneliapersson.itc.dto.OutfitCategoryDTO;
import se.corneliapersson.itc.entity.outfit.OutfitCategory;
import se.corneliapersson.itc.service.AttributesService;
import se.corneliapersson.itc.service.OutfitService;

import java.time.LocalDateTime;
import java.util.List;

@SpringBootApplication
public class ItcApplication {

    public static void main(String[] args) {
        SpringApplication.run(ItcApplication.class, args);
    }

    @Bean
    public CommandLineRunner setUp(AttributesService attributesService, OutfitService outfitService) {
        return (args -> {
            System.out.println(LocalDateTime.now() + " Applikationen startar");
            List<MainCategoryDTO> mainCategories = attributesService.findAllMainCategories();
            if (mainCategories.size() < 1) {
                attributesService.generateAllMainCategories();
            }

            List<OutfitCategoryDTO> outfitCategories = outfitService.getAllOutfitCategoryDTOS();
            if (outfitCategories.size() < 1) {
                outfitService.generateAllOutfitCategories();
            }
        });
    }
}
