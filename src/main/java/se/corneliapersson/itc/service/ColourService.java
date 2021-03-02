package se.corneliapersson.itc.service;

import org.springframework.stereotype.Service;
import se.corneliapersson.itc.domain.ColourRepository;

@Service
public class ColourService {

    private ColourRepository repository;

    public ColourService(ColourRepository repository) {
        this.repository = repository;
    }
}
