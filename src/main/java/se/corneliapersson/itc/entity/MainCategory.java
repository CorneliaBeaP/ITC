package se.corneliapersson.itc.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
public class MainCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String name;
    private long attributeId = 1;
    @OneToMany(mappedBy = "mainCategory")
    private List<Garment> garments;
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "mainCategory")
    private List<UnderCategory> underCategories;

}
