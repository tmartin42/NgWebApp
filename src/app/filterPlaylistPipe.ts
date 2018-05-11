import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filterPlaylist'})

export class FilterPlaylistPipe implements PipeTransform {
  transform(items: any[], term: string): any {
    return items.filter(item => item.title.indexOf(term) !== -1);
  }
}
