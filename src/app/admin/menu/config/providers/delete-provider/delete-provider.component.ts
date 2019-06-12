import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { GlobalService } from '@services/configuration/global.service';
import { ProvidersService } from '@services/petitions/providers.service';
import { HelpersService } from '@services/configuration/helpers.service';

@Component({
  selector: 'app-delete-provider',
  templateUrl: './delete-provider.component.html',
  styleUrls: ['./delete-provider.component.css']
})
export class DeleteProviderComponent implements OnInit {
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  petition=false;
  constructor(public _global: GlobalService, private _providers: ProvidersService, private _helpers: HelpersService) { }

  ngOnInit() {
  }
  confirm(): void {
    this.petition=true
    this._providers
      .deleteProvider(this._global.selectedProvider._id)
      .subscribe(
        data => {
          this._helpers.msgSuccess("Proveedor eliminado");
          this._global.providers = this._global.providers.filter(
            product => product._id != this._global.selectedProvider._id
          );
          this.cancel.emit(true);
        },
        err => [this._helpers.msgError(this._helpers.goError(err)),this.petition=false],
        ()=>this.petition=false
      );
  }
  cancelDelete(): void {
    this.cancel.emit(true);
  }

}
