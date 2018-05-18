import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import {  AuthenticationService } from '../authentication/authentication.service';
import { YourMusicService } from './yourMusic.service';
import {UsersService} from "../users/users.service";

@Component({
  selector: 'app-yourMusic',
  styleUrls: ['./yourMusic.component.css', '../tabsystem.css'],
  templateUrl: './yourMusic.component.html'
})


export class YourMusicComponent implements OnInit {


  @Output() errorEvent = new EventEmitter<string>();
  @Output() colorEvent = new EventEmitter<number>();
  playlists: any;
  friends: any[] = [];
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
    private usersService: UsersService
  ) {
  }

  public loadData() {

    this.yourMusicService.getPlaylists().subscribe(val => {
      this.playlists = val;
    }, err => {
      this.errorEvent.emit('Unknown error while loading playlists');
    });
    this.yourMusicService.getFriends().subscribe(val => {
      this.friends = val;
      }, err => {
        this.errorEvent.emit('Unknown error while loading friends');
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
        }, err => {
        if (err.error && err.error.result) {
          this.errorEvent.emit(err.error.result);
        } else {
          this.errorEvent.emit("Unknown error when creating playlist");
        }
      });
    } else if (this.modalType === 'event') {
      this.yourMusicService.newEvent(this.modalInput).subscribe(val => {
        console.log(val);
      }, err => {
        console.log(err);
        if (err.error && err.error.result) {
          this.errorEvent.emit(err.error.result);
        } else {
          this.errorEvent.emit("Unknown error when creating event");
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
        }
      });
    }, error => {
      this.errorEvent.emit(`Unknow error while removing friend`);
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
    console.log('lol');
    this.loadData();
  }

}
