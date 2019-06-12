import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pathReplace'
})
export class PathReplacePipe implements PipeTransform {

  transform(value: string, args?: any): string {
    return (value) ? value.replace(/ /g, '-') : '';
  }

}
