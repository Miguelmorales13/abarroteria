import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: "ordering"
})
export class OrderingPipe implements PipeTransform {
  transform(value: Array<any>, ...args): Array<any> {
    if (!value) return [];
    
    //args[1] false == desendente,
    //args[1] true == asendente
    //args[0] key nombre del campo a a buscar,  
    return value.sort((prev: any, next: any) => {
      const dataNext = "next." + args[0];
      const dataPrev = "prev." + args[0];
      if (!args[1]) {
        if (eval(dataNext) > eval(dataPrev)) return 1;
        if (eval(dataNext) < eval(dataPrev)) return -1;
      } else {
        if (eval(dataPrev) > eval(dataNext)) return 1;
        if (eval(dataPrev) < eval(dataNext)) return -1;
      }
      return 0;
    });
  }
}
