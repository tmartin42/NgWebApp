import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataService } from '../data.service';

import { FormsModule } from '@angular/forms';
import { YourMusicRoutingModule } from './yourMusic-routing.module';
import { YourMusicComponent } from './yourMusic.component';
import {  YourMusicService } from './yourMusic.service';
import { UsersService } from '../users/users.service';
import {PlaylistService} from "../playlist/playlist.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    YourMusicRoutingModule
  ],
  providers: [
    YourMusicService,
    UsersService,
    PlaylistService
  ],
  declarations: [YourMusicComponent]
})
export class YourMusicModule { }
