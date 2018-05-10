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

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css', '../tabsystem.css'],
  encapsulation: ViewEncapsulation.None
})



export class PlaylistComponent implements OnInit {

  @Output() changeListen = new EventEmitter<string>();

  tab = 1;

  custDrop = 'People';

  playlist: Playlist;
  owner: User;

  tracksOK = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private playlistService: PlaylistService,
    private usersService: UsersService,
    private dataService: DataService
  ) { }

  filterNumbers(){
    return this.playlist.tracks.filter(x => typeof(x) !== 'number');
  }

  public addTrack(e) {
    console.log("addtrack", e);
    this.playlistService.addTrack(this.playlist.id, e).subscribe(val => {console.log(val); });
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
    setTimeout(() => {this.tab = nbr; }, 100);
  }

  private getPlaylist() {
    this.playlistService.getPlaylist(this.route.snapshot.paramMap.get('id')).subscribe(val => {
      this.playlist = val;

      val.tracks.forEach((key, id) => {
        this.dataService.getTrack(key).subscribe(vel => this.playlist.tracks[id] = vel);
      });

      this.usersService.getUser(val.creator).subscribe(owner => this.owner = owner);
    });
  }

  ngOnInit() {
    this.getPlaylist();
  }
}
