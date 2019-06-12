import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { GlobalService } from '@services/configuration/global.service';
import { SalesService } from '@services/petitions/sales.service';
import { HelpersService } from '@services/configuration/helpers.service';
import { Sale } from '@models/sale';
import { AccessService } from '@services/configuration/access.service';

@Component({
  selector: 'app-list-sales',
  templateUrl: './list-sales.component.html',
  styleUrls: ['./list-sales.component.css']
})
export class ListSalesComponent implements OnInit {
  rows: Array<any> = [
    { key: "cliente.nombre", name: "Cliente" },
    { key: "vendedor.nombre", name: "Vendedor" },
    { key: "created_at", name: "Fecha" },
    { key: "total", name: "Total" }
  ];
  noReg = 10;
  typeSearch = "cliente.nombre";
  search = "";
  pag: Object = {};
  page: number = 1;
  formOrder: Boolean = true;
  orderBy: String = "";
  petition:any;
  constructor(
    public _global: GlobalService,
    private _sales: SalesService,
    private _access: AccessService,
    private _helpers: HelpersService
  ) {
    this.petition={
      no:false,
      progress:false
    }
   }

  ngOnInit() {
    if (this._access.accessRolsSection('ventas','ver')) {
      this.listSales();
    }
    this.orderBy = this.rows[0].key;
  }
  order(key: String) {
    if (key != this.orderBy) {
      this.orderBy = key;
    }
    this.formOrder = !this.formOrder;
  }
  listSales() {
    this._sales.getSales().subscribe(
      data => {
        this._global.sales = data ? (data as Sale[]) : [];
        if (this._global.sales.length <= 0) {
          this._helpers.msgInfo("No hay ventas registradas");
        }else{
          this.petition.no=true
        }
      }, err => this._helpers.msgError(this._helpers.goError(err)),
      ()=>this.petition.progress=true
    );
  }
  changePage(event): void {
    this.pag = event;
  }
  goViewSale(sale:Sale){
    this._global.selectedSale= Object.assign({},sale)
  }

}
