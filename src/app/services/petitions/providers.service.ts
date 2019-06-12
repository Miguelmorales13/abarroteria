import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CoreService } from '@services/configuration/core.service';
import { Provider } from '@models/provider';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  constructor(private http: HttpClient, private _core: CoreService) { }

  getProviders(): Observable<any> {
    return this.http.get(`${this._core.urlAPI}providers`, { headers: this._core.headers })
  }
  addProvider(provider: Provider): Observable<any> {
    return this.http.post(`${this._core.urlAPI}providers`, provider, { headers: this._core.headers });
  }
  deleteProvider(id_provider: string): Observable<any> {
    return this.http.delete(`${this._core.urlAPI}providers/${id_provider}`, { headers: this._core.headers })
  }
  updateProvider(id_provider: string, provider: Provider): Observable<any> {
    return this.http.put(`${this._core.urlAPI}providers/${id_provider}`, provider, { headers: this._core.headers })
  }
  report(report: any): Observable<any> {
    return this.http.post(`${this._core.urlAPI}providers/report`, report, { headers: this._core.headers })
  }
}
