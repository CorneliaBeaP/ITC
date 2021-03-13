import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'attributesAlphabetical'
})
export class AttributesAlphabeticalPipe implements PipeTransform {

  transform(attributes: any[]): any[] {
   return attributes.sort((a, b) => a.name.localeCompare(b.name));
  }

}
