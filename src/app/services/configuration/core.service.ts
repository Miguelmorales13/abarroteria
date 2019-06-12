import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CoreService {
  // urlAPI: String = 'https://afternoon-fortress-91959.herokuapp.com/api/';
  urlAPI: String = '/api/';
  // urlAPI: String = "http://backend.test/api/";
  headers = new HttpHeaders().set('Authorization', `${this.getToken()}`);
  constructor(private http: HttpClient) {
    this.headers.append('Acept', 'aplication/json');
    this.headers.append('ContentType', 'aplication/json');
  }
  getToken(): String {
    return localStorage.getItem('token');
  }
  getCount(): Observable<any>{
    return this.http.get(`${this.urlAPI}global/count`, {headers: this.headers})
  }
}
