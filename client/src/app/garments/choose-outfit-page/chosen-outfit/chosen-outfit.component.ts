import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Garment} from "../../../classes/garment";

@Component({
  selector: 'app-chosen-outfit',
  templateUrl: './chosen-outfit.component.html',
  styleUrls: ['./chosen-outfit.component.scss']
})
export class ChosenOutfitComponent implements OnInit {

  @Output() showChosenOutfit = new EventEmitter<boolean>();
  @Input() chosenGarments: Garment[];

  constructor() {
  }

  ngOnInit(): void {
  }

  hideChosenOutfit() {
    this.showChosenOutfit.emit(false);
  }
}
