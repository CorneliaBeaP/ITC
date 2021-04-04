import {Component, OnInit, Output, EventEmitter, Input, OnChanges} from '@angular/core';
import {Garment} from "../../../classes/garment";
import {DuplicateGarmentPipe} from "../../../pipes/duplicate-garment.pipe";

@Component({
  selector: 'app-chosen-outfit',
  templateUrl: './chosen-outfit.component.html',
  styleUrls: ['./chosen-outfit.component.scss']
})
export class ChosenOutfitComponent implements OnInit {

  @Output() showChosenOutfit = new EventEmitter<boolean>();
  @Output() chosenGarmentsChange = new EventEmitter<Garment[]>();
  @Input() chosenGarments: Garment[];
  mainCategoryIDs: number[] = [1, 2, 3];

  constructor(private duplicateGarmentPipe: DuplicateGarmentPipe) {
  }

  ngOnInit(): void {

  }

  sortGarmentByMainCategory(mainCategoryID: number, list: Garment[]): Garment[] {
    let sortedList: Garment[] = [];
    list.forEach(garment => {
      if (garment.mainCategory.id == mainCategoryID) {
        sortedList.push(garment);
      }
    });
    return this.duplicateGarmentPipe.transform(sortedList);
  }

  removeGarmentFromChosenGarments(garment: Garment) {
    Promise.resolve(this.chosenGarments.splice(this.chosenGarments.indexOf(garment), 1)).then(() => this.chosenGarmentsChange.emit(this.chosenGarments)).finally(() => this.updateChosenGarmentCache());
  }

  updateChosenGarmentCache() {
   Promise.resolve(sessionStorage.setItem('chosen', JSON.stringify(this.chosenGarments)));
  }
  

  hideChosenOutfit() {
    this.showChosenOutfit.emit(false);
  }
}
