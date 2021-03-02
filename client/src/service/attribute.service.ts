import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  url: String;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/api';
  }

  getAllMainCategories(){
    this.http.get(this.url + '/mcategories').subscribe((data) => {
      console.log(data);
      }
    )
  }
}
