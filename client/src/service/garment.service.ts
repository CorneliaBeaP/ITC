import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GarmentService {
  url: string;

  constructor(
    // private http: HttpClient
  ) {
    this.url = 'http://localhost:8080/api';
  }

  uploadProfilePicture(formData: FormData) {
    // this.http.post(this.url + `/garment`, formData).subscribe();
  }
}
