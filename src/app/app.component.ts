import { Component, OnInit } from '@angular/core';
import {RouteConfigLoadEnd, Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import {  AuthenticationService } from './authentication/authentication.service';
import { extract } from 'oembed-parser';
import { Jsonp } from '@angular/http';
import { DataService } from './data.service';
import { ErrorService } from "./error.service";
import {Observable} from "rxjs/Observable";
import {DomSanitizer} from "@angular/platform-browser";
import {PlaylistService} from "./playlist/playlist.service";

declare let DZ: any;
declare let $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  search = '';
  isAuth = false;
  color = 1;
  lol = false;
  changePos = true;
  duration;
  playlist: any;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private jsonp: Jsonp,
    public errorService: ErrorService,
  ) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getAuth();
      }
    });
  }

  public logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  public addError(e) {
    this.errorService.addError(e);
  }

  getAuth(): void {

    const dis = this;

    function onPlayerLoaded() {
      $("#controlers input").attr('disabled', false);

      dis.duration = localStorage.getItem('duration');
      const id = localStorage.getItem('trackID');
      const playlistStr = localStorage.getItem('playlist');
      if (playlistStr != null) {
        const playlist = JSON.parse(playlistStr);
        const pi = localStorage.getItem('pi');

        if (dis.duration === null) {
          this.changePos = false;
        }
        DZ.player.playTracks(playlist.tracks, false, Number(pi));
        dis.setPlaylist(playlist);
      } else if (id !== null) {
        if (dis.duration === null) {
          this.changePos = false;
        }
        DZ.player.playTracks([id], false);
      } else {
        this.changePos = false;
      }

      DZ.Event.subscribe('current_track', function (arg) {
        localStorage.setItem('pi', arg.index.toString());
        $('.playing').removeClass('playing');
        $('.song[trackid="' + arg.track.id + '"]').addClass('playing');

      });
      DZ.Event.subscribe('player_position', function (arg) {
          localStorage.setItem('duration', (100 * arg[0] / arg[1]).toString());
      });
      DZ.Event.subscribe('player_play', (arg) => {
        if (dis.changePos === true) {
          dis.changePos = false;
          if (dis.duration < 95) {
            DZ.player.seek(dis.duration);
          }
        }
      });
    }

    this.authService.isAuthorized().subscribe(token => {
      this.isAuth = token;
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

  public setPlaylist(newVal) {
    this.playlist = newVal;
  }

  onActivate(e) {
    this.color = 1;
    if (this.errorService.errors.length > 0 ) {
      this.errorService.errors = [];
    }
    if (e.changeListen) {
      e.changeListen.subscribe(val => {
        DZ.player.playTracks([val]);

        localStorage.setItem('trackID', val);
        localStorage.setItem('playlist', null);
      });
    }
    if (e.listenPlaylist) {
      e.listenPlaylist.subscribe(val => {

        console.log(val.tracks);
        DZ.player.playTracks(val.tracks, val.index);

        localStorage.setItem('playlist', JSON.stringify(val));
        localStorage.setItem('pi', val.index.toString());

        this.playlist = val;
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

  ngOnInit() {

    let max = 30;
    this.getAuth();
    const int = setInterval(() => {
      if (this.playlist || max <= 0) {
        clearInterval(int);
      }
      max--;
    }, 1000);


  }
}
