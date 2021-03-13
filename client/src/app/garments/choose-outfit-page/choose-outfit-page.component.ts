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
  }

  getAllGarments() {
    this.subscription = this.garmentService.getAllGarments().subscribe(data => {
      this.allGarments = data;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
