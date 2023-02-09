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
    this.headerUrl+=username
    console.log(this.headerUrl);
    const alhgo = this.http.get<any>(this.headerUrl);
    console.log(alhgo);
    return alhgo;
  }
}
