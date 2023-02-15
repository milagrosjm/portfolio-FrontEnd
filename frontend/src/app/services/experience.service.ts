import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  
  constructor(private http: HttpClient) { }

  experienceUrl = environment.ApiUrl + '/experience/';

  getAllExperienceFromUser(username : any) {
    this.experienceUrl+=username
    return this.http.get<any>(this.experienceUrl);

  }


}
