package se.corneliapersson.itc.domain;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import se.corneliapersson.itc.entity.MainCategory;
import se.corneliapersson.itc.entity.UnderCategory;

@Repository
public interface UnderCategoryRepository extends CrudRepository<UnderCategory, Long> {
}
