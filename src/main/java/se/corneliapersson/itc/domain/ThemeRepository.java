package se.corneliapersson.itc.domain;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import se.corneliapersson.itc.entity.Theme;

import java.util.Optional;

@Repository
public interface ThemeRepository extends CrudRepository<Theme, Long> {

    @Query(value = "SELECT * FROM Theme where theme.name=?1", nativeQuery = true)
    Optional<Theme> findByName(String name);
}
