import {Component, OnInit, Output, EventEmitter, Input, OnChanges} from '@angular/core';
import {Garment} from "../../../classes/garment";
import {DuplicateGarmentPipe} from "../../../pipes/duplicate-garment.pipe";
import {Outfit} from "../../../classes/outfit";
import {OutfitService} from "../../../../service/outfit.service";

@Component({
  selector: 'app-chosen-outfit-sidebar',
  templateUrl: './chosen-outfit-sidebar.component.html',
  styleUrls: ['./chosen-outfit-sidebar.component.scss']
})
export class ChosenOutfitSidebarComponent implements OnInit {

  @Output() showChosenOutfit = new EventEmitter<boolean>();
  @Output() chosenGarmentsChange = new EventEmitter<Garment[]>();
  @Input() chosenGarments: Garment[];
  mainCategoryIDs: number[] = [1, 2, 3, 4];

  constructor(private duplicateGarmentPipe: DuplicateGarmentPipe,
              private outfitService: OutfitService) {
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

  saveOufit() {
    let outfit: Outfit = new Outfit();
    outfit.garments = this.chosenGarments;
    this.outfitService.saveOutfit(outfit);
  }
}
