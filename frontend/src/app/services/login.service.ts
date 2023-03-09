import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map} from 'rxjs/operators';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  loginUrl = environment.ApiUrl + '/user/login';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  
  getUser(formCopy : any) {
    return this.http.post<any>(this.loginUrl, formCopy);
  }
}
