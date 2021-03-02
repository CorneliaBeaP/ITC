package se.corneliapersson.itc.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
public class Garment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long id;
    @ManyToMany
    private List<Colour> colours;
    @ManyToOne
    private MainCategory mainCategory;
    @ManyToMany
    private List<UnderCategory> underCategories;
    @ManyToMany
    private List<Theme> themes;

    public Garment(List<Colour> colours, MainCategory mainCategory, List<UnderCategory> underCategories, List<Theme> themes) {
        this.colours = colours;
        this.mainCategory = mainCategory;
        this.underCategories = underCategories;
        this.themes = themes;
    }

    public Garment() {
    }
}
