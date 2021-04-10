package se.corneliapersson.itc.domain.garment;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import se.corneliapersson.itc.entity.garment.MainCategory;

import java.util.Optional;

@Repository
public interface MainCategoryRepository extends CrudRepository<MainCategory, Long> {
    @Override
    Iterable<MainCategory> findAll();

    @Override
    Optional<MainCategory> findById(Long aLong);


}
