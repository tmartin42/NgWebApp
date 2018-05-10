import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PlaylistService } from './playlist.service';
import {  UsersService } from '../users/users.service';

import { PlaylistRoutingModule } from './playlist-routing.module';
import { PlaylistComponent } from './playlist.component';
import { SearchComponent } from "../search/search.component";
import { SearchService } from "../search/search.service";
import {DataService} from "../data.service";

@NgModule({
  imports: [
    CommonModule,
    PlaylistRoutingModule,
    FormsModule
  ],
  providers: [
    PlaylistService,
    UsersService,
    SearchService,
    DataService
  ],
  declarations: [PlaylistComponent, SearchComponent]
})
export class PlaylistModule { }
