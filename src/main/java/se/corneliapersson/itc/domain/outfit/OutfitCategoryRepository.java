package se.corneliapersson.itc.domain.outfit;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import se.corneliapersson.itc.entity.outfit.OutfitCategory;

@Repository
public interface OutfitCategoryRepository extends CrudRepository<OutfitCategory, Long> {
}
