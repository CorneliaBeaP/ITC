import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  showChooseOutfit;
  showAddGarment;

  constructor() {
  }

  ngOnInit(): void {
  }

  directTo(destination: string) {
    if (destination == 'chooseoutfit') {
      this.showAddGarment = false;
      this.showChooseOutfit = true;
    } else if (destination == 'addgarment') {
      this.showChooseOutfit = false;
      this.showAddGarment = true;
    }
  }

}
