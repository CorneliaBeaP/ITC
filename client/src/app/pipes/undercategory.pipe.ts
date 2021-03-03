import {Pipe, PipeTransform} from '@angular/core';
import {UnderCategory} from "../classes/under-category";
import {forEachComment} from "tslint";

@Pipe({
  name: 'undercategory'
})
export class UndercategoryPipe implements PipeTransform {

  transform(underCategories: UnderCategory[], mainCategoryId: number): UnderCategory[] {
    let updatedList = [];
    underCategories.forEach((underCategory) => {
      if (underCategory.mainCategory.id == mainCategoryId) {
        updatedList.push(underCategory);
      }
    });
    return updatedList;
  }
}
