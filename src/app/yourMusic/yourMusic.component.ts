import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import {  AuthenticationService } from '../authentication/authentication.service';
import { YourMusicService } from './yourMusic.service';

@Component({
  selector: 'app-yourMusic',
  styleUrls: ['./yourMusic.component.css', '../tabsystem.css'],
  templateUrl: './yourMusic.component.html'
})


export class YourMusicComponent implements OnInit {


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
    private authService: AuthenticationService
  ) {
  }

  public loadData() {

    this.yourMusicService.getMe().subscribe(val => {
      this.me = val;
      this.friends = this.me.friends;
    });
    this.yourMusicService.getPlaylists().subscribe(val => {
      this.playlists = val;
    });
    this.yourMusicService.getFriends().subscribe(val => {
      this.playlists = val;
    });
  }

  private resetModal() {
    console.log('rrrreset');
    this.modalTitle = '';
    this.modalInput = '';
    this.modalType = '';
    this.modalPlaceHolder = '';
  }

  public confirmModal() {
    if (this.modalType === 'playlist') {
      console.log(this.modalInput);
      this.yourMusicService.newPlaylist(this.modalInput).subscribe(val => {
        console.log(val);
      });
    }
  }

  public closeModal(e) {
    console.log(e);
    if (e.srcElement.className === 'modalCont opened') {
      console.log('reset');
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

  public selectTab(nbr) {
    this.tab = -1;
    setTimeout(() => {this.tab = nbr; }, 100);
  }

  ngOnInit() {
    console.log('lol');
    this.loadData();
  }

}
