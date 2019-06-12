import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeStorageComponent } from './home-storage/home-storage.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { SubcategoriesComponent } from './subcategories/subcategories.component';

const routes: Routes = [
  { path:'', redirectTo:'inicio', pathMatch:'full' },
  { path:'inicio', component:HomeStorageComponent },
  { path:'productos', component:ProductsComponent },
  { path:'categorias', component:CategoriesComponent },
  { path:'subcategorias', component:SubcategoriesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StorageRoutingModule { }
