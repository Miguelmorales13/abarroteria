import { Component, OnInit } from '@angular/core';
import { Client } from '@models/client';
import { GlobalService } from '@services/configuration/global.service';
import { AccessService } from '@services/configuration/access.service';
declare var $:any;
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  accion: String = "Agregar usuario";
  edit: Boolean = false;
  pos: number = null;
  constructor(
    public _global: GlobalService,
    public _access: AccessService
    ) { }

  ngOnInit() { }
  onClose(event) {
    if (event) {
      $("#modalAdd").modal("hide");
      $("#modalDelete").modal("hide");
      this.clear();

    }
  }
  clear(): void {
    this._global.selectedClient = new Client();
    this.edit = false
    this._global.clearPhoto();
    this.accion = "Agregar usuario";
  }
  goDoClient(event): void {
    this._global.selectedClient = Object.assign({}, event.client);
    this.pos = null;
    switch (event.type) {
      case "update":
        this.accion = "Actualizar cliente";
        this.pos = event.pos;
        $("#modalAdd").modal("show");
        this.edit = true;
        break;
      case "view":
        this.accion = "Cliente";
        $("#modalView").modal("show");
        break;
      case "delete":
        this.accion = "Eliminar cliente";
        this.pos = event.pos;
        $("#modalDelete").modal("show");
        break;
      default:
        break;
    }
  }

}
