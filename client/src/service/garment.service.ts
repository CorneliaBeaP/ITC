import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Garment} from "../app/classes/garment";
import {Itcresponse} from "../app/classes/itcresponse";
import {map, multicast} from "rxjs/operators";
import {log} from "util";

@Injectable({
  providedIn: 'root'
})
export class GarmentService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/api/garment';
  }

  uploadPicture(formData: FormData, id: number) {
    this.http.post(this.url + `/picture/${id}`, formData).subscribe();
  }

  addGarment(garment: Garment, picture: FormData) {
    this.http.post(this.url, garment).subscribe((data: Itcresponse) => {
      this.uploadPicture(picture, parseInt(data.message));
    });
  }

  getAllGarments() {
    return this.http.get(this.url + `s`).pipe(map(data => {
      let data2 = JSON.stringify(data);
      return JSON.parse(data2);
    }));
  }

  getPicture(id: number) {
    const headers = new HttpHeaders().set('Content-Type', 'blob');
    return this.http.get(this.url + `/picture/${id}`, {headers, responseType: "blob"}).pipe(map(data => {
      return data;
    }));
  }

  removeGarment(id: number) {
    return this.http.get(`${this.url}/remove/${id}`).subscribe();
  }

  updateGarment(garment: Garment) {
    return this.http.put(this.url, garment).subscribe();
  }
}
