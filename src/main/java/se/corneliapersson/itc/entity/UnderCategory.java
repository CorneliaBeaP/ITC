package se.corneliapersson.itc.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
public class UnderCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String name;
    @ManyToMany(mappedBy = "underCategories")
    private List<Garment> garments;
    @ManyToOne(fetch = FetchType.EAGER)
    private MainCategory mainCategory;

}
