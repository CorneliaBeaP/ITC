import {Component, OnDestroy, OnInit} from '@angular/core';
import {Outfit} from "../../classes/outfit";
import {OutfitService} from "../../../service/outfit.service";
import {Subscription} from "rxjs";

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

  constructor(private outfitService: OutfitService) {
  }

  ngOnInit(): void {
    this.getAllOutfits();
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

  goBack() {
    this.showOutfit = false;
  }

}
