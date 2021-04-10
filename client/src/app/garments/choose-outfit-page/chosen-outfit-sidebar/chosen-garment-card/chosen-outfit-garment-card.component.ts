import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Garment} from "../../../../classes/garment";
import {Subscription} from "rxjs";
import {GarmentService} from "../../../../../service/garment.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-chosen-outfit-garment-card',
  templateUrl: './chosen-outfit-garment-card.component.html',
  styleUrls: ['./chosen-outfit-garment-card.component.scss']
})
export class ChosenOutfitGarmentCardComponent implements OnInit, OnDestroy {

  @Input() garment: Garment;
  @Output() remove = new EventEmitter<Garment>();
  subscription: Subscription;
  image;

  constructor(private garmentService: GarmentService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.getPictureForGarment(this.garment.id);
  }

  getPictureForGarment(id: number) {
    this.subscription = this.garmentService.getPicture(id).subscribe(data => {
      const reader = new FileReader();
      reader.onload = (e) => this.image = this.sanitizer.bypassSecurityTrustUrl(e.target.result.toString());
      reader.readAsDataURL(new Blob([data]));
    });
  }

  removeGarmentFromChosenGarments(garment: Garment){
    this.remove.emit(garment);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
