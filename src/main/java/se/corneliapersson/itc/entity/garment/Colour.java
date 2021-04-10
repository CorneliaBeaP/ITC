package se.corneliapersson.itc.entity.garment;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
public class Colour {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private long attributeId = 3;
    private String name;
    @ManyToMany(mappedBy = "colours")
    private List<Garment> garments;
}
