import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {  AuthenticationService } from '../authentication/authentication.service';
import {  PlaylistService } from './playlist.service';
import {  UsersService } from '../users/users.service';
import {  User } from '../users/user';
import {  Playlist } from './playlist';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css', '../tabsystem.css']
})



export class PlaylistComponent implements OnInit {

  tab = 1;

  public playlist$: Observable<Playlist>;
  public owner$: Observable<User>;

  playlist: Playlist;
  owner: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private playlistService: PlaylistService,
    private usersService: UsersService
  ) { }

  public selectTab(nbr) {
    this.tab = -1;
    setTimeout(() => {this.tab = nbr; }, 200);
  }

  private getPlaylist() {
    this.playlistService.getPlaylist(this.route.snapshot.paramMap.get('id')).subscribe(val => {
      this.playlist = val;
      this.usersService.getUser(val.creator).subscribe(owner => this.owner = owner);
    });
  }

  ngOnInit() {
    this.getPlaylist();
  }
}
