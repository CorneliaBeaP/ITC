import { Injectable } from '@angular/core';
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

  getAllMainCategories(){
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*'
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
   return this.http.get(this.url + '/attributes/mcategories', requestOptions).pipe(map(data =>{
      let data2 = JSON.stringify(data);
      return JSON.parse(data2);
    }));
  }
}
