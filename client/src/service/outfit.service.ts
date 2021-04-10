import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Outfit} from "../app/classes/outfit";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OutfitService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/api/outfit';
  }

  getAllOutfits() {
    return this.http.get(`${this.url}/all`).pipe(map(data => {
      let data2 = JSON.stringify(data);
      return JSON.parse(data2);
    }));
  }

  saveOutfit(outfit: Outfit) {
    return this.http.post(`${this.url}`, outfit).subscribe();
  }
}
