import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataService } from '../data.service';
import { FormsModule } from '@angular/forms';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    SearchRoutingModule
  ],
  providers: [
    DataService
  ],
  declarations: [SearchComponent]
})
export class SearchModule { }
