package se.corneliapersson.itc.domain;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import se.corneliapersson.itc.entity.Outfit;

@Repository
public interface OutfitRepository extends CrudRepository<Outfit, Long> {
}
