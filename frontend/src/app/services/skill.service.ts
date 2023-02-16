import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private http: HttpClient) { }

  skillUrl = environment.ApiUrl + '/skill/';

  getSkillsFromUser(username : any) {
    this.skillUrl+=username
    return this.http.get<any>(this.skillUrl);

  }
}
