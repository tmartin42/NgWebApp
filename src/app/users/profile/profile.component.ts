import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import {  AuthenticationService } from '../../authentication/authentication.service';
import {  UsersService } from '../users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  me;
  tab = 1;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private usersService: UsersService
  ) { }




  ngOnInit() {
    this.usersService.getMe().subscribe(me => {this.me = me; console.log(me)});
  }

}
