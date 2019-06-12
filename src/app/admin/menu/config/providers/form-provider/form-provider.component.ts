import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Provider } from '@models/provider';
import { FormGroup, Validators, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { HelpersService } from '@services/configuration/helpers.service';
import { GlobalService } from '@services/configuration/global.service';
import { ProvidersService } from '@services/petitions/providers.service';
import { Product } from '@models/product';
import { ProductsService } from '@services/petitions/products.service';

@Component({
  selector: 'app-form-provider',
  templateUrl: './form-provider.component.html',
  styleUrls: ['./form-provider.component.css']
})
export class FormProviderComponent implements OnInit {
  @Input() edit: Boolean = false;
  @Input() provider: any = new Provider();
  @Output() clear: EventEmitter<any> = new EventEmitter();
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() added: EventEmitter<any> = new EventEmitter();
  formProvider: FormGroup;
  productAdd: any = [];
  petition=false;
  constructor(
    private fb: FormBuilder,
    private _helpers: HelpersService,
    public _global: GlobalService,
    private _providers: ProvidersService,
    private _products: ProductsService
  ) { }
  ngOnChanges(): void {
    if (this.provider._id) {
      this.formProvider = this.fb.group({
        productos: this.updateProducts(),
        nombre: [this.provider.nombre, Validators.required],
        telefono: [this.provider.telefono, Validators.required],
        direccion: [this.provider.direccion]
      });
    } else {
      this.resetFormProvider();
    }

  }
  
  listProducts() {
    this._products.getProducts().subscribe(
      data => {
        this._global.products = data ? (data as Product[]) : [];
        if (this._global.products.length <= 0) {
          this._helpers.msgInfo("No hay productos registrados para poder seguir con el registro");
        }
      },
      err => this._helpers.msgError(this._helpers.goError(err))
    );
  }
  ngOnInit() {
    if (this._global.products.length <= 0) {
      this.listProducts();
    }
    this.resetFormProvider();
  }
  onSubmit(formProvider: FormControl) {
    if (!formProvider.valid) return this._helpers.msgWarning("Verifica tus datos");
    this.petition=true
    if (!this.provider._id) {
      this._providers.addProvider(formProvider.value).subscribe(
        data => {
          this._global.providers.push(data.providero);
          this.resetFormProvider();
          this._helpers.msgSuccess(data.message)
          this.cancel();
        },
        err => [this._helpers.msgError(this._helpers.goError(err)),this.petition=false],
        ()=> this.petition=false
      );

    } else {
      this._providers.updateProvider(this.provider._id, formProvider.value).subscribe(
        data => {
          this._helpers.msgSuccess(data.message)
          this._global.providers = this._global.providers.filter(
            provider => provider._id != data.proveedor._id
          );
          this._global.providers.push(data.proveedor);
          this.resetFormProvider();
          this.cancel();
        },
        err => [this._helpers.msgError(this._helpers.goError(err)),this.petition=false],
        ()=> this.petition=false
      );

    }

  }
  createProduct(product?): FormGroup {
    return this.fb.group({
      producto: [(product &&product.producto) ? product.producto._id : null, Validators.required],
      precio: [product ? product.precio : null, Validators.required]
    });
  }
  updateProducts(): FormArray {
    let oldProducts = [];
    for (const prod of this.provider.productos) {
      oldProducts.push(this.createProduct(prod));
    }
    let regreso = new FormArray(oldProducts);
    return regreso;
  }
  addProduct() {
    this.productAdd = this.formProvider.get(
      "productos"
    ) as FormArray;
    this.productAdd.push(this.createProduct());

  }
  removeProduct() {
    this.productAdd = this.formProvider.get("productos") as FormArray;
    if (this.productAdd.controls.length > 0) {
      this.productAdd.controls.pop();
      this.formProvider.value.productos.pop();
    }
    // this.studentsAdd.pop();
  }
  resetFormProvider(): void {
    this.formProvider = this.fb.group({
      productos: this.fb.array([this.createProduct()]),
      nombre: [null, Validators.required],
      telefono: [null, Validators.required],
      direccion: [null],
    });
  }
  cancel() {
    this.clear.emit(true);
  }

}
