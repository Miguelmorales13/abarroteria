import { Component, OnInit, Output,Input, EventEmitter } from '@angular/core';
import { GlobalService } from '@services/configuration/global.service';
import { CategoriesService } from '@services/petitions/categories.service';
import { Categori } from '@models/categori';
import { HelpersService } from '@services/configuration/helpers.service';
import { AccessService } from '@services/configuration/access.service';

@Component({
  selector: "list-categories",
  templateUrl: "./list-categories.component.html",
  styleUrls: ["./list-categories.component.css"]
})
export class ListCategoriesComponent implements OnInit {
  rows: Array<any> = [
    { key: "nombre", name: "Nombre" },
    { key: "descripcion", name: "Descripcion" },
    { key: "estatus", name: "Estatus" }
  ];
  noReg = 10;
  typeSearch = "nombre";
  search = "";
  pag: Object = {};
  page: number = 1;
  formOrder: Boolean = true;
  orderBy: String = '';
  petition={
    no:false,
    progress:false
  }
  @Output() public goOrderBy = new EventEmitter();
  @Output() public doCategori: EventEmitter<any> = new EventEmitter();
  constructor(
    public _global: GlobalService,
    private _categories: CategoriesService,
    private _access: AccessService,
    private _helpers: HelpersService
  ) {}

  ngOnInit() {
    if (this._access.accessRolsSection('categorias','ver')) {
      this.listCategories();
    }
    this.orderBy=this.rows[0].key;
  }
  order(key: String) {
    if (key != this.orderBy) {
      this.orderBy = key;
    } 
    this.formOrder = !this.formOrder;
    // this.goOrderBy.emit({element:key,order:this.formOrder})
  }
  listCategories() {
    this.petition.progress=true
    this._categories.getCategories().subscribe(
      data => {
        this._global.categories = data ? (data as Categori[]) : [];
        if (this._global.categories.length <= 0) {
          this._helpers.msgInfo("No hay categorias registradas");
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
  goDoCategori(categori: Categori, type: string, pos: number): void {
    this.doCategori.emit({ categori, type, pos });
  }
}
