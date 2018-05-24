import { Component, OnInit } from '@angular/core';
import {RouteConfigLoadEnd, Router, NavigationEnd} from '@angular/router';
import {  AuthenticationService } from './authentication/authentication.service';
import { extract } from 'oembed-parser';
import { Jsonp } from '@angular/http';
import { DataService } from './data.service';
import { ErrorService } from "./error.service";
import {Observable} from "rxjs/Observable";
import {DomSanitizer} from "@angular/platform-browser";

declare var DZ: any;
declare var $: any;

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
  loadAPI: Promise<any>;
  subscription: any;
  lol = false;

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

    function onPlayerLoaded() {
      $("#controlers input").attr('disabled', false);
      console.log('player_loaded');

      let duration = localStorage.getItem('duration');
      let id = localStorage.getItem('trackID');
      setTimeout(()=>{console.log(id)}, 200);
      console.log(id, duration);


      if (id !== null) {
        if (duration !== null) {
          console.log('here');
          DZ.player.playTracks([925108, 87757545, 421491162], 2, duration);
        } else {
          DZ.player.playTracks([id]);
        }
      }

      DZ.Event.subscribe('current_track', function (arg) {
        console.log('current_track', arg);
        localStorage.setItem('trackID', arg.track.id);
      });
      DZ.Event.subscribe('player_position', function (arg) {
        console.log('position', arg[0], arg[1]);
        $("#slider_seek").find('.bar').css('width', (100 * arg[0] / arg[1]) + '%');
          localStorage.setItem('duration', arg[0]);
      });
    }

    this.authService.isAuthorized().subscribe(token => {
      this.isAuth = token;
    console.log('token: ', token);

    if (token !== false && this.lol === false) {

      this.lol = true;
      setTimeout(() => {
        DZ.init({
          appId: '8',
          channelUrl: 'https://developers.deezer.com/examples/channel.php',
          player: {
            container: 'player',
            playlist: false,
            onload: onPlayerLoaded
          }
        });
      }, 100);
    }
    });

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
    //    this.src = this.sanitizer.bypassSecurityTrustResourceUrl(`http://www.deezer.com/plugins/player?type=tracks&id=${val}&autoplay=true`);
        DZ.player.addToQueue([val]);
        setTimeout(()=>{
          DZ.player.play();
          },100);
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





  public loadScript() {
    var isFound = false;
    var scripts = document.getElementsByTagName("script")
    for (var i = 0; i < scripts.length; ++i) {
      if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("loader")) {
        isFound = true;
      }
    }

    if (!isFound) {
      var dynamicScripts = ["https://e-cdns-files.dzcdn.net/js/min/dz.js"];

      for (var i = 0; i < dynamicScripts .length; i++) {
        let node = document.createElement('script');
        node.src = dynamicScripts [i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
      }

    }
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
