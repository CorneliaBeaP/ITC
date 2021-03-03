import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  url: String;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/api/attributes';
  }

  getAllMainCategories() {
    return this.http.get(this.url + '/mcategories').pipe(map(data => {
      let data2 = JSON.stringify(data);
      return JSON.parse(data2);
    }));
  }

  getAllUnderCategories() {
    return this.http.get(this.url + '/ucategories').pipe(map(data => {
      let data2 = JSON.stringify(data);
      return JSON.parse(data2);
    }));
  }

  getAllColours() {
    return this.http.get(this.url + '/colours').pipe(map(data => {
      let data2 = JSON.stringify(data);
      return JSON.parse(data2);
    }));
  }

  getAllThemes(){
    return this.http.get(this.url + '/themes').pipe(map(data => {
      let data2 = JSON.stringify(data);
      return JSON.parse(data2);
    }))
  }
}
