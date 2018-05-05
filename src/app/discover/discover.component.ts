import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import {  AuthenticationService } from '../authentication/authentication.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-discover',
  styleUrls: ['./discover.component.css', '../tabsystem.css'],
  templateUrl: './discover.component.html'
})


export class DiscoverComponent implements OnInit {

  public users$: Observable<any>;
  public data$: Observable<any>;

  tab = 1;

  constructor(
    private router: Router,
    private dataService: DataService,
    private authService: AuthenticationService
  ) {
    console.log(this.users$);
  }

  public loadData() {
    this.users$ = this.dataService.getUsers();
  }


  public selectTab(nbr) {
    this.tab = -1;
    setTimeout(() => {this.tab = nbr; }, 200);
  }

  ngOnInit() {
    console.log('lol');
    this.loadData();
  }

}
