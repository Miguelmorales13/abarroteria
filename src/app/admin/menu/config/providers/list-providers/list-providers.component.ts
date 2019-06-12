import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { GlobalService } from '@services/configuration/global.service';
import { ProvidersService } from '@services/petitions/providers.service';
import { ProductsService } from '@services/petitions/products.service';
import { HelpersService } from '@services/configuration/helpers.service';
import { Product } from '@models/product';
import { Provider } from '@models/provider';
import { AccessService } from '@services/configuration/access.service';

@Component({
  selector: 'app-list-providers',
  templateUrl: './list-providers.component.html',
  styleUrls: ['./list-providers.component.css']
})
export class ListProvidersComponent implements OnInit {
  rows: Array<any> = [
    { key: "nombre", name: "Nombre" },
    { key: "telefono", name: "Telefono" },
    { key: "direccion", name: "Direccíon" },
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
  @Output() public doProvider: EventEmitter<any> = new EventEmitter();
  constructor(
    public _global: GlobalService,
    private _provideres: ProvidersService,
    private _access: AccessService,
    private _helpers: HelpersService
  ) { }

  ngOnInit() {
    if (this._access.accessRolsSection('proveedores','ver')) {
      this.listProviders();
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
  listProviders() {
    this.petition.progress=true
    this._provideres.getProviders().subscribe(
      data => {
        this._global.providers = data.proveedores ? (data.proveedores as Provider[]) : [];
        if (this._global.providers.length <= 0) {
          this._helpers.msgInfo("No hay proveedores registrado");
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
  goDoProvider(provider: Provider, type: string, pos: number): void {
    this.doProvider.emit({ provider, type, pos });
  }

}
