import { Component, OnInit, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from "@angular/forms";
import { GlobalService } from "@services/configuration/global.service";
import { HelpersService } from "@services/configuration/helpers.service";
import { ProductsService } from '@services/petitions/products.service';
import { Subcategori } from '@models/subcategori';
import { Product } from '@models/product';
import { Categori } from '@models/categori';
import { CategoriesService } from '@services/petitions/categories.service';
import { SubcategoriesService } from '@services/petitions/subcategories.service';

@Component({
  selector: "app-form-product",
  templateUrl: "./form-product.component.html",
  styleUrls: ["./form-product.component.css"]
})
export class FormProductComponent implements OnInit, OnChanges {
  @Input() edit: Boolean = false;
  @Input() product: any = new Product();
  @Output() clear: EventEmitter<any> = new EventEmitter();
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() added: EventEmitter<any> = new EventEmitter();
  formProduct: FormGroup;
  caracteristicAdd: any = [];
  subcategories: Subcategori[] = [];
  tipo='';
  petition={
    progress:false,
    progressCategories:false,
    progressSubcategories:false,
  }
  constructor(
    private fb: FormBuilder,
    private _helpers: HelpersService,
    public _global: GlobalService,
    public _categories: CategoriesService,
    public _subcategories: SubcategoriesService,
    protected _products: ProductsService
  ) {}
  ngOnChanges(): void {
    if (this.product._id) {
      if(this.product.subcategoria && this.product.subcategoria.categoria ) this.selectCategori(this.product.subcategoria.categoria._id);
      this.formProduct = this.fb.group({
        caracteristicas: this.updateCaracteristics(),
        nombre: [this.product.nombre, Validators.required],
        ruta: [this.product.ruta, Validators.required],
        descripcion: [this.product.descripcion],
        estatus: [this.product.estatus, Validators.required],
        forma: [this.product.forma, Validators.required],
        tipo_venta: [this.product.tipo_venta],
        categoria: [(this.product.subcategoria && this.product.subcategoria.categoria ) ? this.product.subcategoria.categoria._id:null  , Validators.required],
        subcategoria: [this.product.subcategoria?this.product.subcategoria._id:null, Validators.required],
        costo: [this.product.costo, Validators.required],
        cantidad: [(this.product.forma!='unidad' && (this.product.tipo_venta=='kilos' || this.product.tipo_venta=='litros') )?this.product.cantidad/1000:this.product.cantidad, Validators.required],
        precio: [this.product.precio, Validators.required],
        foto: [null]
      });
    } else {
      this.resetFormProduct();
    }
    
  }
  ngOnInit() {
    this.resetFormProduct();
    if (this._global.categories.length <= 0) {
      this.listCategories();
    }
    if (this._global.subcategories.length <= 0) {
      this.listSubcategories();
    }
  }
  listCategories() {
    this.petition.progressCategories=true
    this._categories.getCategories().subscribe(
      data => {
        this._global.categories = data ? (data as Categori[]) : [];
        if (this._global.categories.length <= 0) {
          this._helpers.msgInfo("No hay categorias registradas para poder seguir con el registro");
        }
      },
      err => [this._helpers.msgError(this._helpers.goError(err)),this.petition.progressCategories=false],
      ()=>this.petition.progressCategories=false
    );
  }
  listSubcategories() {
    this.petition.progressSubcategories=true
    this._subcategories.getSubcategories().subscribe(
      data => {
        this._global.subcategories = data ? (data as Subcategori[]) : [];
        if (this._global.subcategories.length <= 0) {
          this._helpers.msgInfo("No hay subcategorias registradas para poder seguir con el registro");
        }
      },
      err => [this._helpers.msgError(this._helpers.goError(err)),this.petition.progressSubcategories=false],
      ()=>this.petition.progressSubcategories=false
    );
  }
  selectCategori(categori_id): void {
    this.subcategories = this._global.subcategories.filter(
      (sub:any) => sub.categoria._id  == categori_id
    );
  }
  onSubmit(formProduct: FormControl) {
    if (!formProduct.valid) return this._helpers.msgWarning("Verifica tus datos");
    if (formProduct.value.forma!='unidades' && (formProduct.value.tipo_venta=='kilos' || formProduct.value.tipo_venta=='litros')) formProduct.value.cantidad= parseInt(formProduct.value.cantidad)*1000;
    if (formProduct.value.forma=='unidades' ) formProduct.value.tipo_venta= 'unidades';
    this.petition.progress=true
    console.log(formProduct);
    if (!this.product._id) {
      this._products.addProduct(this.getFormdata( formProduct)).subscribe(
        data => {
          this._global.products.push(data.producto);
          this.resetFormProduct();
          this._helpers.msgSuccess(data.message)
          this.cancel();
        },
        err => [this._helpers.msgError(this._helpers.goError(err)),this.petition.progress=false],
        ()=> this.petition.progress=false
        );
        
      } else {
        this._products.updateProduct(this.product._id, this.getFormdata(formProduct)).subscribe(
          data => {
          this._helpers.msgSuccess(data.message)
          this._global.products=this._global.products.filter(
            product => product._id != data.producto._id
          );
          this._global.products.push(data.producto);
          this.resetFormProduct();
          this.cancel();
        },
        err => [this._helpers.msgError(this._helpers.goError(err)),this.petition.progress=false],
        ()=> this.petition.progress=false
      );
      
    }

  }
  getFormdata(formProduct: FormControl) {
    const formData = new FormData();
    if (this.product._id) {
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
    formData.append("nombre", formProduct.value.nombre);
    formData.append("ruta", formProduct.value.ruta);
    formData.append("precio", formProduct.value.precio);
    formData.append("forma", formProduct.value.forma);
    formData.append("costo", formProduct.value.costo);
    formData.append(
      "caracteristicas",
      JSON.stringify(formProduct.value.caracteristicas)
    );
    if (formProduct.value.tipo_venta){
      formData.append("tipo_venta", formProduct.value.tipo_venta);
    }
    formData.append("cantidad", formProduct.value.cantidad);
    formData.append("categoria", formProduct.value.categoria);
    formData.append("subcategoria", formProduct.value.subcategoria);
    if (formProduct.value.estatus) {
      // solo hay en la acctualizacion
      formData.append("estatus", formProduct.value.estatus);
    }
    if (formProduct.value.descripcion) {
      // la descripcion es opcional
      formData.append("descripcion", formProduct.value.descripcion);
    }

    return formData;
  }
  createCaracteristic(caracteristica?): FormGroup {
    return this.fb.group({
      caracteristica: [caracteristica ? caracteristica.caracteristica : null, Validators.required],
      dato: [caracteristica ? caracteristica.dato : null, Validators.required]
    });
  }
  updateCaracteristics(): FormArray{
    let oldCaracts=[];
    for (const car of this.product.caracteristicas) {
      oldCaracts.push(this.createCaracteristic(car));
    }
    let regreso= new FormArray(oldCaracts);
    return regreso;
  }
  addCaracteristic() {
    this.caracteristicAdd = this.formProduct.get(
      "caracteristicas"
    ) as FormArray;
    this.caracteristicAdd.push(this.createCaracteristic());
    
  }
  removeCaracteristic() {
    this.caracteristicAdd = this.formProduct.get("caracteristicas") as FormArray;
    if (this.caracteristicAdd.controls.length > 0) {
      this.caracteristicAdd.controls.pop();
      this.formProduct.value.caracteristicas.pop();
    }
    // this.studentsAdd.pop();
  }
  resetFormProduct(): void {
    this.formProduct = this.fb.group({
      caracteristicas: this.fb.array([this.createCaracteristic()]),
      nombre: [null, Validators.required],
      ruta: [null, Validators.required],
      descripcion: [null, Validators.required],
      forma: ['gramos', Validators.required],
      tipo_venta: ['kilos'],
      categoria: [null, Validators.required],
      subcategoria: [null, Validators.required],
      costo: [null, Validators.required],
      cantidad: [null, Validators.required],
      precio: [null, Validators.required],
      estatus: [null],
      foto: [null]
    });
  }
  changeFoto(event): void {
    if (!event.target.files && event.target.files[0]) {
      return;
    }
    // console.log(event.target.files[0])
    this._helpers
      .getIgm(event.target.files[0])
      .then(e => {
        this.formProduct.patchValue({
          foto: event.target.files[0]
        });
        this._global.foto = event.target.files[0];
        this._global.img = `${e}`;
      })
      .catch(error => {
        this._helpers.msgWarning(error);
        this._global.clearPhoto();
        this.formProduct.patchValue({
          foto: null
        });
      });
  }
  replacePath() {
    let ruta = this.formProduct.get("ruta");
    ruta.setValue(this.formProduct.get("nombre").value.replace(/ /g, "-"));
  }
  cancel() {
    this.clear.emit(true);
  }
}
