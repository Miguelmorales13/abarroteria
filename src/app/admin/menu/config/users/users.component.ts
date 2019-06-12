import { Component, OnInit } from '@angular/core';
import { GlobalService } from '@services/configuration/global.service';
import { User } from '@models/user';
import { AccessService } from '@services/configuration/access.service';
declare var $:any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  accion: String = "Agregar usuario";
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
    this._global.selectedUser = new User();
    this.edit = false
    this._global.clearPhoto();
    this.accion = "Agregar usuario";
  }
  goDoUser(event): void {
    this._global.selectedUser = Object.assign({}, event.user);
    this.pos = null;
    switch (event.type) {
      case "update":
        this.accion = "Actualizar usuario";
        this.pos = event.pos;
        $("#modalAdd").modal("show");
        this.edit = true;
        break;
      case "view":
        this.accion = "Usuario";
        $("#modalView").modal("show");
        break;
      case "delete":
        this.accion = "Eliminar usuario";
        this.pos = event.pos;
        $("#modalDelete").modal("show");
        break;
      default:
        break;
    }
  }

}
