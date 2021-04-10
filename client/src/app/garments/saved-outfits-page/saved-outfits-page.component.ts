import {Component, OnDestroy, OnInit} from '@angular/core';
import {Outfit} from "../../classes/outfit";
import {OutfitService} from "../../../service/outfit.service";
import {Subscription} from "rxjs";
import {OutfitCategory} from "../../classes/outfit-category";

@Component({
  selector: 'app-saved-outfits-page',
  templateUrl: './saved-outfits-page.component.html',
  styleUrls: ['./saved-outfits-page.component.scss']
})
export class SavedOutfitsPageComponent implements OnInit, OnDestroy {

  outfits: Outfit[];
  subscription: Subscription;
  showOutfit = false;
  outfitToShow;
  outfitCategories: OutfitCategory[];
  filteredOutfits: Outfit[];
  filter: number[] = [];


  constructor(private outfitService: OutfitService) {
  }

  ngOnInit(): void {
    this.getAllOutfits();
    this.getAllOutfitCategories();
  }

  getAllOutfits() {
    this.subscription = this.outfitService.getAllOutfits().subscribe(data => {
      this.outfits = data;
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  showSpecificOutfit(outfit: Outfit) {
    this.showOutfit = true;
    this.outfitToShow = outfit;
  }

  getAllOutfitCategories() {
    this.subscription = this.outfitService.getAllOutfitCateogries().subscribe(data => {
      this.outfitCategories = data;
    });
  }

  togglefilter(id: number) {
    if (this.filter.includes(id)) {
      this.filter.splice(this.filter.indexOf(id), 1);
    } else {
      this.filter.push(id);
    }
    this.filterOutfits();
  }

  filterOutfits() {
    this.filteredOutfits = [];
    this.outfits.forEach(outfit => {
      if (this.isFilterActive(outfit.categoryid)) {
        this.filteredOutfits.push(outfit);
      }
    });
  }

  isFilterActive(id: number): boolean {
    if (this.filter.includes(id)) {
      return true;
    } else {
      return false;
    }
  }

  goBack() {
    this.showOutfit = false;
  }

}
