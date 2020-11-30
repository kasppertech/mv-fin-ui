import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestLogin } from '../model/requestLogin';
import { ResponseLogin } from '../model/responseLogin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }



  public doLogin(requestLogin: RequestLogin): Observable<ResponseLogin> {
    return this.httpClient.post<ResponseLogin>('http://localhost:8080/mv-fin-app/auth/token', requestLogin);
  }

}