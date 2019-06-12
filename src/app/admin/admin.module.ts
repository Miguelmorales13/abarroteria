import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { ClientsComponent } from './menu/clients/clients.component';
import { SalesComponent } from './menu/sales/sales.component';
import { BootstrapModule } from '../bootstrap/bootstrap.module';

import { NgxPaginationModule } from 'ngx-pagination';
import { FormClientComponent } from './menu/clients/form-client/form-client.component';
import { DeleteClientComponent } from './menu/clients/delete-client/delete-client.component';
import { DetailsClientComponent } from './menu/clients/details-client/details-client.component';
import { ListClientsComponent } from './menu/clients/list-clients/list-clients.component';
import { DeleteSaleComponent } from './menu/sales/delete-sale/delete-sale.component';
import { DetailsSaleComponent } from './menu/sales/details-sale/details-sale.component';
import { FormSaleComponent } from './menu/sales/form-sale/form-sale.component';
import { ListSalesComponent } from './menu/sales/list-sales/list-sales.component';

import { HomeAdminComponent } from './menu/home-admin/home-admin.component';
import { PipesModule } from '@pipes/pipes.module';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';
import { SidebarAdminComponent } from './components/sidebar-admin/sidebar-admin.component';

@NgModule({
  declarations: [
    AdminComponent,
    MenuComponent,
    LoginComponent,
    LogoutComponent,
    PageNotFoundComponent,
    SalesComponent,
    ClientsComponent,
    FormClientComponent,
    DeleteClientComponent,
    DetailsClientComponent,
    ListClientsComponent,
    DeleteSaleComponent,
    DetailsSaleComponent,
    FormSaleComponent,
    ListSalesComponent,
    HomeAdminComponent,
    HeaderAdminComponent,
    SidebarAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BootstrapModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
    PipesModule,
  ],
})
export class AdminModule {}
