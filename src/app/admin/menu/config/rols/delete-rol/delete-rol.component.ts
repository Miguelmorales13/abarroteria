import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GlobalService } from '@services/configuration/global.service'
import { RolsService } from '@services/petitions/rols.service';
import { HelpersService } from '@services/configuration/helpers.service';

@Component({
  selector: 'app-delete-rol',
  templateUrl: './delete-rol.component.html',
  styleUrls: ['./delete-rol.component.css']
})
export class DeleteRolComponent implements OnInit {
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  petition=false;
  constructor(public _global: GlobalService, private _roles: RolsService, private _helpers: HelpersService) { }

  ngOnInit() {
  }
  confirm(): void {
    this.petition=true
    this._roles.deleteRol(this._global.selectedRol._id).subscribe(
      data => {
        this._helpers.msgSuccess("Rol eliminado");
        this._global.rols = this._global.rols.filter(
          rol => rol._id != this._global.selectedRol._id
        );
        this.cancel.emit(true);
      },
      err => [this._helpers.msgError(this._helpers.goError(err)),this.petition=false],
      ()=> this.petition=false
    );
  }
  cancelDelete(): void {
    this.cancel.emit(true);
  }

}
