package se.corneliapersson.itc.domain.garment;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import se.corneliapersson.itc.entity.garment.Colour;

import java.util.Optional;

@Repository
public interface ColourRepository extends CrudRepository<Colour, Long> {

    @Query(value = "SELECT * FROM Colour where colour.name=?1", nativeQuery = true)
    Optional<Colour> findByName(String name);
}
