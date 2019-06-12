import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@services/petitions/products.service';
import { GlobalService } from '@services/configuration/global.service';
import { HelpersService } from '@services/configuration/helpers.service';
import { Product } from '@models/product';
import { FormGroup, Validators, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { SalesService } from '@services/petitions/sales.service';
import { ClientsService } from '@services/petitions/clients.service';
import { Client } from '@models/client';
import { SessionsService } from '@services/petitions/sessions.service';
declare var $:any;
@Component({
  selector: "app-form-sale",
  templateUrl: "./form-sale.component.html",
  styleUrls: ["./form-sale.component.css"]
})
export class FormSaleComponent implements OnInit {
  dropdownSettings: any = {
    singleSelection: true,
    selectAllText: "Seleccionar todos",
    unSelectAllText: "Des seleccionar Todos",
    idField: "_id",
    textField: "nombre",
    allowSearchFilter: true,
    itemsShowLimit: 10,
    disabled: false,
    closeDropDownOnSelection: true
  };
  dropdownSettingsClients: any = {
    singleSelection: true,
    selectAllText: "Seleccionar todos",
    unSelectAllText: "Des seleccionar Todos",
    idField: "_id",
    textField: "nombre",
    allowSearchFilter: true,
    itemsShowLimit: 10,
    disabled: false,
    closeDropDownOnSelection: true
  };
  formSale: FormGroup;
  productAdd: any = [];
  productSelected: Product = null;
  cantidad=null;
  public totaSale:number=20;
  client=null;
  cambio=null;
  constructor(
    private _products: ProductsService,
    private _clients: ClientsService,
    private _sales: SalesService,
    private _session: SessionsService,
    public _global: GlobalService,
    private fb: FormBuilder,
    private _helpers: HelpersService
  ) {}

  ngOnInit() {
    if (this._global.products.length <= 0) {
      this.listProducts();
    }
    if (this._global.clients.length <= 0) {
      this.listClients();
    }
    this.resetFormProvider();
    this.removeProduct(0)
  }
  onProductSelect(product: any) {
    this.productSelected = product;
  }
  selectedClient(client){
    this.client=client;
  }
  unSelectedClient(){
    this.client=null;
  }
  listClients() {
    this._clients.getClients().subscribe(
      data => {
        this._global.clients = data ? (data as Client[]) : [];
        if (this._global.clients.length <= 0) {
          this._helpers.msgInfo("No hay clientes registrados");
        }
      },
      err => this._helpers.msgError(this._helpers.goError(err))
    );
  }
  listProducts() {
    this._products.getProducts().subscribe(
      data => {
        this._global.products = data ? (data as Product[]) : [];
        if (this._global.products.length <= 0) {
          this._helpers.msgInfo("No hay productos registrados");
        }
      },
      err => this._helpers.msgError(this._helpers.goError(err))
      );
    }
  onSubmit(formSale: FormControl,recivido:any) {
    if (recivido<formSale.value.total) return this._helpers.msgWarning("Dinero insuficiente")
    if (!this.client) return this._helpers.msgWarning("Selecciona un cliente");
    if (!formSale.valid) return this._helpers.msgWarning("Verifica tus datos");
    const newSale=formSale.value
    newSale.cliente= this.client._id
    this._sales.addSale(newSale).subscribe(
      data => {
        this.cambio=recivido-newSale.total
        $('#modalConfirm').modal('hide')
        $('#modalCash').modal('show')
        this._global.sales.push(data.venta);
        this.resetFormProvider();
        this._global.products=this._global.products.map(prod=>{
          const newProd =formSale.value.productos.find(data=>prod._id==data.producto)
          if (newProd) {
            prod.cantidad=prod.cantidad-newProd.cantidad
          }
          return prod
        })
        this._helpers.msgSuccess(data.message);
      },
      err => this._helpers.msgError(this._helpers.goError(err))
      );
  }
  createProduct(product?): FormGroup {
    console.log(product);
    
    if (product && this.getProduct({value:product._id},'forma') != 'unidades'){
      return this.fb.group({
        producto: [product ?product._id:null, Validators.required],
        tipo: [(product && this.getProduct({value:product._id},'forma')=='litros')?'litros':'kilos', Validators.required],
        cantidad: [product ?product.cantidad:1, Validators.required]
      });
    }else {
      return this.fb.group({
        producto: [product ? product._id:null, Validators.required],
        cantidad: [1, Validators.required]
      });
    }
  }
  updateProduct(product,cantidad): FormGroup {
    if (this.getProduct({value:product._id},'forma') != 'unidades'){
      return this.fb.group({
        producto: [product._id, Validators.required],
        tipo: [this.getProduct({value:product._id},'tipo_venta'), Validators.required],
        cantidad: [cantidad, Validators.required]
      });
    }else{
      return this.fb.group({
        producto: [product._id, Validators.required],
        cantidad: [cantidad, Validators.required]
      });
    }
  }
  addProduct() {
    if (!this.productSelected) return this._helpers.msgInfo('Seleccióne un producto')
    this.productAdd = this.formSale.get("productos") as FormArray;
    if (this.productAdd.value.length>0) {
      for (const i in this.productAdd.value) {
        if (this.productAdd.value[i].producto== this.productSelected._id) {
          this.cantidad=this.formSale.value.productos[i].cantidad+1
          this.removeProduct(i)
        }else{
          this.cantidad=null
        }
      }
    }
    if (this.cantidad!=null) {
      this.productAdd.push(this.updateProduct(this.productSelected,this.cantidad));
    }else{
      this.productAdd.push(this.createProduct(this.productSelected));
    }
    this.goTotal()
  }
  removeProduct(i) {
    this.productAdd = this.formSale.get("productos") as FormArray;
    if (this.productAdd.controls.length > 0) {
      this.productAdd.controls.splice(i,1)
      this.formSale.value.productos.splice(i,1);
    }
    // this.studentsAdd.pop();
  }
  confirmBuy(){
    $('#modalConfirm').modal('show')
  }

  resetFormProvider(): void {
    this.formSale = this.fb.group({
      productos: this.fb.array([this.createProduct()]),
      cliente: [this.client],
      vendedor: [this._session.getAnyUser('_id')],
      total: [null, Validators.required]
    });
    this.removeProduct(0)
    this.cantidad=null;
    this.totaSale=0;
  }
  getProduct(product, tipo) {
    let prod = this._global.products.filter(prod => prod._id == product.value);
    let sentencia = `prod[0].${tipo}`;

    return eval(sentencia);
  }
  goTotal(){
    this.productAdd = this.formSale.get("productos") as FormArray;
    let total=0
    this.totaSale=0;
    for (const prod of this.productAdd.value) {
      total+= (prod.tipo && (prod.tipo=='gramos' || prod.tipo=='mililitros'))?((this.getProduct({value:prod.producto},'precio')/1000)*prod.cantidad):(this.getProduct({value:prod.producto},'precio')*prod.cantidad)
    }    
    let formSale=this.formSale.get('total')
    formSale.setValue(total)
    this.totaSale=total;
  }
  getTotalSale(){
    return  this.totaSale
  }
}
