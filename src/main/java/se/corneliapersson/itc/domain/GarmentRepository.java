package se.corneliapersson.itc.domain;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import se.corneliapersson.itc.entity.Garment;

@Repository
public interface GarmentRepository extends CrudRepository<Garment, Long> {
}
