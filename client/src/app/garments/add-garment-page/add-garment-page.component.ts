import {Component, OnInit} from '@angular/core';
import {GarmentService} from "../../../service/garment.service";
import {AttributeService} from "../../../service/attribute.service";

@Component({
  selector: 'app-add-garment-page',
  templateUrl: './add-garment-page.component.html',
  styleUrls: ['./add-garment-page.component.scss']
})
export class AddGarmentPageComponent implements OnInit {

  url: string | ArrayBuffer;
  errorMessage: string;


  constructor(private garmentService: GarmentService, private attributeService: AttributeService) {
    attributeService.getAllMainCategories();
  }

  ngOnInit(): void {
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
}
