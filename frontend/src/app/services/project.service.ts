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
    return this.http.get<any>(this.projectUrl+username);
  }

  getProjectDetail(id: number){
    return this.http.get<any>(this.projectUrl+"detail/"+id)
  }

  updateProject(pr : any){
      return this.http.post<any>(this.projectUrl+"update", pr);

  }

  deleteProject(pr : any){
    return this.http.delete<any>(this.projectUrl+"delete/"+pr.id);

}

  

}
