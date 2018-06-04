import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataService } from '../data.service';

import { DiscoverRoutingModule } from './discover-routing.module';
import { DiscoverComponent } from './discover.component';
import {PlaylistService} from '../playlist/playlist.service';

@NgModule({
  imports: [
    CommonModule,
    DiscoverRoutingModule
  ],
  providers: [
    DataService,
    PlaylistService
  ],
  declarations: [DiscoverComponent]
})
export class DiscoverModule { }
