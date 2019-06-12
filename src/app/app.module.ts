import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NoFoundComponent } from './no-found/no-found.component';
import { CoreService } from '@services/configuration/core.service';
import { GlobalService } from '@services/configuration/global.service';
import { SessionsService } from '@services/petitions/sessions.service';
import { InicioComponent } from './inicio/inicio.component';
import { BootstrapModule } from './bootstrap/bootstrap.module';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesService } from '@services/petitions/categories.service';
import { AccessService } from '@services/configuration/access.service';
import { NgbModule } from  '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AppComponent, NoFoundComponent, InicioComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFontAwesomeModule,
    BootstrapModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [CoreService, GlobalService, SessionsService, CategoriesService, AccessService],
  bootstrap: [AppComponent]
})
export class AppModule {}
