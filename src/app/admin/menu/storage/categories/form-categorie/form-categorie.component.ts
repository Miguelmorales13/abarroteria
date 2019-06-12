import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GlobalService } from '@services/configuration/global.service';
import { HelpersService } from '@services/configuration/helpers.service';
import { CategoriesService } from '@services/petitions/categories.service';
import { Categori } from '@models/categori';

@Component({
  selector: "form-categorie",
  templateUrl: "./form-categorie.component.html",
  styleUrls: ["./form-categorie.component.css"]
})
export class FormCategorieComponent implements OnInit {
  @Input() edit: Boolean = false;
  @Output() clear: EventEmitter<any> = new EventEmitter();
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() added: EventEmitter<any> = new EventEmitter();
  petition={
    progress:false
  }
  constructor(
    public _global: GlobalService,
    private _helpers: HelpersService,
    private _categori: CategoriesService
  ) {}

  ngOnInit() {}
  onSubmit(formCategori: NgForm): void {
    if (!formCategori.valid) {
      return this._helpers.msgInfo( "Verifique sus datos");
    }
    this.petition.progress=true
    if (!this._global.selectedCategori._id) {
      this._categori.addCategori(this.getFormdata(formCategori)).subscribe(
        data => {
          this._helpers.msgSuccess( "Categoria registrada");
          this.clear.emit(true);
          // this.added.emit(data.categoria)
          this._global.categories.unshift(data.categoria as Categori)
        },
        err => [this._helpers.msgError(this._helpers.goError(err)),this.petition.progress=false],
        ()=> this.petition.progress=false
        );
      } else {
        formCategori.value._id = this._global.selectedCategori._id;
        this._categori
        .updateCategori(
          this._global.selectedCategori._id,
          this.getFormdata(formCategori)
        )
        .subscribe(
          data => {
            this._helpers.msgSuccess("Categoria actualizada");
            this._global.categories = this._global.categories.filter(cat => cat._id != this._global.selectedCategori._id)        
            this._global.categories.push(data.categoria as Categori)
            this.clear.emit(true);
            // this.updated.emit(data.categoria);
          },
          err => [this._helpers.msgError(this._helpers.goError(err)),this.petition.progress=false],
          ()=> this.petition.progress=false
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
        this._helpers.msgWarning(error);
        this._global.clearPhoto();
      });
  }
  getFormdata(formCategoria: NgForm) {
    const formData = new FormData();
    if (this._global.selectedCategori._id) {
      // actualiza
      if (this._global.foto) {
        formData.append("foto", this._global.foto, this._global.foto.name);
      }
    } else {
      // crea
      if (!this._global.foto) {
        return this._helpers.msgWarning("Seleccione una foto");
      }
      formData.append("foto", this._global.foto, this._global.foto.name);
    }
    formData.append("nombre", formCategoria.value.nombre);
    formData.append("ruta", formCategoria.value.ruta);
    if (formCategoria.value.estatus) {
      formData.append("estatus", formCategoria.value.estatus);
      
    }
    if (formCategoria.value.descripcion) {
      // la descripcion es opcional
      formData.append("descripcion", formCategoria.value.descripcion);
    }
    
    return formData;
  }
  replacePath() {
    this._global.selectedCategori.ruta = this._global.selectedCategori.nombre.replace(
      / /g,
      "-"
    );
  }
  cancel() {
    this.clear.emit(true);
  }
}
