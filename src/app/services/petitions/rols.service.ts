import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreService } from '@services/configuration/core.service';
import { Observable } from 'rxjs';
import { Rol } from '@models/rol';

@Injectable({
  providedIn: 'root'
})
export class RolsService {

  constructor(private http: HttpClient, private _core: CoreService) { }

  getRols(): Observable<any> {
    return this.http.get(`${this._core.urlAPI}rols`, { headers: this._core.headers })
  }
  addRol(rol: Rol): Observable<any> {
    return this.http.post(`${this._core.urlAPI}rols`, rol, { headers: this._core.headers });
  }
  deleteRol(id_rol: string): Observable<any> {
    return this.http.delete(`${this._core.urlAPI}rols/${id_rol}`, { headers: this._core.headers })
  }
  updateRol(id_rol: string, rol: Rol): Observable<any> {
    return this.http.put(`${this._core.urlAPI}rols/${id_rol}`, rol, { headers: this._core.headers })
  }
  report(report: any): Observable<any> {
    return this.http.post(`${this._core.urlAPI}providers/report`, report, { headers: this._core.headers })
  }
}
