import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {GarmentService} from "../../../../service/garment.service";
import {DomSanitizer} from "@angular/platform-browser";
import {AttributeService} from "../../../../service/attribute.service";
import {UnderCategory} from "../../../classes/under-category";
import {AttributesAlphabeticalPipe} from "../../../pipes/attributes-alphabetical.pipe";
import {UndercategoryPipe} from "../../../pipes/undercategory.pipe";
import {Colour} from "../../../classes/colour";
import {Theme} from "../../../classes/theme";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-garment-page',
  templateUrl: './edit-garment-page.component.html',
  styleUrls: ['./edit-garment-page.component.scss']
})
export class EditGarmentPageComponent implements OnInit, OnDestroy {

  @Input() garment;
  image;
  subscription: Subscription;
  garmentsUndercategories: UnderCategory[];
  garmentsColours: Colour[];
  garmentsThemes: Theme[];
  allUndercategories: UnderCategory[] = [];
  form;
  idcounter = 100001;
  errorMessage: string;

  constructor(private garmentService: GarmentService,
              private sanitizer: DomSanitizer,
              private attributeService: AttributeService,
              private attributesAlphabeticalPipe: AttributesAlphabeticalPipe,
              private undercategoryPipe: UndercategoryPipe,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.createForm();
    this.getPictureForGarment(this.garment.id);
    this.getGarmentsExistingUndercategories();
    this.getGarmentsExistingColours();
    this.getGarmentsExistingThemes();
  }

  createForm() {
    this.form = this.formBuilder.group({
      colourfreetext: [''],
      themefreetext: [''],
      undercategoryfreetext: ['']
    });
  }

  getPictureForGarment(id: number) {
    this.subscription = this.garmentService.getPicture(id).subscribe(data => {
      const reader = new FileReader();
      reader.onload = (e) => this.image = this.sanitizer.bypassSecurityTrustUrl(e.target.result.toString());
      reader.readAsDataURL(new Blob([data]));
    });
  }

  getGarmentsExistingUndercategories() {
    this.garmentsUndercategories = [];
    this.garment.underCategories.forEach(x => {
      this.garmentsUndercategories.push(x);
    });
  }

  getGarmentsExistingColours() {
    this.garmentsColours = [];
    this.garment.colours.forEach(x => {
      this.garmentsColours.push(x);
    });
  }

  getGarmentsExistingThemes() {
    this.garmentsThemes = [];
    this.garment.themes.forEach(x => {
      this.garmentsThemes.push(x);
    });
  }

  removeAttribute(id: number) {
    this.garmentsUndercategories.forEach(x => {
      if (x.id == id) {
        let index = this.garmentsUndercategories.indexOf(x);
        this.garmentsUndercategories.splice(index, 1);
      }
    });
    this.garment.themes.forEach(x => {
      if (x.id == id) {
        let index = this.garment.themes.indexOf(x);
        this.garment.themes.splice(index, 1);
      }
    });
    this.garment.colours.forEach(x => {
      if (x.id == id) {
        let index = this.garment.colours.indexOf(x);
        this.garment.colours.splice(index, 1);
      }
    });
  }

  onEnterColour() {
    let colour = new Colour();
    let colourfreetext = this.form.get('colourfreetext');
    colour.name = colourfreetext.value;
    colour.id = this.idcounter;
    this.idcounter++;
    if (!this.doesColourAlreadyExistInChosenColours(colour.name)) {
      this.garment.colours.push(colour);
    } else {
      this.errorMessage = 'Färg finns redan!';
    }
    colourfreetext.reset('');
  }

  onEnterTheme() {
    let theme = new Theme;
    let themefreetext = this.form.get('themefreetext');
    theme.name = themefreetext.value;
    theme.id = this.idcounter;
    this.idcounter++;
    if (!this.doesThemeAlreadyExistInChosenThemes(theme.name)) {
      this.garment.themes.push(theme);
    } else {
      this.errorMessage = 'Tema finns redan!'
    }
    themefreetext.reset('');
  }

  onEnterUnderCategory() {
    let underCategory = new UnderCategory();
    let freetext = this.form.get('undercategoryfreetext');
    underCategory.name = freetext.value;
    underCategory.id = this.idcounter;
    this.idcounter++;
    underCategory.mainCategory = this.garment.mainCategory;
    if (!this.doesUnderCategoryAlreadyExistInChosenUnderCategories(underCategory.name)) {
      this.garment.underCategories.push(underCategory);
    } else {
      this.errorMessage = 'Underkategori finns redan!'
    }
    freetext.reset('');
  }

  doesColourAlreadyExistInChosenColours(name: string): Boolean {
    let alreadyExist = false;
    if (this.garment.colours.length > 0) {
      this.garment.colours.forEach((c) => {
        if (c.name.toLowerCase() == name.toLowerCase()) {
          alreadyExist = true;
        }
      });
    }
    return alreadyExist;
  }

  doesThemeAlreadyExistInChosenThemes(name: string): Boolean {
    let alreadyExist = false;
    if (this.garment.themes.length > 0) {
      this.garment.themes.forEach((t) => {
        if (t.name.toLowerCase() == name.toLowerCase()) {
          alreadyExist = true;
        }
      });
    }
    return alreadyExist;
  }

  doesUnderCategoryAlreadyExistInChosenUnderCategories(name: string): Boolean {
    let alreadyExist = false;
    if (this.garment.underCategories.length > 0) {
      this.garment.underCategories.forEach((u) => {
        if (u.name.toLowerCase() == name.toLowerCase()) {
          alreadyExist = true;
        }
      });
    }
    return alreadyExist;
  }

  cancel() {
    window.location.reload();
  }

  onSubmit() {
    this.garmentService.updateGarment(this.garment);
    window.location.reload();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
