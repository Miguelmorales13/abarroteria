import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GlobalService } from '@services/configuration/global.service';
import { UsersService } from '@services/petitions/users.service';
import { HelpersService } from '@services/configuration/helpers.service';
import { User } from '@models/user';
import { AccessService } from '@services/configuration/access.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  rows: Array<any> = [
    { key: "nombre", name: "Nombre" },
    { key: "telefono", name: "Telefono" },
    { key: "rol.nombre", name: "Rol" },
    { key: "estatus", name: "Estatus" }
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
  @Output() public doUser: EventEmitter<any> = new EventEmitter();
  constructor(
    public _global: GlobalService,
    private _users: UsersService,
    private _access: AccessService,
    private _helpers: HelpersService
  ) { }

  ngOnInit() {
    if (this._access.accessRolsSection('usuarios','ver')) {
      this.listUsers();
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
  listUsers() {
    this.petition.progress=true
    this._users.getUsers().subscribe(
      data => {
        this._global.users = data ? (data as User[]) : [];
        if (this._global.users.length <= 0) {
          this._helpers.msgInfo("No hay usuarios registrados");
        }else{
          this.petition.no=true
        }
      },
      err => [this._helpers.msgError(this._helpers.goError(err)),this.petition.progress=false],
      ()=> this.petition.progress=false
    );
  }
  changePage(event): void {
    this.pag = event;
  }
  goDoUser(user: User, type: string, pos: number): void {
    this.doUser.emit({ user, type, pos });
  }

}
