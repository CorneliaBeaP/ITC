package se.corneliapersson.itc.service;

import org.springframework.stereotype.Service;
import se.corneliapersson.itc.domain.GarmentRepository;

@Service
public class GarmentService {

    private GarmentRepository repository;

    public GarmentService(GarmentRepository repository) {
        this.repository = repository;
    }
}
