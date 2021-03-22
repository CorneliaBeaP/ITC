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
    @ManyToMany(cascade = CascadeType.REMOVE)
    private List<Colour> colours;
    @ManyToOne(cascade = CascadeType.REMOVE)
    private MainCategory mainCategory;
    @ManyToMany(cascade = CascadeType.REMOVE)
    private List<UnderCategory> underCategories;
    @ManyToMany(cascade = CascadeType.REMOVE)
    private List<Theme> themes;

    public Garment(List<Colour> colours, MainCategory mainCategory, List<UnderCategory> underCategories, List<Theme> themes) {
        this.colours = colours;
        this.mainCategory = mainCategory;
        this.underCategories = underCategories;
        this.themes = themes;
    }

    public Garment() {
    }

    @Override
    public String toString() {
        return "Garment{" +
                "id=" + id +
                ", colours=" + colours +
                ", mainCategory=" + mainCategory +
                ", underCategories=" + underCategories +
                ", themes=" + themes +
                '}';
    }

}
