import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreService } from '@services/configuration/core.service';
import { Observable } from 'rxjs';
import { Product } from '@models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient, private _core: CoreService) { }

  getProducts(): Observable<any> {
    return this.http.get(`${this._core.urlAPI}products`, { headers: this._core.headers })
  }
  getHome(): Observable<any> {
    return this.http.get(`${this._core.urlAPI}global/homeProducts`, { headers: this._core.headers })
  }
  addProduct(product:any): Observable<any> {
    return this.http.post(`${this._core.urlAPI}products`, product, { headers: this._core.headers });
  }
  deleteProduct(id_product: string): Observable<any> {
    return this.http.delete(`${this._core.urlAPI}products/${id_product}`, { headers: this._core.headers })
  }
  updateProduct(id_product: string, product: any): Observable<any> {
    return this.http.put(`${this._core.urlAPI}products/${id_product}`, product, { headers: this._core.headers })
  }
  report(report: any): Observable<any> {
    return this.http.post(`${this._core.urlAPI}products/report`, report, { headers: this._core.headers })
  }
}
