import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersService } from '../users.service';
import { FormsModule } from '@angular/forms';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ProfileRoutingModule
  ],
  providers: [
    UsersService
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
