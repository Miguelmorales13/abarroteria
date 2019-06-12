import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path:'admin', loadChildren:'./admin/admin.module#AdminModule' },
  // { path: '**', component: NoFoundComponent , pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    // enableTracing:true,
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
