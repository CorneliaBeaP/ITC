import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Garment} from "../../classes/garment";
import {GarmentService} from "../../../service/garment.service";
import {Subscription} from "rxjs";
import {Colour} from "../../classes/colour";
import {Theme} from "../../classes/theme";
import {AttributesAlphabeticalPipe} from "../../pipes/attributes-alphabetical.pipe";
import {AttributeService} from "../../../service/attribute.service";
import {UnderCategory} from "../../classes/under-category";
import {MainCategory} from "../../classes/main-category";
import {FormBuilder, FormGroup} from "@angular/forms";
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
  underCategoryOptionsToShow: UnderCategory[] = [];
  allMainCategories: MainCategory[] = [];
  subscription: Subscription;
  form: FormGroup;
  showMainCategories = false;
  showUnderCategories = false;
  showColours = false;
  showThemes = false;
  colourIDToShow: number[] = [];
  themeIDToShow: number[] = [];
  uCategoryIDToShow: number[] = [];
  mCategoryIDToShow: number[] = [];
  showChosenOutfit = false;
  chosenGarments: Garment[];

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
    let list = JSON.parse(sessionStorage.getItem('chosen'));
    if(!list==null){
      this.chosenGarments = list;
    }else {
      this.chosenGarments = [];
    }
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
      this.underCategoryOptionsToShow = this.alphabeticalPipe.transform(data);
    });
    this.subscription = this.attributeService.getAllMainCategories().subscribe(data => {
      this.allMainCategories = data;
    })
  }

  onAttributeChange(event, attribute: string) {
    let updateduCList = [];
    if (attribute == 'm') {
      if (event.target.checked == true) {
        Promise.resolve(this.addAttributeToShow(event, this.mCategoryIDToShow)).then(() => this.updateGarmentsToShow()).then(() => this.allUnderCategories.forEach(uC => {
          this.mCategoryIDToShow.forEach(mCID => {
            if (uC.mainCategory.id == mCID) {
              updateduCList.push(uC);
            }
          });
        })).then(() => this.underCategoryOptionsToShow = updateduCList);
      } else {
        Promise.resolve(this.removeAttributeToShow(event, this.mCategoryIDToShow)).then(() => this.updateGarmentsToShow()).then(() => this.allUnderCategories.forEach(uC => {
          this.mCategoryIDToShow.forEach(mCID => {
            if (uC.mainCategory.id == mCID) {
              updateduCList.push(uC);
            }
          });
        })).then(() => {
            this.underCategoryOptionsToShow = updateduCList;
            if (!updateduCList.length) {
              this.underCategoryOptionsToShow = this.allUnderCategories;
            }
          }
        );
      }
    } else if (attribute == 'u') {
      if (event.target.checked == true) {
        Promise.resolve(this.addAttributeToShow(event, this.uCategoryIDToShow)).then(() => this.updateGarmentsToShow());
      } else {
        Promise.resolve(this.removeAttributeToShow(event, this.uCategoryIDToShow)).then(() => this.updateGarmentsToShow());
      }
    } else if (attribute == 'c') {
      if (event.target.checked == true) {
        Promise.resolve(this.addAttributeToShow(event, this.colourIDToShow)).then(() => this.updateGarmentsToShow());
      } else {
        Promise.resolve(this.removeAttributeToShow(event, this.colourIDToShow)).then(() => this.updateGarmentsToShow());
      }
    } else if (attribute == 't') {
      if (event.target.checked == true) {
        Promise.resolve(this.addAttributeToShow(event, this.themeIDToShow)).then(() => this.updateGarmentsToShow());
      } else {
        Promise.resolve(this.removeAttributeToShow(event, this.themeIDToShow)).then(() => this.updateGarmentsToShow());
      }
    }
  }

  removeAttributeToShow(event, list: any[]) {
    const index = list.indexOf(event.target.value, 0);
    if (index > -1) {
      list.splice(index, 1);
    }
  }

  addAttributeToShow(event, list: any[]) {
    list.push(event.target.value);
  }

  updateGarmentsToShow() {
    this.garmentsToShow = [];

    this.allGarments.forEach(garment => {
      let presentInColours = false;
      let presentInUnderCategories = false;
      let presentInMainCategories = false;
      let presentInThemes = false;
      if (this.isGarmentInChosenColours(garment) || this.colourIDToShow.length < 1) {
        presentInColours = true;
      }
      if (this.isGarmentInChosenUnderCategories(garment) || this.uCategoryIDToShow.length < 1) {
        presentInUnderCategories = true;
      }
      if (this.isGarmentInChosenMainCategories(garment) || this.mCategoryIDToShow.length < 1) {
        presentInMainCategories = true;
      }
      if (this.isGarmentInChosenThemes(garment) || this.themeIDToShow.length < 1) {
        presentInThemes = true;
      }
      if (presentInThemes && presentInMainCategories && presentInUnderCategories && presentInColours) {
        Promise.resolve(this.garmentsToShow.push(garment)).then(() => this.garmentsToShow = this.removeDuplicates(this.garmentsToShow));
      }
    });
  }

  isGarmentInChosenColours(garment: Garment): Boolean {
    let isGarmentPresent = false;
    this.colourIDToShow.forEach(colourID => {
      garment.colours.forEach(garmentColour => {
        if (colourID == garmentColour.id) {
          isGarmentPresent = true;
        }
      });
    });
    return isGarmentPresent;
  }

  isGarmentInChosenUnderCategories(garment: Garment): Boolean {
    let isGarmentPresent = false;
    this.uCategoryIDToShow.forEach(xID => {
      garment.underCategories.forEach(x => {
        if (xID == x.id) {
          isGarmentPresent = true;
        }
      });
    });
    return isGarmentPresent;
  }

  isGarmentInChosenThemes(garment: Garment): Boolean {
    let isGarmentPresent = false;
    this.themeIDToShow.forEach(xID => {
      garment.themes.forEach(x => {
        if (xID == x.id) {
          isGarmentPresent = true;
        }
      });
    });
    return isGarmentPresent;
  }

  isGarmentInChosenMainCategories(garment: Garment): Boolean {
    let isGarmentPresent = false;
    this.mCategoryIDToShow.forEach(xID => {
      if (xID == garment.mainCategory.id) {
        isGarmentPresent = true;
      }
    });
    return isGarmentPresent;
  }

  removeDuplicates(array: any[]): any[] {
    const unique = new Set(array);
    return [...unique];
  }

  onClear() {
    Promise.resolve(this.form.reset()).then(() => {
      this.uCategoryIDToShow = [];
      this.mCategoryIDToShow = [];
      this.colourIDToShow = [];
      this.themeIDToShow = [];
    }).finally(() => this.updateGarmentsToShow());
  }

  addGarmentToChosenGarments(garment: Garment) {
    Promise.resolve(this.chosenGarments.push(garment)).then(() => this.updateChosenGarmentCache());
  }

  updateChosenGarmentCache() {
    sessionStorage.setItem('chosen', JSON.stringify(this.chosenGarments));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
