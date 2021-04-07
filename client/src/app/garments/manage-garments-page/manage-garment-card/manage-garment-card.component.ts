import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Garment} from "../../../classes/garment";
import {DomSanitizer} from "@angular/platform-browser";
import {Observable, Subscription} from "rxjs";
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
  showEditPage = false;
  @Output() garmentToBeEdited = new EventEmitter<Garment>();


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

  editGarment(garment: Garment) {
    this.showEditPage = true;
    this.garmentToBeEdited.emit(garment);
  }

  removeGarment() {
    this.garmentService.removeGarment(this.garment.id);
    this.showRemoveQuestion = false;
    window.location.reload()
  }
}
