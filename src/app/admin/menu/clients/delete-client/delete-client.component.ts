import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { GlobalService } from '@services/configuration/global.service';
import { ClientsService } from '@services/petitions/clients.service';
import { HelpersService } from '@services/configuration/helpers.service';

@Component({
  selector: "app-delete-client",
  templateUrl: "./delete-client.component.html",
  styleUrls: ["./delete-client.component.css"]
})
export class DeleteClientComponent implements OnInit {
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  petition=false;
  constructor(
    public _global: GlobalService,
    private _clients: ClientsService,
    private _helpers: HelpersService
  ) {}

  ngOnInit() {}
  confirm(): void {
    this.petition=true;
    this._clients.deleteClient(this._global.selectedClient._id).subscribe(
      data => {
        this._helpers.msgSuccess("Cliente eliminado");
        this._global.clients = this._global.clients.filter(
          client => client._id != this._global.selectedClient._id
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
