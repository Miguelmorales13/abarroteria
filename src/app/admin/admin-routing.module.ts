import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { LogoutComponent } from './logout/logout.component';
import { IsLoggedGuard } from './guards/is-logged.guard';
import { IsNoLoggedGuard } from './guards/is-no-logged.guard';
import { HomeAdminComponent } from './menu/home-admin/home-admin.component';
import { ClientsComponent } from './menu/clients/clients.component';
import { SalesComponent } from './menu/sales/sales.component';
import { ListSalesComponent } from './menu/sales/list-sales/list-sales.component';
import { FormSaleComponent } from './menu/sales/form-sale/form-sale.component';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [IsNoLoggedGuard]  },
  {
  path: 'menu', component: MenuComponent,  canActivate:[IsLoggedGuard] ,
    children: [
      { path: '', redirectTo:'inicio', pathMatch:'full' },
      { path: 'inicio', component:HomeAdminComponent },
      { path: 'configuracion', loadChildren:'./menu/config/config.module#ConfigModule' },
      { path: 'almacen', loadChildren:'./menu/storage/storage.module#StorageModule' },
      { path: 'clientes', component:ClientsComponent },
      { path: 'ventas', component:SalesComponent,
        children:[
          { path: '', redirectTo: 'listado', pathMatch:'full' },
          { path: 'listado', component: ListSalesComponent },
          { path: 'agregar', component: FormSaleComponent },
        ]
    },
    ]
  },
  { path: 'adios', component: LogoutComponent },
  { path: '**', component: PageNotFoundComponent, pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
