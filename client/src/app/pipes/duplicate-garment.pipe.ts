import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'duplicateGarment'
})
export class DuplicateGarmentPipe implements PipeTransform {

  transform(array: any[]): any[] {
    return array.filter((a, b) => array.indexOf(a) === b)
  }
}
