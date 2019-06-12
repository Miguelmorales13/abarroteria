import { Component, OnInit } from '@angular/core';
import { GlobalService } from '@services/configuration/global.service';
import { Categori } from '@models/categori';
import { AccessService } from '@services/configuration/access.service';
declare var $:any;
@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.css"]
})
export class CategoriesComponent implements OnInit {
  accion: String = "Agregar categoria";
  edit: Boolean= false;
  pos: number= null;
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
    this._global.selectedCategori = new Categori();
    this.edit=false
    this._global.clearPhoto();
    this.accion = "Agregar categoria";
  }
  goDoCategori(event):void {
    this._global.selectedCategori= Object.assign({},event.categori);
    this.pos=null;
    switch (event.type) {
      case "update":
        this.accion = "Actualizar categoria";
        this.pos=event.pos;
        $("#modalAdd").modal("show");
        this.edit =true;
        this._global.img = this._global.urlApi+'categorias/'+event.categori.foto;
        break;
        case "view":
        this.accion = "Categoria";
        $("#modalView").modal("show");
        break;
      case "delete":
        this.accion = "Eliminar categoria";
        this.pos=event.pos;
        $("#modalDelete").modal("show");
        break;
      default:
        break;
    }    
  }
}
