import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {  AuthenticationService } from '../authentication/authentication.service';
import {  SearchService } from './search.service';
import {  DeezerResult, DeezerResponse, Artist, Album, Genres, Track  } from './deezerResult';
import {DataService} from "../data.service";
import {UsersService} from "../users/users.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  @Input() cust;
  @Input() isSubpar;
  @Output() changeListen = new EventEmitter<number>();
  @Output() addedTrack = new EventEmitter<any>();
  @Output() addContributor = new EventEmitter<any>();
  @Output() errorEvent = new EventEmitter<string>();

  searchword = '';
  drop = 'Tracks';
  dropbelow = 'Tracks';
  tab = 1;
  close = false;
  filterstr = '';

  tracksRes: Track[] = [];
  albumsRes: Album[] = [];
  eventsRes: Event[] = [];
  artistsRes: Artist[] = [];
  playlistsRes: any[] = [];
  peopleRes: any[] = [];


  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private searchService: SearchService,
    private dataService: DataService,
    private usersService: UsersService
  ) {

  }

  public selectTab(nbr) {
    this.tab = -1;
    setTimeout(() => {this.tab = nbr; }, 200);
  }

  public  setdrop(str) {
    this.close = true;
    this.drop = str;
    this.search(13);
    setTimeout(() => {
      this.close = false;
      this.dropbelow = str;
    }, 300);
  }

  private resetArrays() {
    this.tracksRes = [];
    this.albumsRes = [];
    this.eventsRes = [];
    this.artistsRes = [];
    this.playlistsRes = [];
    this.peopleRes = [];
  }

  public addFriend(cont) {
    if (!this.isSubpar) {
      this.usersService.addFriend(cont.id).subscribe(val => {} , err => {
        this.errorEvent.emit('Error while adding a friend');
      });
    } else {
      this.addContributor.emit(cont);
    }
  }

  public listen(id) {
    this.changeListen.emit(id);
  }
  public addSong(cont) {
    this.addedTrack.emit(cont);
  }

  public search(e) {
    if ((e.keyCode === 13 || e === 13 )) {
      this.resetArrays();
      if (this.searchword !== '' && this.drop !== '') {
        this.filterstr = this.searchword;
        if (this.drop === 'Tracks' || this.drop === 'Artists' || this.drop === 'Albums') {
          this.searchService.searchDeezer(this.searchword, '/' + this.drop.substring(0, this.drop.length - 1).toLowerCase()).subscribe(val => {
            val.data.forEach((key) => {
              if (key.type === 'track') {
                this.tracksRes.push(key);
              } else if (key.type === 'album') {
                this.albumsRes.push(key);
              } else if (key.type === 'artist') {
                this.artistsRes.push(key);
              }
            });
          }, err => {
            this.errorEvent.emit('Error with deezer API');
          });
        } else if (this.drop === 'People') {

          this.searchService.searchPeople().subscribe(val => {
            this.peopleRes = val;
          }, err => {
            this.errorEvent.emit('Error while searching people ');
          });
        } else if (this.drop === 'Playlists') {

          this.searchService.searchPlaylists().subscribe(val => {
            this.playlistsRes = val;
          }, err => {
            this.errorEvent.emit('Error while searching playlist');
          });
        } else if (this.drop === 'Events') {

          this.searchService.searchEvents().subscribe(val => {
            this.eventsRes = val;
          }, err => {
            this.errorEvent.emit('Error while searching events');
          });
        }
      }
    }
  }

  ngOnInit() {

    if (!this.isSubpar) {
      this.isSubpar = false;
    }
    if (this.cust) {
      this.drop = this.cust;
      this.dropbelow = this.cust;
    }
  }
}
