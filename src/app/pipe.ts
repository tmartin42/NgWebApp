import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'sanitizeHtml'})

export class SanitizeHtml implements PipeTransform  {
  constructor(
    private sanitizer: DomSanitizer
  ) {};

  transform(value) {
    return this.sanitizer.bypassSecurityTrustStyle(value);
  }
}

