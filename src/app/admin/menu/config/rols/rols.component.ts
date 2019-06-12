import { Component, OnInit } from '@angular/core';
import { GlobalService } from '@services/configuration/global.service';
import { Rol } from '@models/rol';
import { Subcategori } from '@models/subcategori';
import { AccessService } from '@services/configuration/access.service';
declare var $:any;
@Component({
  selector: 'app-rols',
  templateUrl: './rols.component.html',
  styleUrls: ['./rols.component.css']
})
export class RolsComponent implements OnInit {
  accion: String = "Agregar rol";
  edit: Boolean = false;
  pos: number = null;
  constructor(
    public _global: GlobalService,
    private _access: AccessService
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
    this._global.selectedRol = new Rol();
    this.edit = false;
    this._global.clearPhoto();
    this.accion = "Agregar rol";
  }
  goDoRol(event): void {
    this._global.selectedRol = Object.assign({}, event.rol);
    this.pos = null;
    switch (event.type) {
      case "update":
        this.accion = "Actualizar rol";
        this.pos = event.pos;
        $("#modalAdd").modal("show");
        this.edit = true;
        this._global.img =
          this._global.urlApi + "roles/" + event.rol.foto;
        break;
      case "view":
        this.accion = "Rol";
        $("#modalView").modal("show");
        break;
      case "delete":
        this.accion = "Eliminar rol";
        this.pos = event.pos;
        $("#modalDelete").modal("show");
        break;
      default:
        break;
    }
  }

}
