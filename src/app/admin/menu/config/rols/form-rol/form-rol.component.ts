import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { GlobalService } from '@services/configuration/global.service';
import { HelpersService } from '@services/configuration/helpers.service';
import { NgForm } from '@angular/forms';
import { Rol } from '@models/rol';
import { RolsService } from '@services/petitions/rols.service';

@Component({
  selector: "app-form-rol",
  templateUrl: "./form-rol.component.html",
  styleUrls: ["./form-rol.component.css"]
})
export class FormRolComponent implements OnInit {
  @Input() edit: Boolean = false;
  @Output() clear: EventEmitter<any> = new EventEmitter();
  activeCheked:any=false;
  tipo:string ='';
  petition=false
  constructor(
    public _global: GlobalService,
    private _helpers: HelpersService,
    private _rols: RolsService
  ) {}

  ngOnInit() {}
  onSubmit(formRol: NgForm): void {
    if (!formRol.valid) return this._helpers.msgInfo("Verifique sus datos")
    this.petition=true
    if (!this._global.selectedRol._id) {
      this._rols.addRol(this._global.selectedRol).subscribe(
        data => {
          this._helpers.msgSuccess("Rol registrado");
          this._global.rols.unshift(data.rol as Rol);
          this.clear.emit(true);
          // this.added.emit(data.rola)
        },
        err => [this._helpers.msgError(this._helpers.goError(err)),this.petition=false],
        ()=>this.petition=false
      );
    } else {
      this._rols
        .updateRol(this._global.selectedRol._id, this._global.selectedRol)
        .subscribe(
          data => {
            this._helpers.msgSuccess("Rol actualizado");
            this._global.rols = this._global.rols.filter(
              rol => rol._id != this._global.selectedRol._id
            );
            this._global.rols.push(data.rol as Rol);
            this.clear.emit(true);
            // this.updated.emit(data.rola);
          },
          err => [this._helpers.msgError(this._helpers.goError(err)),this.petition=false],
          ()=>this.petition=false
        );
    }
  }
  cancel() {
    this.clear.emit(true);
  }
  goActiveShitch(type: string,val): void{
    const centencia = `
    this._global.selectedRol.permisos.usuarios.${type}= ${val};
    this._global.selectedRol.permisos.clientes.${type}= ${val};
    this._global.selectedRol.permisos.categorias.${type}= ${val};
    this._global.selectedRol.permisos.subcategorias.${type}= ${val};
    this._global.selectedRol.permisos.roles.${type}= ${val};
    this._global.selectedRol.permisos.proveedores.${type}= ${val};
    this._global.selectedRol.permisos.productos.${type}= ${val};
    this._global.selectedRol.permisos.ventas.${type}= ${val};
    `;
    eval(centencia);
  }
}
