package se.corneliapersson.itc;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import se.corneliapersson.itc.domain.MainCategoryRepository;
import se.corneliapersson.itc.domain.UnderCategoryRepository;
import se.corneliapersson.itc.entity.MainCategory;
import se.corneliapersson.itc.entity.MainCategoryType;
import se.corneliapersson.itc.service.UnderCategoryService;

import java.time.LocalDateTime;

@SpringBootApplication
public class ItcApplication {

    public static void main(String[] args) {
        SpringApplication.run(ItcApplication.class, args);
    }

    @Bean
    public CommandLineRunner setUp(MainCategoryRepository mainCategoryRepository, UnderCategoryService underCategoryService) {
        return (args -> {
            System.out.println(LocalDateTime.now() +  " Applikationen startar");
//            MainCategory mainCategory1 = new MainCategory();
//            mainCategory1.setName("Överdel");
//            MainCategory mainCategory2 = new MainCategory();
//            mainCategory2.setName("Underdel");
//            MainCategory mainCategory3 = new MainCategory();
//            mainCategory3.setName("Överdel/Underdel");
//            mainCategoryRepository.save(mainCategory1);
//            mainCategoryRepository.save(mainCategory2);
//            mainCategoryRepository.save(mainCategory3);

//            underCategoryService.addUnderCategory("Tights", MainCategoryType.UNDERDEL);
//            underCategoryService.addUnderCategory("Kimono", MainCategoryType.OVERDEL);
//            underCategoryService.addUnderCategory("Skjorta", MainCategoryType.OVERDEL);
//            underCategoryService.addUnderCategory("Kostymbyxor", MainCategoryType.UNDERDEL);
//            underCategoryService.addUnderCategory("Jeans", MainCategoryType.UNDERDEL);
//            underCategoryService.addUnderCategory("Linne", MainCategoryType.OVERDEL);


        });
    }
}
