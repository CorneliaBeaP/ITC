import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {GarmentService} from "../../../service/garment.service";
import {Garment} from "../../classes/garment";

@Component({
  selector: 'app-manage-garments-page',
  templateUrl: './manage-garments-page.component.html',
  styleUrls: ['./manage-garments-page.component.scss']
})
export class ManageGarmentsPageComponent implements OnInit {

  subscription: Subscription;
  allGarments: Garment[] = [];
  garmentToEdit: Garment;

  constructor(private garmentService: GarmentService) {
    this.getAllGarments();
  }

  ngOnInit(): void {
  }

  getAllGarments() {
    this.subscription = this.garmentService.getAllGarments().subscribe(data => {
      this.allGarments = data;
    });
  }

  editGarment(garment: Garment) {
    this.garmentToEdit = garment;
    console.log(garment);

  }
}
