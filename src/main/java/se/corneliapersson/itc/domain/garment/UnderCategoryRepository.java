package se.corneliapersson.itc.domain.garment;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import se.corneliapersson.itc.entity.garment.UnderCategory;

import java.util.Optional;

@Repository
public interface UnderCategoryRepository extends CrudRepository<UnderCategory, Long> {

    @Query(value = "SELECT * FROM Under_category where under_category.name=?1", nativeQuery = true)
    Optional<UnderCategory> findByName(String name);
}
