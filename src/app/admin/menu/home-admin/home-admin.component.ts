import { Component, OnInit } from '@angular/core';
import { GlobalService } from '@services/configuration/global.service';
import { SalesService } from '@services/petitions/sales.service';
import { HelpersService } from '@services/configuration/helpers.service';
import { CoreService } from '@services/configuration/core.service';
import { log } from 'util';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
  countGlobal={
    sales:0,
    clients:0,
    providers:0,
    rols:0,
    products:0,
    categories:0,
    subcategories:0,
    users:0,
  }
  constructor(public _global: GlobalService,private _core:CoreService, private _sales:SalesService, private _helpers:HelpersService) { }

  ngOnInit() {
    this._core.getCount().subscribe(
      data=>{
        this.countGlobal=data.countGlobal
      },err=>this._helpers.msgError(this._helpers.goError(err))
    )
    
  }

}
