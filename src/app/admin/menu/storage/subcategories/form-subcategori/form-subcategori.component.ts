import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SubcategoriesService } from '@services/petitions/subcategories.service';
import { HelpersService } from '@services/configuration/helpers.service';
import { GlobalService } from '@services/configuration/global.service';
import { Subcategori } from '@models/subcategori';
import { CategoriesService } from '@services/petitions/categories.service';
import { Categori } from '@models/categori';

@Component({
  selector: "app-form-subcategori",
  templateUrl: "./form-subcategori.component.html",
  styleUrls: ["./form-subcategori.component.css"]
})
export class FormSubcategoriComponent implements OnInit {
  @Input() edit: Boolean = false;
  @Output() clear: EventEmitter<any> = new EventEmitter();
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() added: EventEmitter<any> = new EventEmitter();
  petition={
    progress:false,
    progressCategori:false
  }
  constructor(
    public _global: GlobalService,
    private _helpers: HelpersService,
    private _categories: CategoriesService,
    private _subcategori: SubcategoriesService
  ) {}

  ngOnInit() {
    if (this._global.categories.length <= 0) {
      this.listCategories();
    }
  }
  listCategories() {
    this.petition.progressCategori=true;
    this._categories.getCategories().subscribe(
      data => {
        this._global.categories = data ? (data as Categori[]) : [];
        if (this._global.categories.length <= 0) {
          this._helpers.msgInfo("No hay categorias registradas");
        }
      },
      err => [this._helpers.msgError(this._helpers.goError(err)),this.petition.progressCategori=false],
      ()=> this.petition.progressCategori=false
    );
    
  }
  onSubmit(formSubcategori: NgForm): void {
    if (!formSubcategori.valid) {
      return this._helpers.msgInfo("Verifique sus datos");
    }
    this.petition.progress=true
    if (!this._global.selectedSubcategori._id) {
      this._subcategori
        .addSubcategori(this.getFormdata(formSubcategori))
        .subscribe(
          data => {
            this._helpers.msgSuccess("Subcategoria registrada");
            this.clear.emit(true);
            // this.added.emit(data.subcategoria)
            this._global.subcategories.unshift(
              data.subcategoria as Subcategori
            );
          },
          err => [this._helpers.msgError(this._helpers.goError(err)),this.petition.progress=false],
          ()=>this.petition.progress=false
        );
    } else {
      formSubcategori.value._id = this._global.selectedSubcategori._id;
      this._subcategori
        .updateSubcategori(
          this._global.selectedSubcategori._id,
          this.getFormdata(formSubcategori)
        )
        .subscribe(
          data => {
            this._helpers.msgSuccess("Subcategoria actualizada");
            this._global.subcategories = this._global.subcategories.filter(
              cat => cat._id != this._global.selectedSubcategori._id
            );
            this._global.subcategories.push(
              data.subcategoria as Subcategori
            );
            this.clear.emit(true);
            // this.updated.emit(data.subcategoria);
          },
          err => [this._helpers.msgError(this._helpers.goError(err)),this.petition.progress=false],
          ()=>this.petition.progress=false          
        );
    }
  }
  changeFoto(event): void {
    if (!event.target.files && event.target.files[0]) {
      return;
    }
    // console.log(event.target.files[0])
    this._helpers
      .getIgm(event.target.files[0])
      .then(e => {
        this._global.foto = event.target.files[0];
        this._global.img = `${e}`;
      })
      .catch(error => {
        this._helpers.msgWarning( error);
        this._global.clearPhoto();
      });
  }
  getFormdata(formSubcategori: NgForm) {
    const formData = new FormData();
    if (this._global.selectedSubcategori._id) {
      // actualiza
      if (this._global.foto) {
        formData.append("foto", this._global.foto, this._global.foto.name);
      }
    } else {
      // crea
      if (!this._global.foto) {
        return this._helpers.msgWarning( "Seleccione una foto");
      }
      formData.append("foto", this._global.foto, this._global.foto.name);
    }
    formData.append("nombre", formSubcategori.value.nombre);
    formData.append("ruta", formSubcategori.value.ruta);
    formData.append("categoria", formSubcategori.value.categoria);
    if (formSubcategori.value.estatus) {
      // solo hay en la acctualizacion
      formData.append("estatus", formSubcategori.value.estatus);
    }
    if (formSubcategori.value.descripcion) {
      // la descripcion es opcional
      formData.append("descripcion", formSubcategori.value.descripcion);
    }

    return formData;
  }
  replacePath() {
    if (this._global.selectedSubcategori.nombre) {
      this._global.selectedSubcategori.ruta = this._global.selectedSubcategori.nombre.replace(
        / /g,
        "-"
      );
    }
  }
  cancel() {
    this.clear.emit(true);
  }
}
