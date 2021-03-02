package se.corneliapersson.itc;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import se.corneliapersson.itc.domain.MainCategoryRepository;
import se.corneliapersson.itc.entity.MainCategory;

import java.time.LocalDateTime;

@SpringBootApplication
public class ItcApplication {

    public static void main(String[] args) {
        SpringApplication.run(ItcApplication.class, args);
    }

    @Bean
    public CommandLineRunner setUp(MainCategoryRepository mainCategoryRepository) {
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

        });
    }
}
