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
    return this.http.get<any>(this.experienceUrl+username);

  }

  getExperienceDetail(id: number){
    return this.http.get<any>(this.experienceUrl+"detail/"+id)
  }

  updateExperience(exp : any){
      return this.http.post<any>(this.experienceUrl+"update", exp);

  }

  deleteExperience(exp : any){
    return this.http.delete<any>(this.experienceUrl+"delete/"+exp.id);

}



}
