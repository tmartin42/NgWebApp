import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class YourMusicService {

  constructor(private http: HttpClient, private jsonp: Jsonp) {}

  getPlaylists() {
    return this.http.get('http://localhost:3000/playlists/me');
  }

  getMe () {
    return this.http.get('http://localhost:3000/user/me');
  }

  getFriends() {
    return this.http.get('http://localhost:3000/users/me');
  }

  newPlaylist(title) {
    return this.http.post(`http://localhost:3000/playlists`, {title: title}, {responseType: 'text'});
  }

  getData() {
    return this.http.get('http://localhost:3000/data');
  }


  searchPeople(): Observable<any> {
    return this.http.get(`http://localhost:3000/Users` );
  }


  searchPlaylists(): Observable<any> {
    return this.http.get(`http://localhost:3000/playlists` );
  }

  searchEvents(): Observable<any> {
    return this.http.get(`http://localhost:3000/events` );
  }
}

