package se.corneliapersson.itc;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import se.corneliapersson.itc.dto.MainCategoryDTO;
import se.corneliapersson.itc.service.AttributesService;

import java.time.LocalDateTime;
import java.util.List;

@SpringBootApplication
public class ItcApplication {

    public static void main(String[] args) {
        SpringApplication.run(ItcApplication.class, args);
    }

    @Bean
    public CommandLineRunner setUp(AttributesService attributesService) {
        return (args -> {
            System.out.println(LocalDateTime.now() + " Applikationen startar");
            List<MainCategoryDTO> mainCategories = attributesService.findAllMainCategories();

            if (mainCategories.size() < 1) {
                attributesService.generateAllMainCategories();
            }

        });
    }
}
