import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonpModule, Jsonp } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import {  SearchService } from './search.service';
import {DataService} from '../data.service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    SearchRoutingModule,
    JsonpModule,
  ],
  providers: [
    SearchService,
    DataService
  ],
  declarations: [SearchComponent]
})
export class SearchModule { }
