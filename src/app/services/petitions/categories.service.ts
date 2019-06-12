import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreService } from '@services/configuration/core.service';
import { Observable } from 'rxjs';
import { Categori } from '@models/categori';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http:HttpClient, private _core: CoreService) { }

  getCategories(): Observable<any>{
    return this.http.get(`${this._core.urlAPI}categories`, {headers: this._core.headers})
  }
  addCategori(categori: Categori | any): Observable<any>{
    return this.http.post(`${this._core.urlAPI}categories`, categori, { headers: this._core.headers });
  }
  deleteCategori(id_categori: string): Observable<any>{
    return this.http.delete(`${this._core.urlAPI}categories/${id_categori}`, { headers: this._core.headers })
  }
  updateCategori(id_categori: string, categori: Categori | any): Observable<any>{
    return this.http.put(`${this._core.urlAPI}categories/${id_categori}`, categori, { headers: this._core.headers })
  }
  report(report:any): Observable<any>{
    return this.http.post(`${this._core.urlAPI}categories/report`, report, { headers: this._core.headers })
  }
}
