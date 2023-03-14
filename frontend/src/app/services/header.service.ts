import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry} from 'rxjs/operators';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private http: HttpClient) { }

  headerUrl = environment.ApiUrl + '/user/';
  
  getHeader(username : any) {
    return this.http.get<any>(this.headerUrl+username);

  }

  updateHeaderName(formCopy: any){
    return this.http.post<any>(this.headerUrl+"update/headerName", formCopy);
  }

  updateHeaderDegree(formCopy: any){
    return this.http.post<any>(this.headerUrl+"update/headerDegree", formCopy);
  }

  
}
