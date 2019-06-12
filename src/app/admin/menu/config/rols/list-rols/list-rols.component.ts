import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Rol } from '@models/rol';
import { GlobalService } from '@services/configuration/global.service';
import { RolsService } from '@services/petitions/rols.service';
import { HelpersService } from '@services/configuration/helpers.service';
import { AccessService } from '@services/configuration/access.service';

@Component({
  selector: 'app-list-rols',
  templateUrl: './list-rols.component.html',
  styleUrls: ['./list-rols.component.css']
})
export class ListRolsComponent implements OnInit {
rows: Array<any> = [
    { key: "nombre", name: "Nombre" },
    { key: "descripcion", name: "Descripcion" },
    { key: "estatus", name: "Estatus" }
  ];
  noReg = 10;
  typeSearch = "nombre";
  search = "";
  pag: Object = {};
  page: number = 1;
  formOrder: Boolean = true;
  orderBy: String = "";
  petition={
    no:false,
    progress:false
  }
  @Output() public goOrderBy = new EventEmitter();
  @Output() public doRol: EventEmitter<any> = new EventEmitter();
  constructor(
    public _global: GlobalService,
    private _rols: RolsService,
    private _access: AccessService,
    private _helpers: HelpersService
  ) {}

  ngOnInit() {
    if (this._access.accessRolsSection('roles','ver')) {
      this.listRols();
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
  listRols() {
    this.petition.progress=true
    this._rols.getRols().subscribe(
      data => {
        this._global.rols = data ? (data as Rol[]) : [];
        if (this._global.rols.length <= 0) {
          this._helpers.msgInfo("No hay roles registrados");
        } else {
          this.petition.no=true
        }
      },err =>  [this._helpers.msgError(this._helpers.goError(err)),this.petition.progress=false],
      ()=>this.petition.progress=false
    );
  }
  changePage(event): void {
    this.pag = event;
  }
  goDoRol(rol: Rol, type: string, pos: number): void {
    this.doRol.emit({ rol, type, pos });
    
  }
  getCategoriName(categori_id): String {
    let categori = this._global.categories.filter(categori => categori._id == categori_id)
    return categori[0].nombre;
  }

}
