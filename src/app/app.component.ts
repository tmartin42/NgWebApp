import { Component, OnInit } from '@angular/core';
import {RouteConfigLoadEnd, Router, NavigationEnd} from '@angular/router';
import {  AuthenticationService } from './authentication/authentication.service';
import { extract } from 'oembed-parser';
import { Jsonp } from '@angular/http';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  search = '';
  isAuth = false;
  embed;

  subscription: any;

  public logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  private fetchoembed(url) {
    return this.jsonp.request(`https://api.deezer.com/oembed?url=${url}&output=jsonp&callback=JSONP_CALLBACK&autoplay=true`, {method: 'Get'})
      .map(res => {
        return res.json();
      });
  }
/*
  listen(url) {

    this.fetchoembed().subscribe(val => {
      console.log(val);
      this.embed = val.html;
    });
  }*/

  getAuth(): void {
    this.authService.isAuthorized().subscribe(token => this.isAuth = token);
  }

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private jsonp: Jsonp,
    private dataService: DataService
  ) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getAuth();
      }
    });
  }

  changeListener(url) {
    console.log(url);
  }

  onActivate(e) {console.log(e);
    e.changeListen.subscribe(val => {this.fetchoembed(val).subscribe(res => {this.embed = res.html; console.log(res)}); } );
  }

  ngOnInit() {
    this.getAuth();

    /*extract('https://api.deezer.com/oembed?url=http://www.deezer.com/track/3135556').then((error, result) => {
      if (error) {
        console.error(error);
      } else {
        console.log('oEmbed result', result);
      }
    });*/
  }
}
