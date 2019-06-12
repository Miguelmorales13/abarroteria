import { Component, OnInit } from '@angular/core';
import { GlobalService } from '@services/configuration/global.service';
import { Provider } from '@models/provider';
import { AccessService } from '@services/configuration/access.service';
declare var $:any;
@Component({
  selector: "app-providers",
  templateUrl: "./providers.component.html",
  styleUrls: ["./providers.component.css"]
})
export class ProvidersComponent implements OnInit {
  accion: String = "Agregar proveedor";
  edit: Boolean = false;
  pos: number = null;
  constructor(
    public _global: GlobalService,
    public _access: AccessService
    ) {}

  ngOnInit() {}
  onClose(event) {
    if (event) {
      $("#modalAdd").modal("hide");
      $("#modalDelete").modal("hide");
      this.clear();
    }
  }
  clear(): void {
    this._global.selectedProvider = new Provider();
    this.edit = false;
    this._global.clearPhoto();
    this.accion = "Agregar proveedor";
  }
  goDoProvider(event): void {
    this._global.selectedProvider = Object.assign({}, event.provider);
    this.pos = null;
    switch (event.type) {
      case "update":
        this.accion = "Actualizar proveedor";
        this.pos = event.pos;
        $("#modalAdd").modal("show");
        this.edit = true;
        break;
      case "view":
        this.accion = "Proveedor";
        $("#modalView").modal("show");
        break;
      case "delete":
        this.accion = "Eliminar proveedor";
        this.pos = event.pos;
        $("#modalDelete").modal("show");
        break;
      default:
        break;
    }
  }
}
