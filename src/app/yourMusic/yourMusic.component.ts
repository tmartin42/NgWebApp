import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import {  AuthenticationService } from '../authentication/authentication.service';
import { YourMusicService } from './yourMusic.service';
import {UsersService} from "../users/users.service";
import {PlaylistService} from "../playlist/playlist.service";

@Component({
  selector: 'app-yourMusic',
  styleUrls: ['./yourMusic.component.css', '../tabsystem.css'],
  templateUrl: './yourMusic.component.html'
})


export class YourMusicComponent implements OnInit {


  @Output() errorEvent = new EventEmitter<any>();
  @Output() colorEvent = new EventEmitter<number>();
  playlists: any;
  friends: any;
  tab = 1;
  activateModal = false;
  modalTitle = '';
  modalInput = '';
  modalPlaceHolder = '';
  modalType = '';
  me: any;

  constructor(
    private router: Router,
    private yourMusicService: YourMusicService,
    private authService: AuthenticationService,
    private usersService: UsersService,
    private playlistService: PlaylistService
  ) {
  }

  public loadData() {

    this.playlistService.getPlaylists().subscribe(val => {
      this.playlists = val;
    }, err => {
      this.errorEvent.emit({msg: 'Unknown error while loading playlists'});
    });
    this.yourMusicService.getFriends().subscribe(val => {
      this.friends = val;
      }, err => {
        this.errorEvent.emit({msg: 'Unknown error while loading friends'});
      });
  }

  private resetModal() {
    this.modalTitle = '';
    this.modalInput = '';
    this.modalType = '';
    this.modalPlaceHolder = '';
  }

  public confirmModal() {
    if (this.modalType === 'playlist') {
      this.yourMusicService.newPlaylist(this.modalInput).subscribe(val => {
        this.playlists.push(val);
        this.errorEvent.emit({msg: `Successfully created new playlist !`, notError: true});
        }, err => {
        if (err.error && err.error.result) {
          this.errorEvent.emit({msg: err.error.result});
        } else {
          this.errorEvent.emit({msg: "Unknown error when creating playlist"});
        }
      });
    } else if (this.modalType === 'event') {
      this.yourMusicService.newEvent(this.modalInput).subscribe(val => {
        console.log(val);
        this.errorEvent.emit({msg: `Successfully created new event !`, notError: true});
      }, err => {
        console.log(err);
        if (err.error && err.error.result) {
          this.errorEvent.emit({msg: err.error.result});
        } else {
          this.errorEvent.emit({msg: "Unknown error when creating event"});
        }
    });
    }
    this.closeModal({srcElement: {className: 'modalCont opened'}});
  }

  public removeFriend(id) {
    this.usersService.removeFriend(id).subscribe(val => {
      console.log(val);
      this.friends.forEach((key, ids) => {
        if (key.id === id) {
          this.friends.splice(ids, 1);
          this.errorEvent.emit({msg: `Successfully removed friend`, notError: true});
        }
      });
    }, error => {
      this.errorEvent.emit({msg: `Unknow error while removing friend`});
      });
  }

  public closeModal(e) {
    if (e.srcElement.className === 'modalCont opened') {
      this.activateModal = false;
      this.resetModal();
    }
  }

  public newPlaylist() {
    this.modalTitle = 'New Playlist';
    this.modalType = 'playlist';
    this.activateModal = true;
    this.modalPlaceHolder = 'Title';
  }
  public newEvent() {
    this.modalTitle = 'New Event';
    this.modalType = 'event';
    this.activateModal = true;
    this.modalPlaceHolder = 'Title';
  }

  public selectTab(nbr) {
    this.tab = -1;
    this.colorEvent.emit(nbr);
    setTimeout(() => {this.tab = nbr; }, 100);
  }

  ngOnInit() {
    this.loadData();
    this.colorEvent.emit(1);
  }

}
