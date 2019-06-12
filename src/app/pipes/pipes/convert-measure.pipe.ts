import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertMeasure'
})
export class ConvertMeasurePipe implements PipeTransform {

  transform(value: number, ...args: any): string | number {
    if (!value) return 0;
    switch (args[0]) {
      case 'litros':
        return `${value} L.`
      case 'mililitros':
        return `${value} ml.`
      case 'kilos':
        return `${value} kg.`
      case 'gramos':
        return `${value} g.`
      default:
        return `${value} c/u`
    }
  }

}
