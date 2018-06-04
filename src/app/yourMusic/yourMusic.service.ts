import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Jsonp } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class YourMusicService {

  constructor(private http: HttpClient, private jsonp: Jsonp) {}


  getFriends() {
    return this.http.get('http://localhost:3000/friends');
  }

  newPlaylist(title) {
    return this.http.post(`http://localhost:3000/playlists`, {title: title});
  }

  newEvent(title) {
    return this.http.post(`http://localhost:3000/events`, {title: title});
  }

}

