import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  projectUrl = environment.ApiUrl + '/project/';

  getAllProjectsFromUser(username : any) {
    this.projectUrl+=username
    return this.http.get<any>(this.projectUrl);

  }
}
