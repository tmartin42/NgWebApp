import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filterPeople'})

export class FilterPeoplePipe implements PipeTransform {
  transform(items: any[], term: string): any {
    return items.filter(item => item.username.indexOf(term) !== -1);
  }
}
