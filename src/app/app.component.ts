import { Component, OnInit } from '@angular/core';
import {RouteConfigLoadEnd, Router, NavigationEnd} from '@angular/router';
import {  AuthenticationService } from './authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  search = '';
  isAuth = false;

  public logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  ngOnInit() {
    this.getAuth();
  }

  getAuth(): void {
    this.authService.isAuthorized().subscribe(token => this.isAuth = token);
  }

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getAuth();
      }
    });
  }
}
