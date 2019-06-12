import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtration'
})
export class FiltrationPipe implements PipeTransform {
  return: Array<any> = [];
  search: any = '';
  transform(value: Array<any>, ...arg): Array<any> {
    //arg[0] tipo de busqueda
    //arg[1] Busqueda
    //arg[2] Columnas que pertenecen a la busqueda
    if (value.length <= 0) return [];    
    if (!arg[0] || !arg[1]) return value;    
    // this.search = arg[2].map((data) => `String(dato.${data.key}).indexOf("${arg[1]}") >= 0 || `).reduce((prev, next) => prev + next);
    // if (arg[0] == 'all') {
    //   return value.filter(dato => eval(this.search.substr(0, this.search.length - 4)) )
    // } else {
    return value.filter(dato => {
      const exp = 'dato.' + arg[0];
      if (String(eval(exp)).toLowerCase().indexOf(arg[1]) >= 0) return dato;
    });
    // }
  }

}
