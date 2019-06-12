import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PathReplacePipe } from './pipes/path-replace.pipe';
import { PaginationPipe } from './pipes/pagination.pipe';
import { FiltrationPipe } from './pipes/filtration.pipe';
import { OrderingPipe } from './pipes/ordering.pipe';
import { MedicionPipe } from './pipes/medicion.pipe';
import { ConvertMeasurePipe } from './pipes/convert-measure.pipe';

@NgModule({
  declarations: [
    PathReplacePipe,
    PaginationPipe,
    FiltrationPipe,
    OrderingPipe,
    MedicionPipe,
    ConvertMeasurePipe,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    PathReplacePipe,
    PaginationPipe,
    FiltrationPipe,
    OrderingPipe,
    MedicionPipe
  ]
})
export class PipesModule { }
