import { Injectable } from '@angular/core';
import { CoreService } from '@services/configuration/core.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subcategori } from '@models/subcategori';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService {

  constructor(private http: HttpClient, private _core: CoreService) { }

  getSubcategories(): Observable<any> {
    return this.http.get(`${this._core.urlAPI}subcategories`, { headers: this._core.headers })
  }
  addSubcategori(subcategori: any): Observable<any> {
    return this.http.post(`${this._core.urlAPI}subcategories`, subcategori, { headers: this._core.headers });
  }
  deleteSubcategori(id_subcategori: string): Observable<any> {
    return this.http.delete(`${this._core.urlAPI}subcategories/${id_subcategori}`, { headers: this._core.headers })
  }
  updateSubcategori(id_subcategori: string, subcategori: any): Observable<any> {
    return this.http.put(`${this._core.urlAPI}subcategories/${id_subcategori}`, subcategori, { headers: this._core.headers })
  }
  report(report: any): Observable<any> {
    return this.http.post(`${this._core.urlAPI}subcategories/report`, report, { headers: this._core.headers })
  }
}
