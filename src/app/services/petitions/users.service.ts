import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreService } from '@services/configuration/core.service';
import { User } from '@models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private _core: CoreService) { }

  getUsers(): Observable<any> {
    return this.http.get(`${this._core.urlAPI}users`, { headers: this._core.headers })
  }
  addUser(user: User | any): Observable<any> {
    return this.http.post(`${this._core.urlAPI}users`, user, { headers: this._core.headers });
  }
  deleteUser(id_user: string): Observable<any> {
    return this.http.delete(`${this._core.urlAPI}users/${id_user}`, { headers: this._core.headers })
  }
  updateUser(id_user: string, user: User | any): Observable<any> {
    return this.http.put(`${this._core.urlAPI}users/${id_user}`, user, { headers: this._core.headers })
  }
  report(report: any): Observable<any> {
    return this.http.post(`${this._core.urlAPI}users/report`, report, { headers: this._core.headers })
  }
  updatePass(pass: any): Observable<any> {
    return this.http.put(`${this._core.urlAPI}users/pass/${pass.user}`, pass, { headers: this._core.headers })
  }
}
