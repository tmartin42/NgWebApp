import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filterEvents'})

export class FilterEventsPipe implements PipeTransform {
  transform(items: any[], term: string): any {
    return items.filter(item => item.title.indexOf(term) !== -1);
  }
}
