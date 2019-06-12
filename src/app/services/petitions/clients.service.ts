import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CoreService } from '@services/configuration/core.service';
import { Client } from '@models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient, private _core: CoreService) { }

  getClients(): Observable<any> {
    return this.http.get(`${this._core.urlAPI}clients`, { headers: this._core.headers })
  }
  addClient(client: Client): Observable<any> {
    return this.http.post(`${this._core.urlAPI}clients`, client, { headers: this._core.headers });
  }
  deleteClient(id_client: string): Observable<any> {
    return this.http.delete(`${this._core.urlAPI}clients/${id_client}`, { headers: this._core.headers })
  }
  updateClient(id_client: string, client: Client): Observable<any> {
    return this.http.put(`${this._core.urlAPI}clients/${id_client}`, client, { headers: this._core.headers })
  }
  report(report: any): Observable<any> {
    return this.http.post(`${this._core.urlAPI}clients/report`, report, { headers: this._core.headers })
  }
}
