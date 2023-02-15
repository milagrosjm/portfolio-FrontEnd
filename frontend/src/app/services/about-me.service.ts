import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AboutMeService {

  constructor(private http: HttpClient) { }

  aboutMeUrl = environment.ApiUrl + '/user/';
  
  getAboutMeText(username : any) {
    this.aboutMeUrl+=username
    return this.http.get<any>(this.aboutMeUrl);

  }
}
