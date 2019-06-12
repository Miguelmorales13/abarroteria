import { Component, OnInit } from '@angular/core';
import { GlobalService } from '@services/configuration/global.service';
import { Product } from '@models/product';
import { Subcategori } from '@models/subcategori';
import { AccessService } from '@services/configuration/access.service';
declare var $:any;
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  accion: String = "Agregar producto";
  edit: Boolean = false;
  pos: number = null;
  constructor(
    public _global: GlobalService,
    public _access: AccessService
    ) { }

  ngOnInit() { }
  onClose(event) {
    if (event) {
      $("#modalAdd").modal("hide");
      $("#modalDelete").modal("hide");
      this.clear();
    }
  }
  clear(): void {
    this._global.selectedProduct = new Product();
    this.edit = false;
    this._global.clearPhoto();
    this.accion = "Agregar producta";
  }
  goDoProduct(event): void {
    this._global.selectedProduct = Object.assign({}, event.product);
    let subcategori = this._global.subcategories.filter(subcategori => subcategori._id == event.product.subcategoria)
    this._global.selectedSubcategori = Object.assign({}, subcategori[0] as Subcategori);
    this.pos = null;
    switch (event.type) {
      case "update":
        this.accion = "Actualizar producta";
        this.pos = event.pos;
        $("#modalAdd").modal("show");
        this.edit = true;
        this._global.img =
          this._global.urlApi + "productas/" + event.product.foto;
        break;
      case "view":
        this.accion = "Producto";
        $("#modalView").modal("show");
        break;
      case "delete":
        this.accion = "Eliminar producta";
        this.pos = event.pos;
        $("#modalDelete").modal("show");
        break;
      default:
        break;
    }
  }
}
