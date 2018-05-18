import { Component, OnInit } from '@angular/core';
import {RouteConfigLoadEnd, Router, NavigationEnd} from '@angular/router';
import {  AuthenticationService } from './authentication/authentication.service';
import { extract } from 'oembed-parser';
import { Jsonp } from '@angular/http';
import { DataService } from './data.service';
import { ErrorService } from "./error.service";
import {Observable} from "rxjs/Observable";
import {DomSanitizer} from "@angular/platform-browser";

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
  color = 1;
  src;

  subscription: any;

  public logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  private fetchoembed(url) {
    return this.jsonp.request(`https://api.deezer.com/oembed?url=${url}&output=jsonp&callback=JSONP_CALLBACK&autoplay=true`,
      {method: 'Get'})
      .map(res => {
        return res.json();
      });
  }



  public addError(e) {
    this.errorService.addError(e);
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
    private dataService: DataService,
    public errorService: ErrorService,
    public sanitizer: DomSanitizer
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

  onActivate(e) {
    if (this.errorService.errors.length > 0 ) {
      this.errorService.errors = [];
    }
    if (e.changeListen) {
      e.changeListen.subscribe(val => {
        console.log(val);
        this.src = this.sanitizer.bypassSecurityTrustResourceUrl(`http://www.deezer.com/plugins/player?type=tracks&id=${val}&autoplay=true`);

      /*  this.fetchoembed(val).subscribe(res => {
          this.embed = res.html;
        });*/
      });
    }
    if (e.errorEvent) {

      e.errorEvent.subscribe(val => {
        this.addError(val);
      });
    }
    if (e.colorEvent) {
      e.colorEvent.subscribe( val => {

        this.color = val;
      });
    }
  }

  public closeError(id) {
    this.errorService.removeError(id);
  }

  public loaded (e) {
    console.log(e);
    // contentWindow.getElementById('widget-cover-thumbnail').trigger('click');
  }

  test(e) {
 /*   console.log('test1', e);
    console.log ('test2', e.target.firstChild.id);
    console.log('test3', (e.target && e.target.firstChild && e.target.firstChild.localName && e.target.firstChild.id === 'dzplayer'))
    if (e.target && e.target.firstChild && e.target.firstChild.localName && e.target.firstChild.id === 'dzplayer') {
      e.target.firstChild.onload(this.loaded);
    }*/
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
