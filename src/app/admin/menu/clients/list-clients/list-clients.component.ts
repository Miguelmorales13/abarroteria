import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { GlobalService } from '@services/configuration/global.service';
import { ClientsService } from '@services/petitions/clients.service';
import { HelpersService } from '@services/configuration/helpers.service';
import { Client } from '@models/client';
import { AccessService } from '@services/configuration/access.service';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css']
})
export class ListClientsComponent implements OnInit {
  rows: Array<any> = [
    { key: "nombre", name: "Nombre" },
    { key: "telefono", name: "Telefono" },
    { key: "direccion", name: "Dirección" }
  ];
  noReg = 10;
  typeSearch = "nombre";
  search = "";
  pag: Object = {};
  page: number = 1;
  formOrder: Boolean = true;
  orderBy: String = '';
  petition={
    no:false,
    progress:false
  }
  @Output() public goOrderBy = new EventEmitter();
  @Output() public doClient: EventEmitter<any> = new EventEmitter();
  constructor(
    public _global: GlobalService,
    private _clients: ClientsService,
    private _access: AccessService,
    private _helpers: HelpersService
  ) { }

  ngOnInit() {
    if (this._access.accessRolsSection('clientes','ver')) {
      this.listClients();
    }
    this.orderBy = this.rows[0].key;
  }
  order(key: String) {
    if (key != this.orderBy) {
      this.orderBy = key;
    }
    this.formOrder = !this.formOrder;
    // this.goOrderBy.emit({element:key,order:this.formOrder})
  }
  listClients() {
    this.petition.progress=true
    this._clients.getClients().subscribe(
      data => {
        this._global.clients = data ? (data as Client[]) : [];
        if (this._global.clients.length <= 0) {
          this._helpers.msgInfo("No hay clientes registrados");
        }else{
          this.petition.no=true
        }
      },
      err => [this._helpers.msgError(this._helpers.goError(err)),this.petition.progress=false],
      ()=>this.petition.progress=false
    );
  }
  changePage(event): void {
    this.pag = event;
  }
  goDoClient(client: Client, type: string, pos: number): void {
    this.doClient.emit({ client, type, pos });
  }

}
