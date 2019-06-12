import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(value: Array<any>, ...args): Array<any> {
    // args[0].start inicico delregistro de paginas
    // args[0].end termino del registro de pagina
    // args[0].noDataView numero de registros por pagina
    // args[0].pageActive pagina activa
    if (!value) return [];
    if (value.length <= args[0].noDataView) {
      return value;
    } else {
      const inicio = args[0].start ;
      const termino = args[0].end;
      return value.filter((data, i) => {
        if (i >= inicio && i <= termino) {
          return data;
        }
      });
    }
  }

}
