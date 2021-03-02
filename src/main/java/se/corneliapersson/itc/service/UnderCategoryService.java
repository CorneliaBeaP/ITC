package se.corneliapersson.itc.service;

import org.springframework.stereotype.Service;
import se.corneliapersson.itc.domain.UnderCategoryRepository;

@Service
public class UnderCategoryService {

    private UnderCategoryRepository repository;

    public UnderCategoryService(UnderCategoryRepository repository) {
        this.repository = repository;
    }
}
