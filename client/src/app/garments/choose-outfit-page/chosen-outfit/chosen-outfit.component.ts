import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Garment} from "../../../classes/garment";
import {DuplicateGarmentPipe} from "../../../pipes/duplicate-garment.pipe";

@Component({
  selector: 'app-chosen-outfit',
  templateUrl: './chosen-outfit.component.html',
  styleUrls: ['./chosen-outfit.component.scss']
})
export class ChosenOutfitComponent implements OnInit {

  @Output() showChosenOutfit = new EventEmitter<boolean>();
  @Input() chosenGarments: Garment[];

  constructor(private duplicateGarmentPipe: DuplicateGarmentPipe) {
  }

  ngOnInit(): void {
  }

  sortGarmentByMainCategory(mainCategoryID: number, list: Garment[]): Garment[]{
    let sortedList: Garment[] = [];
    list.forEach(garment => {
      if(garment.mainCategory.id==mainCategoryID){
        sortedList.push(garment);
      }
    });
    return this.duplicateGarmentPipe.transform(sortedList);
  }

  hideChosenOutfit() {
    this.showChosenOutfit.emit(false);
  }
}
