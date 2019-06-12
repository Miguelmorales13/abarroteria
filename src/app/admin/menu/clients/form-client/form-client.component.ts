import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalService } from '@services/configuration/global.service';
import { HelpersService } from '@services/configuration/helpers.service';
import { ClientsService } from '@services/petitions/clients.service';
import { NgForm } from '@angular/forms';
import { Client } from '@models/client';

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.css']
})
export class FormClientComponent implements OnInit {
  @Input() edit: Boolean = false;
  @Output() clear: EventEmitter<any> = new EventEmitter();
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() added: EventEmitter<any> = new EventEmitter();
  petition=false
  constructor(
    public _global: GlobalService,
    private _helpers: HelpersService,
    private _client: ClientsService
  ) { }

  ngOnInit() {}
  onSubmit(formClient: NgForm): void {
    if (!formClient.valid) {
      return this._helpers.msgInfo("Verifique sus datos");
    }
    this.petition=true
    if (!this._global.selectedClient._id) {
      this._client.addClient(formClient.value).subscribe(
        data => {
          this._helpers.msgSuccess("Cliente registrado");
          this._global.clients.unshift(data.cliente as Client);
          this.clear.emit(true);
        },
        err => [this._helpers.msgError(this._helpers.goError(err)),this.petition=false],
        ()=> this.petition=false
      );
    } else {
      this._client
        .updateClient(this._global.selectedClient._id, formClient.value)
        .subscribe(
          data => {
            this._helpers.msgSuccess("Cliente actualizado");
            this._global.clients = this._global.clients.filter(
              cat => cat._id != this._global.selectedClient._id
            );
            this._global.clients.push(data.cliente as Client);
            this.clear.emit(true);
            // this.updated.emit(data.clienta);
          },
          err =>[this._helpers.msgError(this._helpers.goError(err)),this.petition=false],
          ()=> this.petition=false
        );
    }
  }
  cancel() {
    this.clear.emit(true);
  }

}
