import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import {  AuthenticationService } from '../authentication/authentication.service';
import {  SearchService } from './search.service';
import {  DeezerResult, DeezerResponse, Artist, Album, Genres, Track  } from './deezerResult';
import {DataService} from "../data.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {


  @Output() changeListen = new EventEmitter<string>();

  searchword = '';
  drop = 'Tracks';
  dropbelow = 'Tracks';
  tab = 1;
  close = false;

  tracksRes: Track[] = [];
  albumsRes: Album[] = [];
  eventsRes: Event[] = [];
  artistsRes: Artist[] = [];
  playlistsRes: Object[] = [];
  peopleRes: Object[] = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private searchService: SearchService,
    private dataService: DataService
  ) { }

  public selectTab(nbr) {
    this.tab = -1;
    setTimeout(() => {this.tab = nbr; }, 200);
  }

  public  setdrop(str) {
    this.close = true;
    this.drop = str;
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

  public listen(url) {
    console.log('listen');
    this.changeListen.emit(url);
  }

  public search() {

    console.log('1');
    if (this.searchword !== '' && this.drop !== '') {
      console.log(2);
      if (this.drop === 'Tracks' || this.drop === 'Artists' || this.drop === 'Albums') {
        this.searchService.searchDeezer(this.searchword, '/' + this.drop.substring(0, this.drop.length - 1).toLowerCase()).subscribe(val => {
          console.log(val);
          this.resetArrays();
          val.data.forEach((key) => {
            if (key.type === 'track') {
              this.tracksRes.push(key);
            } else if (key.type === 'album') {
              this.albumsRes.push(key);
            } else if (key.type === 'artist') {
              this.artistsRes.push(key);
            }
          });
        });
      } else if (this.drop === 'Tr') {
        console.log(3);
       /* this.searchService.searchDeezer(this.searchword, '').subscribe(val => {
          this.resetArrays();
           val.data.forEach((data) => {
              if (data.type === 'track') {
                this.tracksRes.push(data);
              } else if (data.type === 'album') {
                this.albumsRes.push(data);
              }
           });
        });*/
      }
    }
  }

}
