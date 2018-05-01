import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataService } from '../data.service';

import { PlaylistRoutingModule } from './playlist-routing.module';
import { PlaylistComponent } from './playlist.component';

@NgModule({
  imports: [
    CommonModule,
    PlaylistRoutingModule
  ],
  providers: [
    DataService
  ],
  declarations: [PlaylistComponent]
})
export class PlaylistModule { }
