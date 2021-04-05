import {Component, Input, OnInit} from '@angular/core';
import {Garment} from "../../../classes/garment";
import {DomSanitizer} from "@angular/platform-browser";
import {Subscription} from "rxjs";
import {GarmentService} from "../../../../service/garment.service";

@Component({
  selector: 'app-manage-garment-card',
  templateUrl: './manage-garment-card.component.html',
  styleUrls: ['./manage-garment-card.component.scss']
})
export class ManageGarmentCardComponent implements OnInit {

  @Input() garment: Garment;
  subscription: Subscription;
  image;
  showRemoveQuestion = false;

  constructor(private sanitizer: DomSanitizer, private garmentService: GarmentService) {
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

  editGarment() {
    //TODO: antingen komma till ny sida eller få en popup
  }

  removeGarment() {
    this.garmentService.removeGarment(this.garment.id);
    this.showRemoveQuestion = false;
    window.location.reload()
  }
}
