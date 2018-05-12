import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {  AuthenticationService } from '../authentication/authentication.service';
import {  PlaylistService } from './playlist.service';
import {  UsersService } from '../users/users.service';
import {  User } from '../users/user';
import {  Playlist } from './playlist';
import { DataService } from "../data.service";
import { Observable } from 'rxjs/Observable';
import { ViewEncapsulation } from '@angular/core';
import {createElement} from "@angular/core/src/view/element";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css', '../tabsystem.css']
})



export class PlaylistComponent implements OnInit {

  @Output() changeListen = new EventEmitter<string>();

  tab = 1;

  custDrop = 'People';

  playlist: Playlist;
  owner: User;
  contributors: any[] = [];
  tracks: any[] = [];
  tracksOK = false;
  moveit = false;
  moving;
  movid;
  style;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private playlistService: PlaylistService,
    private usersService: UsersService,
    private dataService: DataService
  ) { }



  public addTrack(e) {
    console.log("addtrack", e);
    this.playlistService.addTrack(this.playlist.id, e).subscribe(val => {console.log(val); });
  }

  public addContributor(e) {
    this.playlistService.addContributor(this.playlist.id, e).subscribe(val => {
      console.log(val);

    });
  }

  public removeContributor(id) {
    this.playlistService.removeContributor(this.playlist.id, id).subscribe(val => {
      console.log(val);
      this.contributors.forEach((key, ids) => {
        if (key.id === id) {
          this.contributors.splice(ids, 1);
        }
      });
    });
  }

  public removeTrack(id) {
    this.playlistService.removeTrack(this.playlist.id, id).subscribe(val => {
      console.log(val);
      this.tracks.forEach((key, ids) => {
        console.log(key.id, id);
        if (key.id === id) {
          this.tracks.splice(ids, 1);
        }
      });
    });
  }

  public move(e) {
    if (this.moveit && this.moving === e.target) {
      let mov;
      console.log(e);
      if (e.target.className === 'song') {
        console.log(1);
        mov = e.target;
      } else if (e.target.parentNode.className === 'song') {
        console.log(2);
        mov = e.target.parentNode;
      } else if (e.target.parentNode.parentNode.className === 'song' ) {
        console.log(3);
        mov = e.target.parentNode.parentNode;
      }
      if (mov) {
        //  const mov = e.target.parent  .getElementsByClassName('moveSong');
        const x = (e.clientX - this.ox) + mov.parentNode.offsetLeft;
        const y = ( e.clientY - this.oy) + mov.parentNode.offsetTop;
        this.style = {top: `${y}px`, left: `${x}px`};
        console.log({top: `${y}px`, left: `${x}px`})
      }
    }
  }

  public over(e) {
    console.log(e.srcElement);
  }

  public releaseTrack(e) {
    this.movid = null;
    this.moveit = false;
    this.moving = null;
  }

  public subchangeListen(e) {
    this.changeListen.emit(e);
    console.log("subchange", e);
  }

  public onActivate(e) {
    console.log("onActivate", e);
  }

  public selectTab(nbr) {
    this.tab = -1;
    setTimeout(() => {this.tab = nbr; }, 200);
  }

  ox = 0;
  oy = 0;

  public moveTrack(e, id, index) {

    console.log(e);

    if (e.target.className === 'moveSong') {
      this.moveit = true;
      this.moving = e.target.parentNode;
      console.log(id);
      this.tracks.splice(index, 0, {});
      console.log(this.moving);
      this.movid = id;
      this.ox = e.clientX;
      this.oy = e.clientY;
      const x = e.target.parentNode.parentNode.offsetLeft;
      const y = e.target.parentNode.parentNode.offsetTop;
      this.style = {top: `${y}px`, left: `${x}px`};
    }
  }

  private getPlaylist() {
    this.playlistService.getPlaylist(this.route.snapshot.paramMap.get('id')).subscribe(val => {
      this.playlist = val;

      val.tracks.forEach((key, id) => {
        this.dataService.getTrack(key).subscribe(vel => this.tracks.push(vel));
      });

      val.contributors.forEach((key, id) => {
        this.usersService.getUser(key).subscribe(vel => this.contributors.push(vel));
      });

      this.usersService.getUser(val.creator).subscribe(owner => this.owner = owner);
    });
  }

  ngOnInit() {
    this.getPlaylist();

  }
}
