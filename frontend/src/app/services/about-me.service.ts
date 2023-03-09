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
    return this.http.get<any>(this.aboutMeUrl+username);

  }

  updateAboutMe(formCopy: any){
    return this.http.post<any>(this.aboutMeUrl+"update/aboutMe", formCopy);
  }
}
