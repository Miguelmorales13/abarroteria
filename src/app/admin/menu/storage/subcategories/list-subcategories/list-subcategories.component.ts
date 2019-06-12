import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GlobalService } from '@services/configuration/global.service';
import { SubcategoriesService } from '@services/petitions/subcategories.service';
import { HelpersService } from '@services/configuration/helpers.service';
import { Subcategori } from '@models/subcategori';
import { AccessService } from '@services/configuration/access.service';

@Component({
  selector: "app-list-subcategories",
  templateUrl: "./list-subcategories.component.html",
  styleUrls: ["./list-subcategories.component.css"]
})
export class ListSubcategoriesComponent implements OnInit {
  rows: Array<any> = [
    { key: "nombre", name: "Nombre" },
    { key: "categoria.nombre", name: "Categoria" },
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
  @Output() public doSubcategori: EventEmitter<any> = new EventEmitter();
  constructor(
    public _global: GlobalService,
    private _subcategories: SubcategoriesService,
    private _access: AccessService,
    private _helpers: HelpersService
  ) {}

  ngOnInit() {
    if (this._access.accessRolsSection('subcategorias','ver')) {
      this.listSubcategories();
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
  listSubcategories() {
    this.petition.progress=true;
    this._subcategories.getSubcategories().subscribe(
      data => {
        this._global.subcategories = data ? (data as Subcategori[]) : [];
        if (this._global.subcategories.length <= 0) {
          this._helpers.msgInfo("No hay subcategorias registradas");
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
  goDoSubcategori(subcategori: Subcategori, type: string, pos: number): void {
    this.doSubcategori.emit({ subcategori, type, pos });
  }
  getCategoriName(categori_id): String {
    let categori = this._global.categories.filter(categori => categori._id == categori_id)
    return categori[0].nombre;
  }
}
