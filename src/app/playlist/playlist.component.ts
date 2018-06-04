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
  @Output() errorEvent = new EventEmitter<any>();

  tab = 1;

  custDrop = 'People';

  playlist: Playlist;
  owner: User;
  contributors: any;
  tracks: any = [];
  newTitle = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private playlistService: PlaylistService,
    private usersService: UsersService,
    private dataService: DataService
  ) { }


  public addTrack(e) {
    this.playlistService.addTrack(this.playlist.id, e.id).subscribe(val => {
      this.tracks.push(e);
      this.playlist.tracks.push(e.id);
      this.errorEvent.emit({msg: `Successfully added ${e.title} in tracklist`, notError: true});
    }, err => {
      this.errorEvent.emit({msg: 'Error while adding a track'});
    });
  }

  public addContributor(e) {
    this.playlistService.addContributor(this.playlist.id, e.id).subscribe(val => {
      this.contributors.push(e);
      this.errorEvent.emit({msg: `Successfully added ${e.username} as contributor`, notError: true});
    }, err => {
      this.errorEvent.emit({msg: 'Error while adding a contributor'});
    });
  }

  public removeContributor(id) {
    this.playlistService.removeContributor(this.playlist.id, id).subscribe(val => {
      console.log(val);
      this.contributors.forEach((key, ids) => {
        if (key.id === id) {
          this.contributors.splice(ids, 1);
          this.errorEvent.emit({msg: `Contributor successfully removed`, notError: true});
        }
      });
    }, err => {
      this.errorEvent.emit({msg: 'Error while removing a contributor'});
    });
  }

  public removeTrack(id) {
    this.playlistService.removeTrack(this.playlist.id, id).subscribe(val => {
      console.log(val);
      this.tracks.forEach((key, ids) => {
        console.log(key.id, id);
        if (key.id === id) {
          this.tracks.splice(ids, 1);
          this.errorEvent.emit({msg: `Track successfully removed`, notError: true});
        }
      });
    }, err => {
      this.errorEvent.emit({msg: 'Error while deleting a track from the playlist'} );
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
        this.errorEvent.emit({msg: 'Error while moving this track down'});
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
        this.errorEvent.emit({msg: 'Error while moving this track up'});
      });
    }
  }

  public subchangeListen(e) {
    this.changeListen.emit(e);
  }

  public selectTab(nbr) {
    this.tab = -1;
    setTimeout(() => {this.tab = nbr; }, 200);
  }

  public  confirmChangeTitle() {
    this.playlistService.changeTitle(this.playlist.id, this.newTitle).subscribe(val => {
      this.playlist.title = this.newTitle;
      this.errorEvent.emit({msg: 'Title updated', notError: true});
    }, err => {
      this.errorEvent.emit({msg: 'Error while changing title'});
    });
  }

  public confirmdeleteplaylist() {
    this.playlistService.deletePlaylist(this.playlist.id).subscribe(val => {
      this.router.navigateByUrl('/').then(() => {this.errorEvent.emit({msg: 'Title updated', notError: true}); });
    }, err => {
      this.errorEvent.emit({msg: 'Error while deleting playlist'});
    });
  }

  public changePublic() {
      this.playlistService.togglePublic(this.playlist.id, !this.playlist.isPublic).subscribe(val => {
        if (this.playlist.isPublic) {
          this.errorEvent.emit({msg: 'Playlist is now private', notError: true});
        } else {
          this.errorEvent.emit({msg: 'Playlist is now public', notError: true});
        }
        this.playlist.isPublic = !this.playlist.isPublic;
      }, err => {
        this.errorEvent.emit({msg: 'Error updating the privacy of playlist'});
      });
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

      this.usersService.getUser(val.creator).subscribe(owner => this.owner = owner, err => {
        this.errorEvent.emit({msg: 'Error while getting owner'});
      });
    }, err => {
      this.errorEvent.emit({msg: 'Error while getting playlists'});
    });
  }

  ngOnInit() {
    this.getPlaylist();
    setTimeout(() => {
      this.colorEvent.emit(2);
      }, 100);
  }
}
