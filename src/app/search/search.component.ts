import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {  AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  search = '';
  drop = 'All';
  dropbelow = 'All';
  tab = 1;
  close = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService
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
