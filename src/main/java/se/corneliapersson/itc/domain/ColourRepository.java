package se.corneliapersson.itc.domain;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import se.corneliapersson.itc.entity.Colour;
import se.corneliapersson.itc.entity.MainCategory;

@Repository
public interface ColourRepository extends CrudRepository<Colour, Long> {

}
