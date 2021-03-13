import {Component, OnDestroy, OnInit} from '@angular/core';
import {Garment} from "../../classes/garment";
import {GarmentService} from "../../../service/garment.service";
import {Subscription} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-choose-outfit-page',
  templateUrl: './choose-outfit-page.component.html',
  styleUrls: ['./choose-outfit-page.component.scss']
})
export class ChooseOutfitPageComponent implements OnInit, OnDestroy {

  allGarments: Garment[] = [];
  subscription: Subscription;
  image;

  constructor(private garmentService: GarmentService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.getAllGarments();
    this.getPictureForGarment(64);
  }

  getAllGarments() {
    this.subscription = this.garmentService.getAllGarments().subscribe(data => {
      this.allGarments = data;
    });
  }

  getPictureForGarment(id: number) {
    this.subscription = this.garmentService.getPicture(61).subscribe(data => {
      const reader = new FileReader();
      reader.onload = (e) => this.image = this.sanitizer.bypassSecurityTrustUrl(e.target.result.toString());
      reader.readAsDataURL(new Blob([data]));
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
