import {Component, OnDestroy, OnInit} from '@angular/core';
import {Garment} from "../../classes/garment";
import {GarmentService} from "../../../service/garment.service";
import {Subscription} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";
import {Colour} from "../../classes/colour";
import {Theme} from "../../classes/theme";
import {AttributesAlphabeticalPipe} from "../../pipes/attributes-alphabetical.pipe";
import {AttributeService} from "../../../service/attribute.service";
import {UnderCategory} from "../../classes/under-category";
import {MainCategory} from "../../classes/main-category";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DuplicateGarmentPipe} from "../../pipes/duplicate-garment.pipe";

@Component({
  selector: 'app-choose-outfit-page',
  templateUrl: './choose-outfit-page.component.html',
  styleUrls: ['./choose-outfit-page.component.scss']
})
export class ChooseOutfitPageComponent implements OnInit, OnDestroy {

  allGarments: Garment[] = [];
  garmentsToShow: Garment[] = [];
  allColours: Colour[] = [];
  allThemes: Theme[] = [];
  allUnderCategories: UnderCategory[] = [];
  allMainCategories: MainCategory[] = [];
  subscription: Subscription;
  form: FormGroup;
  showMainCategories = false;
  showUnderCategories = false;
  showColours = false;
  showThemes = false;

  constructor(private garmentService: GarmentService,
              private attributeService: AttributeService,
              private alphabeticalPipe: AttributesAlphabeticalPipe,
              private duplicateGarmentPipe: DuplicateGarmentPipe,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.createForm();
    this.getAllAttributes();
    this.getAllGarments();
  }

  createForm() {
    this.form = this.formBuilder.group({
      undercategory: [''],
      colour: [''],
      theme: [''],
      maincategory: ['']
    });
  }

  getAllGarments() {
    this.subscription = this.garmentService.getAllGarments().subscribe(data => {
      this.allGarments = data;
    });
  }

  getAllAttributes() {
    this.subscription = this.attributeService.getAllThemes().subscribe(data => {
      this.allThemes = this.alphabeticalPipe.transform(data);
    });
    this.subscription = this.attributeService.getAllColours().subscribe(data => {
      this.allColours = this.alphabeticalPipe.transform(data);
    });
    this.subscription = this.attributeService.getAllUnderCategories().subscribe(data => {
      this.allUnderCategories = this.alphabeticalPipe.transform(data);
    });
    this.subscription = this.attributeService.getAllMainCategories().subscribe(data => {
      this.allMainCategories = data;
    })
  }

  onMainCategoryChange(event) {
    if (event.target.checked == true) {
      let garments = this.getGarmentsByMainCategory(event.target.value);
      garments.forEach(garment => {
        this.garmentsToShow.forEach(garment2 => {
          console.log(garment.id);
          console.log(garment2.id);
          if (!(garment2.id == garment.id)) {
            this.garmentsToShow.push(garment);
          }
        });
      });
    }
    if (event.target.checked == false) {
      let garments = this.getGarmentsByMainCategory(event.target.value);
      garments.forEach(garment => {
        const index = this.garmentsToShow.indexOf(garment, 0);
        if (index > -1) {
          this.garmentsToShow.splice(index, 1);
        }
      });
    }
  }

  onUnderCategoryChange(event) {
    this.addOrRemoveFromShowedGarments(event, 'undercategory');
  }

  onColourChange(event) {
    this.addOrRemoveFromShowedGarments(event, 'colour');
  }

  onThemeChange(event) {
    this.addOrRemoveFromShowedGarments(event, 'theme');
  }

  addOrRemoveFromShowedGarments(event, attribute: string) {
    console.log(this.garmentsToShow.length);
    if (event.target.checked == true) {
      let garments = this.getGarmentByAttributeList(event.target.value, attribute);
      garments.forEach(garment => {
        if (this.garmentsToShow.length > 0) {
          this.garmentsToShow.forEach(garment2 => {
            if (!(garment2.id == garment.id)) {
              console.log(garment2.id);
              console.log(garment.id)
              this.garmentsToShow.push(garment);
              this.duplicateGarmentPipe.transform(this.garmentsToShow);
            }
          });
        } else {
          this.garmentsToShow.push(garment);
        }
      });
    }
    if (event.target.checked == false) {
      let garments = this.getGarmentByAttributeList(event.target.value, attribute);
      garments.forEach(garment => {
        const index = this.garmentsToShow.indexOf(garment, 0);
        if (index > -1) {
          this.garmentsToShow.splice(index, 1);
        }
      });
    }
  }

  getGarmentsByMainCategory(id: number): Garment[] {
    let garments: Garment[] = [];
    this.allGarments.forEach(garment => {
      if (garment.mainCategory.id == id) {
        garments.push(garment);
      }
    });
    return garments;
  }

  getGarmentByAttributeList(id: number, attribute: string) {
    let garments: Garment[] = [];
    this.allGarments.forEach(garment => {
      if (attribute == 'colour') {
        garment.colours.forEach(x => {
          if (x.id == id) {
            garments.push(garment);
          }
        });
      } else if (attribute == 'theme') {
        garment.themes.forEach(x => {
          if (x.id == id) {
            garments.push(garment);
          }
        });
      } else if (attribute == 'undercategory') {
        garment.underCategories.forEach(x => {
          if (x.id == id) {
            garments.push(garment);
          }
        });
      }
    });
    return garments;
  }

  onSubmit() {
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
