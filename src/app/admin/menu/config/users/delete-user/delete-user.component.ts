import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GlobalService } from '@services/configuration/global.service';
import { UsersService } from '@services/petitions/users.service';
import { HelpersService } from '@services/configuration/helpers.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  petition=false
  constructor(public _global: GlobalService, private _users: UsersService, private _helpers: HelpersService) { }

  ngOnInit() {
  }
  confirm(): void {
    this.petition=true
    this._users.deleteUser(this._global.selectedUser._id).subscribe(
      data => {
        this._helpers.msgSuccess("Usuario eliminado");
        this._global.users = this._global.users.filter(
          user => user._id != this._global.selectedUser._id
        );
        this.cancel.emit(true);
      },
      err => [this._helpers.msgError(this._helpers.goError(err)),this.petition=false],
      () => this.petition=false
    );
  }
  cancelDelete(): void {
    this.cancel.emit(true);
  }

}
