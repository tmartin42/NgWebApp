import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {  AuthenticationService } from '../../authentication/authentication.service';
import {  UsersService } from '../users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  profile = '';
  drop = 'All';
  dropbelow = 'All';
  tab = 1;
  close = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private usersService: UsersService
  ) { }

  public selectTab(nbr) {
    this.tab = -1;
    setTimeout(() => {this.tab = nbr; }, 200);
  }

  public  setdrop(str) {
    this.close = true;
    this.drop = str;
    setTimeout(() => {
      this.close = false;
      this.dropbelow = str;
    }, 300);
  }

}
