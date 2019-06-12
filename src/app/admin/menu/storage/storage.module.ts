import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StorageRoutingModule } from './storage-routing.module';
import { StorageComponent } from './storage.component';
// Subcategoires
import { SubcategoriesComponent } from './subcategories/subcategories.component';
import { ListSubcategoriesComponent } from './subcategories/list-subcategories/list-subcategories.component';
import { DetailsSubcategoriComponent } from './subcategories/details-subcategori/details-subcategori.component';
import { FormSubcategoriComponent } from './subcategories/form-subcategori/form-subcategori.component';
import { DeleteSubcategoriComponent } from './subcategories/delete-subcategori/delete-subcategori.component';
import { SubcategoriComponent } from './subcategories/subcategori/subcategori.component';
// Categoires
import { CategoriesComponent } from './categories/categories.component';
import { DeleteCategorieComponent } from './categories/delete-categorie/delete-categorie.component';
import { FormCategorieComponent } from './categories/form-categorie/form-categorie.component';
import { ListCategoriesComponent } from './categories/list-categories/list-categories.component';
import { DetailsCategoriComponent } from './categories/details-categori/details-categori.component';
import { CategoriComponent } from './categories/categori/categori.component';
// products
import { ProductsComponent } from './products/products.component';
import { FormProductComponent } from './products/form-product/form-product.component';
import { DeleteProductComponent } from './products/delete-product/delete-product.component';
import { DetailsProductComponent } from './products/details-product/details-product.component';
import { ListProductsComponent } from './products/list-products/list-products.component';
import { ProductComponent } from './products/product/product.component';
import { HomeStorageComponent } from './home-storage/home-storage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BootstrapModule } from 'src/app/bootstrap/bootstrap.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PipesModule } from '@pipes/pipes.module';


@NgModule({
  declarations: [StorageComponent, HomeStorageComponent,
    SubcategoriesComponent,
    CategoriesComponent,
    ProductsComponent,
    DeleteCategorieComponent,
    FormCategorieComponent,
    ListCategoriesComponent,
    CategoriComponent,
    DetailsCategoriComponent,
    FormProductComponent,
    DeleteProductComponent,
    DetailsProductComponent,
    ListProductsComponent,
    ProductComponent,
    SubcategoriComponent,
    ListSubcategoriesComponent,
    DetailsSubcategoriComponent,
    FormSubcategoriComponent,
    DeleteSubcategoriComponent,
    
  ],
  imports: [
    CommonModule,
    StorageRoutingModule,
    FormsModule,
    BootstrapModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    PipesModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class StorageModule { }
