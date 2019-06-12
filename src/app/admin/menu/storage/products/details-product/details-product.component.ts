import { Component, OnInit, Input } from '@angular/core';
import { Product } from '@models/product';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})
export class DetailsProductComponent implements OnInit {
  @Input("product") product: Product = new Product();
  constructor() { }

  ngOnInit() {
  }

}
