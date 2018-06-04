import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersService } from '../users/users.service';
import { FormsModule } from '@angular/forms';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {SanitizeHtml} from "../pipe";

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ProfileRoutingModule
  ],
  providers: [
    UsersService
  ],
  declarations: [ProfileComponent, SanitizeHtml]
})
export class ProfileModule { }
