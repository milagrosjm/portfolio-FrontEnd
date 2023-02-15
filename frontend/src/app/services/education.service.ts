import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  constructor(private http: HttpClient) { }

  educationUrl = environment.ApiUrl + '/education/';

  getAllEducationFromUser(username : any) {
    this.educationUrl+=username
    return this.http.get<any>(this.educationUrl);

  }

}
