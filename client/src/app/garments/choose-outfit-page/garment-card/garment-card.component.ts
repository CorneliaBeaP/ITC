import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Garment} from "../../../classes/garment";
import {GarmentService} from "../../../../service/garment.service";
import {Subscription} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-garment-card',
  templateUrl: './garment-card.component.html',
  styleUrls: ['./garment-card.component.scss']
})
export class GarmentCardComponent implements OnInit, OnDestroy {

  @Input() garment: Garment;
  @Output() chosenGarment = new EventEmitter<Garment>();
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

  chooseGarment(garment: Garment){
    this.chosenGarment.emit(garment);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
