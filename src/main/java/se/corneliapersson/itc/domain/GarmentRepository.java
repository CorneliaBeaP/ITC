package se.corneliapersson.itc.domain;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import se.corneliapersson.itc.entity.Garment;

@Repository
public interface GarmentRepository extends CrudRepository<Garment, Long> {

    @Query(value = "SELECT * FROM Garment WHERE ID = (SELECT MAX(ID) FROM Garment)", nativeQuery = true)
    Garment findLatestGarment();
}
