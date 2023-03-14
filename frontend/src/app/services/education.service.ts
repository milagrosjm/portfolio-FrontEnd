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
    return this.http.get<any>(this.educationUrl+username);

  }

  getEducationDetail(id: number){
    return this.http.get<any>(this.educationUrl+"detail/"+id)
  }

  updateEducation(ed : any){
      return this.http.post<any>(this.educationUrl+"update", ed);

  }

  deleteEducation(ed : any){
    return this.http.delete<any>(this.educationUrl+"delete/"+ed.id);}

}
