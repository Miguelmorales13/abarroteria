import { Component, OnInit } from '@angular/core';
import { SalesService } from '@services/petitions/sales.service';
import { HelpersService } from '@services/configuration/helpers.service';
import { ProductsService } from '@services/petitions/products.service';
import { GlobalService } from '@services/configuration/global.service';
import { AccessService } from '@services/configuration/access.service';
import { Product } from '@models/product';
declare var $:any;

@Component({
  selector: 'app-home-storage',
  templateUrl: './home-storage.component.html',
  styleUrls: ['./home-storage.component.css']
})
export class HomeStorageComponent implements OnInit {
  salesWeek={
    no:0,
    total:0
  }
  prods;
  petition=false;
  petitionUpdate=false;
  cantidad=0;
  constructor(private _products: ProductsService, private _helpers: HelpersService, public _global: GlobalService, private _access: AccessService) { }

  ngOnInit() {
    this.getProduct()
  }
  getProduct(){
    this.petition=true;
    this._products.getHome().subscribe(
        data=>{
          this.prods=data.prods
        },err=> this._helpers.msgError(this._helpers.goError(err)),
        ()=> this.petition=false
        
      )
  }
  activateUpdate(prod){
    this._global.selectedProduct= Object.assign({},prod)
  }
  onSubmit(cantidad:string){
    if (parseInt(cantidad)<=0) return this._helpers.msgError('Verifica la entrada');
    this._global.selectedProduct.cantidad+=parseInt(cantidad);
    
    this._global.selectedProduct.caracteristicas = JSON.stringify(this._global.selectedProduct.caracteristicas) ;
    this._products.updateProduct(this._global.selectedProduct._id, this._global.selectedProduct).subscribe(
      data=>{
        this._helpers.msgSuccess(data.message)
        $('#modalUpdate').modal('hide')
        this.getProduct()
        this._global.selectedProduct=new Product()
      },err=>this._helpers.msgError(this._helpers.goError(err)),
      ()=>this.petitionUpdate=false
    )
  }

}
