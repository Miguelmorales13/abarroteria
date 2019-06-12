import { Component, OnInit, Input } from '@angular/core';
import { Product } from '@models/product';
import { GlobalService } from '@services/configuration/global.service';

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"]
})
export class ProductComponent implements OnInit {
  @Input("product") product: Product= new Product();
  constructor(public _global: GlobalService) {}

  ngOnInit() {}
}
