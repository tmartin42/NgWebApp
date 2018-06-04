import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import {  AuthenticationService } from '../authentication/authentication.service';
import { DataService } from '../data.service';
import {PlaylistService} from '../playlist/playlist.service';

@Component({
  selector: 'app-discover',
  styleUrls: ['./discover.component.css', '../tabsystem.css'],
  templateUrl: './discover.component.html'
})


export class DiscoverComponent implements OnInit {

  public playlists: any;

  tab = 1;

  constructor(
    private router: Router,
    private dataService: DataService,
    private authService: AuthenticationService,
    private playlistService: PlaylistService
  ) {
  }

  public loadData() {
    this.playlistService.getPlaylists().subscribe(val => {this.playlists = val; });
  }


  public selectTab(nbr) {
    this.tab = -1;
    setTimeout(() => {this.tab = nbr; }, 100);
  }

  ngOnInit() {
    this.loadData();
  }

}
