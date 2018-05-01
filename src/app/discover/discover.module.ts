import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataService } from '../data.service';

import { DiscoverRoutingModule } from './discover-routing.module';
import { DiscoverComponent } from './discover.component';

@NgModule({
  imports: [
    CommonModule,
    DiscoverRoutingModule
  ],
  providers: [
    DataService
  ],
  declarations: [DiscoverComponent]
})
export class DiscoverModule { }
