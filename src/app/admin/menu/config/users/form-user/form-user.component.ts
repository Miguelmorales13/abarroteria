import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { User } from '@models/user';
import { GlobalService } from '@services/configuration/global.service';
import { HelpersService } from '@services/configuration/helpers.service';
import { UsersService } from '@services/petitions/users.service';
import { NgForm } from '@angular/forms';
import { RolsService } from '@services/petitions/rols.service';
import { Rol } from '@models/rol';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {
  @Input() edit: Boolean = false;
  @Output() clear: EventEmitter<any> = new EventEmitter();
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() added: EventEmitter<any> = new EventEmitter();
  petition=false
  constructor(
    public _global: GlobalService,
    private _helpers: HelpersService,
    private _user: UsersService,
    private _rols: RolsService
  ) {}

  ngOnInit() {
    if (this._global.rols.length<=0) {
      this.listRols();
    }
  }
  onSubmit(formUser: NgForm): void {
    if (!formUser.valid) {
      return this._helpers.msgInfo( "Verifique sus datos");
    }
    this.petition=true
    if (!this._global.selectedUser._id) {
      this._user.addUser(formUser.value).subscribe(
        data => {
          this._helpers.msgSuccess("Usuario registrado");
          this._global.users.unshift(data.usuario as User);
          this.clear.emit(true);
          // this.added.emit(data.usera)
        },
        err => [this._helpers.msgError(this._helpers.goError(err)),this.petition=false],
        ()=> this.petition=false
      );
      } else {
        this._user
          .updateUser(this._global.selectedUser._id, formUser.value)
          .subscribe(
            data => {
              this._helpers.msgSuccess("Usuario actualizado");
              this._global.users = this._global.users.filter(
                cat => cat._id != this._global.selectedUser._id
              );
              this._global.users.push(data.usuario as User);
              this.clear.emit(true);
              // this.updated.emit(data.usera);
            },
            err => [this._helpers.msgError(this._helpers.goError(err)),this.petition=false],
            ()=> this.petition=false
          );
    }
  }
  listRols() {
    this._rols.getRols().subscribe(
      data => {
        this._global.rols = data ? (data as Rol[]) : [];
        if (this._global.rols.length <= 0) {
          this._helpers.msgInfo("No hay roles registrados");
        } else {
        }
      },err =>  [this._helpers.msgError(this._helpers.goError(err))]
    );
  }
  cancel() {
    this.clear.emit(true);
  }

}
