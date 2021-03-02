package se.corneliapersson.itc.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GarmentDTO {

    private long id;

    private List<ColourDTO> colours;

    private MainCategoryDTO mainCategory;

    private List<UnderCategoryDTO> underCategories;

    private List<ThemeDTO> themes;
}
