import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GlobalService } from '@services/configuration/global.service';
import { ProductsService } from '@services/petitions/products.service';
import { HelpersService } from '@services/configuration/helpers.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  petition=false
  constructor(public _global: GlobalService, private _products: ProductsService, private _helpers: HelpersService) { }

  ngOnInit() {
  }
  confirm(): void {
    this.petition=true
    this._products
      .deleteProduct(this._global.selectedProduct._id)
      .subscribe(
        data => {
          this._helpers.msgSuccess("Producto eliminado");
          this._global.products = this._global.products.filter(
            product => product._id != this._global.selectedProduct._id
          );
          this.cancel.emit(true);
        },
        err => [this._helpers.msgError(this._helpers.goError(err)),this.petition=false],
        ()=> this.petition=false
      );
  }
  cancelDelete(): void {
    this.cancel.emit(true);
  }
}
