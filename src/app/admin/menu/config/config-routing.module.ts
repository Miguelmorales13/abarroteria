import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeConfigComponent } from './home-config/home-config.component';
import { UsersComponent } from './users/users.component';
import { ProvidersComponent } from './providers/providers.component';
import { ReportsComponent } from './reports/reports.component';
import { RolsComponent } from './rols/rols.component';

const routes: Routes = [
  { path:'', redirectTo:'inicio',pathMatch: 'full' },
  { path:'inicio', component:HomeConfigComponent },
  { path:'proveedores', component:ProvidersComponent },
  { path:'reportes', component:ReportsComponent },
  { path:'roles', component:RolsComponent },
  { path:'usuarios', component:UsersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigRoutingModule { }
