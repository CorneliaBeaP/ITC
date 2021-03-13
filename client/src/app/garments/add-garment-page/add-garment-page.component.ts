import {Component, OnDestroy, OnInit} from '@angular/core';
import {GarmentService} from "../../../service/garment.service";
import {AttributeService} from "../../../service/attribute.service";
import {Observable, Subscription} from "rxjs";
import {MainCategory} from "../../classes/main-category";
import {UnderCategory} from "../../classes/under-category";
import {UndercategoryPipe} from "../../pipes/undercategory.pipe";
import {Colour} from "../../classes/colour";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Theme} from "../../classes/theme";
import {Garment} from "../../classes/garment";
import {strict} from "assert";

@Component({
  selector: 'app-add-garment-page',
  templateUrl: './add-garment-page.component.html',
  styleUrls: ['./add-garment-page.component.scss']
})
export class AddGarmentPageComponent implements OnInit, OnDestroy {

  url: string | ArrayBuffer;
  errorMessage: string;
  subscription: Subscription;
  mainCategoryList: MainCategory[];
  underCategoryList: UnderCategory[];
  updatedUnderCategoryList: UnderCategory[];
  colourList: Colour[];
  themeList: Theme[];
  form: FormGroup;
  showColourTextField = false;
  showThemeTextField = false;
  showUnderCategoryTextfield = false;
  chosenColours: Colour[] = [];
  chosenThemes: Theme[] = [];
  chosenUnderCategories: UnderCategory[] = [];
  pageloaded = false;
  idcounter = 100001;
  picture: FormData;

  constructor(private garmentService: GarmentService,
              private attributeService: AttributeService,
              private undercategoryPipe: UndercategoryPipe,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.setUp();
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      undercategory: ['', Validators.required],
      colour: ['', Validators.required],
      theme: ['', Validators.required],
      maincategory: ['', Validators.required],
      colourfreetext: [''],
      themefreetext: [''],
      undercategoryfreetext: ['']
    });
  }

  setUp() {
    Promise.all([this.getAllMainCategories(),
      this.getAllUnderCategories(),
      this.getAllColours(),
      this.getAllThemes()]).then((value) => {
      this.pageloaded = true;
    })

  }

  getAllMainCategories() {
    this.subscription = this.attributeService.getAllMainCategories().subscribe((data) => {
      this.mainCategoryList = data;
    });
  }

  getAllUnderCategories() {
    this.subscription = this.attributeService.getAllUnderCategories().subscribe((data) => {
      this.underCategoryList = data;
    })
  }

  getAllColours() {
    this.subscription = this.attributeService.getAllColours().subscribe((data) => {
      this.colourList = data;
    })
  }

  getAllThemes() {
    this.subscription = this.attributeService.getAllThemes().subscribe((data) => {
      this.themeList = data;
    })
  }

  onEnterColour() {
    let colour = new Colour();
    let colourfreetext = this.form.get('colourfreetext');
    colour.name = colourfreetext.value;
    colour.id = this.idcounter;
    this.idcounter++;
    if (!this.doesColourAlreadyExistInColourList(colour.name)) {
      this.chosenColours.push(colour);
    } else {
      this.errorMessage = 'Färg finns redan!';
    }
    colourfreetext.reset('');
    this.showColourTextField = false;
  }

  onEnterTheme() {
    let theme = new Theme;
    let themefreetext = this.form.get('themefreetext');
    theme.name = themefreetext.value;
    theme.id = this.idcounter;
    this.idcounter++;
    if (!this.doesThemeAlreadyExistInThemeList(theme.name)) {
      this.chosenThemes.push(theme);
    } else {
      this.errorMessage = 'Tema finns redan!'
    }
    themefreetext.reset('');
    this.showThemeTextField = false;
  }

  onEnterUnderCategory() {
    let underCategory = new UnderCategory();
    let freetext = this.form.get('undercategoryfreetext');
    underCategory.name = freetext.value;
    underCategory.id = this.idcounter;
    this.idcounter++;
    underCategory.mainCategory = this.getMainCategoryById(this.getValueFromForm('maincategory'));
    if (!this.doesUnderCategoryAlreadyExistInUndercategoryList(underCategory.name)) {
      this.chosenUnderCategories.push(underCategory);
    } else {
      this.errorMessage = 'Underkategori finns redan!'
    }
    freetext.reset('');
    this.showUnderCategoryTextfield = false;
  }

  getColourById(id: number): Colour {
    let colour: Colour = null;
    this.colourList.forEach(colourfromlist => {
      if (colourfromlist.id == id) {
        colour = colourfromlist;
      }
    });
    return colour;
  }

  getThemeById(id: number): Theme {
    let theme: Theme = null;
    this.themeList.forEach(themeFromList => {
      if (themeFromList.id == id) {
        theme = themeFromList;
      }
    });
    return theme;
  }

  getMainCategoryById(id: number): MainCategory {
    let category: MainCategory = null;
    this.mainCategoryList.forEach(categoryFromList => {
      if (categoryFromList.id == id) {
        category = categoryFromList;
      }
    });
    return category;
  }

  getUnderCategoryById(id: number): UnderCategory {
    let category: UnderCategory = null;
    this.underCategoryList.forEach(categoryFromList => {
      if (categoryFromList.id == id) {
        category = categoryFromList;
      }
    });
    return category;
  }

  addColour() {
    if (!this.doesColourAlreadyExistInChosenColours(this.form.get('colour').value)) {
      this.chosenColours.push(this.getColourById(this.form.get('colour').value));
    }
  }

  doesColourAlreadyExistInChosenColours(id: number): Boolean {
    let alreadyExist = false;
    if (this.chosenColours.length > 0) {
      this.chosenColours.forEach((c) => {
        if (c.id == id) {
          alreadyExist = true;
        }
      });
    }
    return alreadyExist;
  }

  doesColourAlreadyExistInColourList(name: string): Boolean {
    let alreadyExist = false;
    this.colourList.forEach(x => {
      if (x.name.toLowerCase() == name.toLowerCase()) {
        alreadyExist = true;
      }
    });
    return alreadyExist;
  }

  addTheme() {
    if (!this.doesThemeAlreadyExistInChosenThemes(this.form.get('theme').value)) {
      this.chosenThemes.push(this.getThemeById(this.form.get('theme').value));
    }
  }

  doesThemeAlreadyExistInChosenThemes(id: number): Boolean {
    let alreadyExist = false;
    if (this.chosenThemes.length > 0) {
      this.chosenThemes.forEach((t) => {
        if (t.id == id) {
          alreadyExist = true;
        }
      });
    }
    return alreadyExist;
  }

  doesThemeAlreadyExistInThemeList(name: string): Boolean {
    let alreadyExist = false;
    this.themeList.forEach(x => {
      if (x.name.toLowerCase() == name.toLowerCase()) {
        alreadyExist = true;
      }
    });
    return alreadyExist;
  }

  addUnderCategory() {
    if (!this.doesUnderCategoryAlreadyExistInChosenColours(this.form.get('undercategory').value)) {
      this.chosenUnderCategories.push(this.getUnderCategoryById(this.form.get('undercategory').value));
    }
  }

  doesUnderCategoryAlreadyExistInChosenColours(id: number): Boolean {
    let alreadyExist = false;
    if (this.chosenUnderCategories.length > 0) {
      this.chosenUnderCategories.forEach((u) => {
        if (u.id == id) {
          alreadyExist = true;
        }
      });
    }
    return alreadyExist;
  }

  doesUnderCategoryAlreadyExistInUndercategoryList(name: string): Boolean {
    let alreadyExist = false;
    this.underCategoryList.forEach(x => {
      if (x.name.toLowerCase() == name.toLowerCase()) {
        alreadyExist = true;
      }
    });
    return alreadyExist;
  }

  triggerFileUpload() {
    let element: HTMLElement = document.getElementById('fileupload') as HTMLElement;
    element.click();
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      };
      this.onUpload(event.target.files[0]);
    }
  }

  onUpload(file: any) {
    let formData = new FormData();
    if (!(file.size > 1048576)) {
      if (file.type.match('image.jpg') || file.type.match('image.jpeg') || file.type.match('image.png')) {
        formData.append('name', file);
        // this.garmentService.uploadPicture(formData);
        this.picture = formData;
      } else {
        this.errorMessage = `Vänligen välj en bild av typen .png eller .jpg`;
      }
    } else {
      this.errorMessage = 'Filen överstiger 1MB, vänligen försök med en mindre fil.'
    }
  }

  chooseMainCategory(id: number) {
    this.updatedUnderCategoryList = this.undercategoryPipe.transform(this.underCategoryList, id);
  }

  onChangeMainCategory() {
    this.chosenUnderCategories = [];
    this.chooseMainCategory(this.form.get('maincategory').value);
  }

  checkIfOtherColourOtherwiseAdd() {
    if (this.form.get('colour').value == 'annan') {
      this.showColourTextField = true;
    } else {
      this.addColour();
    }
  }

  checkIfOtherThemeOtherwiseAdd() {
    if (this.form.get('theme').value == 'annan') {
      this.showThemeTextField = true;
    } else {
      this.addTheme();
    }
  }

  checkIfOtherUnderCategoryOtherwiseAdd() {
    if (this.form.get('undercategory').value == 'annan') {
      this.showUnderCategoryTextfield = true;
    } else {
      this.addUnderCategory();
    }
  }

  getValueFromForm(name: string) {
    return this.form.get(name).value;
  }

  removeAttribute(id: number) {
    this.chosenUnderCategories.forEach(x => {
      if (x.id == id) {
        let index = this.chosenUnderCategories.indexOf(x);
        this.chosenUnderCategories.splice(index, 1);
      }
    });
    this.chosenThemes.forEach(x => {
      if (x.id == id) {
        let index = this.chosenThemes.indexOf(x);
        this.chosenThemes.splice(index, 1);
      }
    });
    this.chosenColours.forEach(x => {
      if (x.id == id) {
        let index = this.chosenColours.indexOf(x);
        this.chosenColours.splice(index, 1);
      }
    });
  }

  onSubmit() {
    this.errorMessage = '';
    if (this.form.invalid || this.chosenColours.length < 1 || this.chosenThemes.length < 1 || !this.url) {
      this.errorMessage = 'form is invalid';
      return;
    }
    let garment: Garment = new Garment;
    garment.mainCategory = this.getMainCategoryById(this.getValueFromForm('maincategory'));
    garment.underCategories = this.chosenUnderCategories;
    garment.colours = this.chosenColours;
    garment.themes = this.chosenThemes;

    this.garmentService.addGarment(garment, this.picture);
  }


  ngOnDestroy()
    :
    void {
    if (this.subscription
    ) {
      this.subscription.unsubscribe();
    }
  }
}
