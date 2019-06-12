import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigRoutingModule } from './config-routing.module';
import { ConfigComponent } from './config.component';
import { HomeConfigComponent } from './home-config/home-config.component';
// Providers
import { ProvidersComponent } from './providers/providers.component';
import { DeleteProviderComponent } from './providers/delete-provider/delete-provider.component';
import { DetailsProviderComponent } from './providers/details-provider/details-provider.component';
import { FormProviderComponent } from './providers/form-provider/form-provider.component';
import { ListProvidersComponent } from './providers/list-providers/list-providers.component';
// Rols
import { RolsComponent } from './rols/rols.component';
import { DeleteRolComponent } from './rols/delete-rol/delete-rol.component';
import { DetailsRolComponent } from './rols/details-rol/details-rol.component';
import { FormRolComponent } from './rols/form-rol/form-rol.component';
import { ListRolsComponent } from './rols/list-rols/list-rols.component';
// Users
import { UsersComponent } from './users/users.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { DeleteUserComponent } from './users/delete-user/delete-user.component';
import { DetailsUserComponent } from './users/details-user/details-user.component';
import { FormUserComponent } from './users/form-user/form-user.component';
// Reports
import { ReportsComponent } from './reports/reports.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BootstrapModule } from 'src/app/bootstrap/bootstrap.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from '@pipes/pipes.module';

@NgModule({
  declarations: [
    ConfigComponent,
    HomeConfigComponent,
    DeleteProviderComponent,
    DetailsProviderComponent,
    FormProviderComponent,
    ListProvidersComponent,
    DeleteRolComponent,
    DetailsRolComponent,
    FormRolComponent,
    ListRolsComponent,
    ListUsersComponent,
    DeleteUserComponent,
    DetailsUserComponent,
    FormUserComponent,
    ReportsComponent,
    ProvidersComponent,
    RolsComponent,
    UsersComponent,
    
  ],
  imports: [
    CommonModule,
    ConfigRoutingModule,
    FormsModule,
    PipesModule,
    BootstrapModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class ConfigModule { }
