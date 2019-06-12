import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ProductsService } from '@services/petitions/products.service';
import { GlobalService } from '@services/configuration/global.service';
import { CategoriesService } from '@services/petitions/categories.service';
import { HelpersService } from '@services/configuration/helpers.service';
import { Product } from '@models/product';
import { AccessService } from '@services/configuration/access.service';
declare var $:any
@Component({
  selector: "app-list-products",
  templateUrl: "./list-products.component.html",
  styleUrls: ["./list-products.component.css"]
})
export class ListProductsComponent implements OnInit {
  rows: Array<any> = [
    { key: "nombre", name: "Nombre" },
    { key: "subcategoria.categoria.nombre", name: "Categoria" },
    { key: "subcategoria.nombre", name: "Subcategoria" },
    { key: "costo", name: "Costo" },
    { key: "precio", name: "Precio" },
    { key: "cantidad", name: "Cantidad" },
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
  @Output() public doProduct: EventEmitter<any> = new EventEmitter();
  constructor(
    public _global: GlobalService,
    private _products: ProductsService,
    private _access: AccessService,
    private _helpers: HelpersService
  ) {}

  ngOnInit() {
    if (this._access.accessRolsSection('productos','ver')) {
      this.listProducts();
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
  listProducts() {
    this.petition.progress=true
    this._products.getProducts().subscribe(
      data => {
        this._global.products = data ? (data as Product[]) : [];
        if (this._global.products.length <= 0) {
          this._helpers.msgInfo("No hay producto registrado");
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
  goDoProduct(product: Product, type: string, pos: number): void {
    this.doProduct.emit({ product, type, pos });
  }
  getCategoriName(categori_id): String {
    let categori = this._global.categories.filter(
      categori => categori._id == categori_id
    );
    return categori[0].nombre;
  }
  getSubcategoriName(subcategori_id): String {
    let subcategori = this._global.subcategories.filter(
      subcategori => subcategori._id == subcategori_id
    );
    return subcategori[0].nombre;
  }
}
