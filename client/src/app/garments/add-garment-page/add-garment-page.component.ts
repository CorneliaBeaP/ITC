import {Component, OnDestroy, OnInit} from '@angular/core';
import {GarmentService} from "../../../service/garment.service";
import {AttributeService} from "../../../service/attribute.service";
import {Subscription} from "rxjs";
import {MainCategory} from "../../classes/main-category";
import {UnderCategory} from "../../classes/under-category";
import {UndercategoryPipe} from "../../pipes/undercategory.pipe";
import {Colour} from "../../classes/colour";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Theme} from "../../classes/theme";

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
  addAnotherColour = false;


  constructor(private garmentService: GarmentService,
              private attributeService: AttributeService,
              private undercategoryPipe: UndercategoryPipe,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getAllMainCategories();
    this.getAllUnderCategories();
    this.getAllColours();
    this.getAllThemes();
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      undercategory: ['', Validators.required],
      colour: ['', Validators.required],
      theme: ['', Validators.required],
      maincategory: ['', Validators.required]
    });
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

  triggerFileUpload() {
    let element: HTMLElement = document.getElementById('fileupload') as HTMLElement;
    element.click();
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }

  onUpload(file: any) {
    //TODO: fortsätt
    let formData = new FormData();
    if (!(file.size > 1048576)) {
      if (file.type.match('image.jpg') || file.type.match('image.jpeg') || file.type.match('image.png')) {
        formData.append('name', file);
        this.garmentService.uploadProfilePicture(formData);
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

  onChange() {
    this.chooseMainCategory(this.form.get('maincategory').value)
  }

  onSubmit() {
    console.log('Submitted');
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
