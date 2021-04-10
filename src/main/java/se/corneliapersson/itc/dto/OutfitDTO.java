package se.corneliapersson.itc.dto;

import lombok.Getter;
import lombok.Setter;
import se.corneliapersson.itc.entity.outfit.OutfitCategory;

import java.util.List;

@Getter
@Setter
public class OutfitDTO {

    private long id;
    private List<GarmentDTO> garments;
    private long categoryid;

}
