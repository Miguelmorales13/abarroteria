import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'medicion'
})
export class MedicionPipe implements PipeTransform {

  transform(value: number, ...args: any): string | number {
    if (!value) return 0;
    if (args[0]=='litros'){
      return args[1]=='mililitros'?`${value} ml.`:`${value/1000} L.`
    }else if(args[0]=='kilos'){
      return args[1]=='gramos'?`${value} g.`:`${value/1000} Kg.`
    }else{
      return `${value} c/u`
    }
  }

}
