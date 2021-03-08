import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Garment} from "../app/classes/garment";
import {Itcresponse} from "../app/classes/itcresponse";
import {multicast} from "rxjs/operators";
import {log} from "util";

@Injectable({
  providedIn: 'root'
})
export class GarmentService {
  url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = 'http://localhost:8080/api';
  }

  uploadPicture(formData: FormData, id: number) {
    console.log(id);
    console.log(formData);
    this.http.post(this.url + `/garment/picture/${id}`, formData).subscribe();
  }

  addGarment(garment: Garment, picture: FormData) {
    console.log('addGarment');
    console.log(garment.mainCategory.name);
    console.log(garment.colours);
    console.log(picture.get('name'));
    // this.http.post(this.url +`/garment`, [garment, picture]).subscribe(data => {
    //   console.log(data);
    // });
    this.http.post(this.url + `/garment`,  garment).subscribe((data:Itcresponse) => {
      console.log(data.message);
      this.uploadPicture(picture, parseInt(data.message));
    });
  }
}
