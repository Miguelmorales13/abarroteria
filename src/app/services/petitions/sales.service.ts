import { Injectable } from '@angular/core';
import { CoreService } from '@services/configuration/core.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sale } from '@models/sale';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http: HttpClient, private _core: CoreService) { }

  getSales(): Observable<any> {
    return this.http.get(`${this._core.urlAPI}sales`, { headers: this._core.headers })
  }
  addSale(sale: Sale): Observable<any> {
    return this.http.post(`${this._core.urlAPI}sales`, sale, { headers: this._core.headers });
  }
  deleteSale(id_sale: string): Observable<any> {
    return this.http.delete(`${this._core.urlAPI}sales/${id_sale}`, { headers: this._core.headers })
  }
  updateSale(id_sale: string, sale: Sale): Observable<any> {
    return this.http.put(`${this._core.urlAPI}sales/${id_sale}`, sale, { headers: this._core.headers })
  }
  report(report: any): Observable<any> {
    return this.http.post(`${this._core.urlAPI}sales/report`, report, { headers: this._core.headers })
  }
  saleslastWeek(): Observable<any> {
    return this.http.post(`${this._core.urlAPI}sales/last-week`, { headers: this._core.headers })
  }

}
