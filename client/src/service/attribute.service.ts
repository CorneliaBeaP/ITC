import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

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
    this.http.get(this.url + '/attributes/mcategories', requestOptions).subscribe((data) => {
      console.log(data);
      }
    )
  }
}
