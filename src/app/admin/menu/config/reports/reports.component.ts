import { Component, OnInit } from '@angular/core';
import { GlobalService } from '@services/configuration/global.service';
import { ProductsService } from '@services/petitions/products.service';
import { ClientsService } from '@services/petitions/clients.service';
import { SalesService } from '@services/petitions/sales.service';
import { UsersService } from '@services/petitions/users.service';
import { ProvidersService } from '@services/petitions/providers.service';
import { RolsService } from '@services/petitions/rols.service';
import { CategoriesService } from '@services/petitions/categories.service';
import { SubcategoriesService } from '@services/petitions/subcategories.service';
import {  FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { HelpersService } from '@services/configuration/helpers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  typesReports: Array<string>=['productos','usuarios','ventas','clientes','proveedores','roles','categorias','subcategorias']
  reportCaract: Report= new Report();
  formReport: FormGroup;
  petition=false
  constructor(
    public _global: GlobalService,
    private _productos: ProductsService,
    private _usuarios: UsersService ,
    private _ventas: SalesService,
    private _clientes: ClientsService,
    private _proveedores: ProvidersService,
    private _roles: RolsService,
    private _categorias: CategoriesService,
    private _subcategorias: SubcategoriesService,
    private _helpers: HelpersService,
    private fb: FormBuilder,
    private route: Router
    ) { }

  ngOnInit() {
    this.formReport=this.fb.group({
      tipe: [null, Validators.compose([ Validators.required ])],
      first_date: [null, Validators.compose([ Validators.required ])],
      last_date: [null, Validators.compose([ Validators.required ])],
    }, { validator: [this.checkDate, this.checkDateLast] } )
  }
  onSubmit(formReport: FormControl):void {
    if (!formReport.valid) return this._helpers.msgError('Verifica los datos del formulario')
    this.petition=true
    const reportTo= `this._${formReport.value.tipe}.report(formReport.value)`
    eval(reportTo).subscribe(
      data=>{
        window.open(
          this._global.urlApi + "reports/" + data.report,
          "_blank"
        );
      },err=> [this._helpers.msgError(this._helpers.goError(err)),this.petition=false],
      this.petition=false
    )
  }
  getDateNow(): string{
    const now = new Date()
    return `${now.getDate()}-${now.getMonth()-1}-${now.getFullYear()}`;
  }
  checkDate(group: FormGroup){
    let first= new Date(group.controls.first_date.value);
    let last= new Date(group.controls.last_date.value);
    return (first.getTime() <= last.getTime())?null:{noDate:true}
    
  }
  checkDateLast(group: FormGroup){
    let first= new Date();
    let last= new Date(group.controls.last_date.value);
    return (last.getTime() <= first.getTime())?null:{noDateLast:true}
    
  }

}
class Report{
  tipe: string;
  first_date: Date;
  last_date: Date;

}
