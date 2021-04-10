package se.corneliapersson.itc.domain.outfit;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import se.corneliapersson.itc.entity.outfit.Outfit;

@Repository
public interface OutfitRepository extends CrudRepository<Outfit, Long> {
}
