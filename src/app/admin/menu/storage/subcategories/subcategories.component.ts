import { Component, OnInit } from '@angular/core';
import { GlobalService } from '@services/configuration/global.service';
import { Subcategori } from '@models/subcategori';
import { Categori } from '@models/categori';
import { AccessService } from '@services/configuration/access.service';
declare var $:any;
@Component({
  selector: "app-subcategories",
  templateUrl: "./subcategories.component.html",
  styleUrls: ["./subcategories.component.css"]
})
export class SubcategoriesComponent implements OnInit {
  accion: String = "Agregar subcategoria";
  edit: Boolean = false;
  pos: number = null;
  constructor(
    public _global: GlobalService,
    private _access: AccessService
    ) {}

  ngOnInit() {}
  onClose(event) {
    if (event) {
      $("#modalAdd").modal("hide");
      $("#modalDelete").modal("hide");
      this.clear();
    }
  }
  clear(): void {
    this._global.selectedSubcategori = new Subcategori();
    this.edit = false;
    this._global.clearPhoto();
    this.accion = "Agregar subcategoria";
  }
  goDoSubcategori(event): void {
    this._global.selectedSubcategori = Object.assign({}, event.subcategori);
    this.pos = null;
    switch (event.type) {
      case "update":
        this.accion = "Actualizar subcategoria";
        this.pos = event.pos;
        $("#modalAdd").modal("show");
        this.edit = true;
        this._global.img =
          this._global.urlApi + "subcategorias/" + event.subcategori.foto;
        break;
      case "view":
        this.accion = "Subcategoria";
        $("#modalView").modal("show");
        break;
      case "delete":
        this.accion = "Eliminar subcategoria";
        this.pos = event.pos;
        $("#modalDelete").modal("show");
        break;
      default:
        break;
    }
  }
  
}
