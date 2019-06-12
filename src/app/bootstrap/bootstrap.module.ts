import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidateComponent } from './validate/validate.component';
import { ModalComponent } from './modal/modal.component';
import { PaginationComponent } from './pagination/pagination.component';
import { TdComponent } from './td/td.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ValidateComponent, ModalComponent, PaginationComponent, TdComponent],
  imports: [CommonModule, NgbDropdownModule],
  exports: [ValidateComponent, ModalComponent, PaginationComponent, TdComponent]
})
export class BootstrapModule {}
