package se.corneliapersson.itc.service;

import org.springframework.stereotype.Service;
import se.corneliapersson.itc.domain.ThemeRepository;

@Service
public class ThemeService {

    private ThemeRepository repository;

    public ThemeService(ThemeRepository repository) {
        this.repository = repository;
    }
}
