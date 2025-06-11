import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'italic'
})
export class ItalicPipe implements PipeTransform {

  transform(value: string): string {
    if(!value) return value;

    return `<i>${value}<i>`;
  }

}
