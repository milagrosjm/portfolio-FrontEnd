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
    return this.http.get<any>(this.skillUrl+username);

  }

  getSkillDetail(id: number){
    return this.http.get<any>(this.skillUrl+"detail/"+id)
  }

  updateSkill(sk : any){
      return this.http.post<any>(this.skillUrl+"update", sk);

  }

  deleteSkill(sk : any){
    return this.http.delete<any>(this.skillUrl+"delete/"+sk.id);
  }
}
