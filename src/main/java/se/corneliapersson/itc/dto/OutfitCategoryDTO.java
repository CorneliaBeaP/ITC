package se.corneliapersson.itc.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OutfitCategoryDTO {
    private long id;
    private String name;
    private List<OutfitDTO> outfits;
}
