import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Sale } from '@models/sale';

@Component({
  selector: 'app-details-sale',
  templateUrl: './details-sale.component.html',
  styleUrls: ['./details-sale.component.css']
})
export class DetailsSaleComponent implements OnInit, OnChanges {
  @Input('sale') sale=new Sale()
  constructor() { }

  ngOnInit() {
    
  }
  ngOnChanges(): void {
    console.log(this.sale);
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    
  }

}
