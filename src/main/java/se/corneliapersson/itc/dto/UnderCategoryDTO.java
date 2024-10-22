package se.corneliapersson.itc.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UnderCategoryDTO {
    private long id;
    private String name;
    private long attributeId = 2;
    private MainCategoryDTO mainCategory;
}
