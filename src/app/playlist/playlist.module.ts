import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaylistService } from './playlist.service';
import {  UsersService } from '../users/users.service';

import { PlaylistRoutingModule } from './playlist-routing.module';
import { PlaylistComponent } from './playlist.component';

@NgModule({
  imports: [
    CommonModule,
    PlaylistRoutingModule
  ],
  providers: [
    PlaylistService,
    UsersService
  ],
  declarations: [PlaylistComponent]
})
export class PlaylistModule { }
