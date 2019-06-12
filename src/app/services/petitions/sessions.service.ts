import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '@models/login';
import { CoreService } from '@services/configuration/core.service';
import { User } from '@models/user';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {
  login: Login = new Login();
  // iss: String = "http://backend.test/api/auth/login";
  iss: String = 'http://loclahost:3000/api/auth';
  constructor(private http: HttpClient, private _core: CoreService) {}

  goLogin(login: Login): Observable<any> {
    return this.http.post(`${this._core.urlAPI}auth`, login);
  }
  // goLogout(): Observable<any> {
  //   return this.http.post(`${this._core.urlAPI}auth/logout`, {
  //     token: this.getToken()
  //   });
  // }

  setToken(token) {
    localStorage.setItem('token', token);
  }
  getToken(): String {
    return localStorage.getItem('token');
  }
  removeToken() {
    localStorage.removeItem('token');
  }
  isValid(token) {
    if (token) {
      const payload: any = this.payload(token);
      if (payload) {
        return payload.iss === this.iss ? true : false;
      }
    }
    return false;
  }
  verifySession(token): boolean{
    const payload: any = this.payload(token);
    if (payload) {
      return (payload.data as User) ? true : false;
    }
    return false
  }
  payload(token): String {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }
  decode(payload) {
    return JSON.parse(atob(payload));
  }
  setSession(token: any) {
    const payload: any = this.payload(token);
    if (payload) {
      if (payload.data as User){
        localStorage.setItem("user", JSON.stringify(payload.data));
      }
    }
  }
  getSession(): any {
    return JSON.parse(localStorage.getItem('user'));
  }
  getAnyUser(type){
    const user= JSON.parse(localStorage.getItem('user'));
    const evaluacion=`user.${type}`
    return eval(evaluacion)
  }
  deleteSession() {
    localStorage.removeItem('user');
  }

}
