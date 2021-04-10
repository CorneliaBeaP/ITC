import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {Outfit} from "../../../classes/outfit";
import {Garment} from "../../../classes/garment";

@Component({
  selector: 'app-saved-outfit-card',
  templateUrl: './saved-outfit-card.component.html',
  styleUrls: ['./saved-outfit-card.component.scss']
})
export class SavedOutfitCardComponent implements OnInit {

  @Input() outfit: Outfit;
  thumbnailGarment1: Garment;
  thumbnailGarment2: Garment;
  thumbnailGarment3: Garment;
  thumbnailGarment4: Garment;
  showSpecificOutfit = false;
  @Output() showOutfitEvent= new EventEmitter<Outfit>();


  constructor() {
  }

  ngOnInit(): void {
    this.generateThumbnails();
  }

  generateThumbnails() {
    let garments = this.outfit.garments;
    if (garments.length > 0) {
      this.thumbnailGarment1 = garments[0];
      if (garments.length > 1) {
        this.thumbnailGarment2 = garments[1];
        if (garments.length > 2) {
          this.thumbnailGarment3 = garments[2];
          if(garments.length > 3) {
            this.thumbnailGarment4 = garments[3];
          }
        }
      }
    }
  }

  showOutfit(){
    this.showSpecificOutfit = true;
    this.showOutfitEvent.emit(this.outfit);
  }
}
