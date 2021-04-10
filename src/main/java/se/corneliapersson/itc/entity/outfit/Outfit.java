package se.corneliapersson.itc.entity.outfit;

import lombok.Getter;
import lombok.Setter;
import se.corneliapersson.itc.entity.garment.Garment;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
public class Outfit {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @ManyToOne
    private OutfitCategory category;
    @ManyToMany(mappedBy = "includedInOutfits")
    private List<Garment> garments;

}
