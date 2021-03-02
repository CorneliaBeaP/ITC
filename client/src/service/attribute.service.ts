import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  url: String;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/api';
  }

  getAllMainCategories() {
    return this.http.get(this.url + '/attributes/mcategories').pipe(map(data => {
      let data2 = JSON.stringify(data);
      return JSON.parse(data2);
    }));
  }

  getAllUnderCategories() {
    return this.http.get(this.url + '/attributes/ucategories').pipe(map(data => {
      let data2 = JSON.stringify(data);
      return JSON.parse(data2);
    }));
  }
}
