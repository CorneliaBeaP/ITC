import {Component, OnInit, Output, EventEmitter, Input, OnChanges, OnDestroy} from '@angular/core';
import {Garment} from "../../../classes/garment";
import {DuplicateGarmentPipe} from "../../../pipes/duplicate-garment.pipe";
import {Outfit} from "../../../classes/outfit";
import {OutfitService} from "../../../../service/outfit.service";
import {Subscription} from "rxjs";
import {OutfitCategory} from "../../../classes/outfit-category";

@Component({
  selector: 'app-chosen-outfit-sidebar',
  templateUrl: './chosen-outfit-sidebar.component.html',
  styleUrls: ['./chosen-outfit-sidebar.component.scss']
})
export class ChosenOutfitSidebarComponent implements OnInit, OnDestroy {

  @Output() showChosenOutfit = new EventEmitter<boolean>();
  @Output() chosenGarmentsChange = new EventEmitter<Garment[]>();
  @Input() chosenGarments: Garment[];
  mainCategoryIDs: number[] = [1, 2, 3, 4];
  outfitCategories: OutfitCategory[];
  subscription: Subscription;

  constructor(private duplicateGarmentPipe: DuplicateGarmentPipe,
              private outfitService: OutfitService) {
  }

  ngOnInit(): void {
    this.getAllOutfitCategories();
  }

  getAllOutfitCategories() {
    this.subscription = this.outfitService.getAllOutfitCateogries().subscribe(data => {
      this.outfitCategories = data;
    });
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

  saveOufit(id: number) {
    let outfit: Outfit = new Outfit();
    outfit.categoryid = id;
    outfit.garments = this.chosenGarments;
    this.outfitService.saveOutfit(outfit);
    this.chosenGarments = [];
    sessionStorage.removeItem('chosen');
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
