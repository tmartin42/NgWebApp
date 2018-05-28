import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {  AuthenticationService } from '../authentication/authentication.service';
import {  PlaylistService } from './playlist.service';
import {  UsersService } from '../users/users.service';
import {  User } from '../users/user';
import {  Playlist } from './playlist';
import { DataService } from "../data.service";
import { Observable } from 'rxjs';
import { ViewEncapsulation } from '@angular/core';
import {createElement} from "@angular/core/src/view/element";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css', '../tabsystem.css']
})



export class PlaylistComponent implements OnInit {

  @Input() currTrack;
  @Output() changeListen = new EventEmitter<string>();
  @Output() listenPlaylist = new EventEmitter<any>();
  @Output() colorEvent = new EventEmitter<number>();
  @Output() errorEvent = new EventEmitter<string>();

  tab = 1;

  custDrop = 'People';

  playlist: Playlist;
  owner: User;
  contributors: any[] = [];
  tracks: any[] = [];
  tracksOK = false;
  moveit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private playlistService: PlaylistService,
    private usersService: UsersService,
    private dataService: DataService
  ) { }



  public addTrack(e) {
    this.playlistService.addTrack(this.playlist.id, e.id).subscribe(val => {
      this.tracks.push(e);
      this.playlist.tracks.push(e.id);
      console.log("tracks ???? ", this.playlist.tracks);
    }, err => {
      this.errorEvent.emit('Error while adding a track');
    });
  }

  public addContributor(e) {
    this.playlistService.addContributor(this.playlist.id, e.id).subscribe(val => {
      this.contributors.push(e);
    }, err => {
      this.errorEvent.emit('Error while adding a contributor');
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
    }, err => {
      this.errorEvent.emit('Error while removing a contributor');
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
    }, err => {
      this.errorEvent.emit('Error while deleting a track from the playlist');
    });
  }

  public playIt(id) {
    console.log({tracks: this.playlist.tracks, index: id, title: this.playlist.title, id: this.playlist.id})
    this.listenPlaylist.emit({tracks: this.playlist.tracks, index: id, title: this.playlist.title, id: this.playlist.id});
  }

  moveBot(tid, id) {
    console.log(id);
    if (id < this.tracks.length - 1 && id >= 0) {
      this.playlistService.moveTrack(this.playlist.id, tid, id + 1).subscribe(val => {
        console.log(val);
        const tmp = this.tracks[id];
        const tmp2 = this.tracks[id + 1];
        this.tracks[id] = tmp2;
        this.tracks[id + 1] = tmp;
      }, err => {
        this.errorEvent.emit('Error while moving this track down');
      });
    }
  }

  moveTop(tid, id) {
    if (id > 0 && id <= this.tracks.length - 1) {
      this.playlistService.moveTrack(this.playlist.id, tid, id - 1).subscribe(val => {
        console.log(val);
        const tmp = this.tracks[id];
        const tmp2 = this.tracks[id - 1];
        this.tracks[id] = tmp2;
        this.tracks[id - 1] = tmp;
      }, err => {
        this.errorEvent.emit('Error while moving this track up');
      });
    }
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



  private getPlaylist() {
    this.playlistService.getPlaylist(this.route.snapshot.paramMap.get('id')).subscribe(val => {
      this.playlist = val;

      val.tracks.forEach((key, id) => {
        this.dataService.getTrack(key).subscribe(vel => this.tracks[id] = vel);
      });

      val.contributors.forEach((key, id) => {
        this.usersService.getUser(key).subscribe(vel => this.contributors[id] = vel);
      });

      this.usersService.getUser(val.creator).subscribe(owner => this.owner = owner);
    });
  }

  ngOnInit() {
    this.getPlaylist();
    setTimeout(() => {
      this.colorEvent.emit(2);
      },100);
  }
}
