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
    private long id;
    @ManyToMany
    private List<Colour> colours;
    @ManyToOne
    private MainCategory mainCategory;
    @ManyToOne
    private UnderCategory underCategory;
    @ManyToMany
    private List<Theme> themes;

    public Garment(List<Colour> colours, MainCategory mainCategory, UnderCategory underCategory, List<Theme> themes) {
        this.colours = colours;
        this.mainCategory = mainCategory;
        this.underCategory = underCategory;
        this.themes = themes;
    }

    public Garment() {
    }
}
