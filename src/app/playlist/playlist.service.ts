import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PlaylistService {

  constructor(private http: HttpClient) {}

  getPlaylist(id): Observable<any> {
    return this.http.get('http://localhost:3000/playlists/' + id);
  }

  addTrack(playid, trackid) {
    return this.http.post(`http://localhost:3000/playlists/${playid}/addTrack`, {trackID: trackid});
  }

  addContributor(playid, id): Observable<any> {
    return this.http.put(`http://localhost:3000/playlists/${playid}/addContributor`, {contributor: id});
  }

  removeContributor(playid, id) {
    return this.http.request('delete', `http://localhost:3000/playlists/${playid}/removeContributor`, {body: {contributor: id}});
  }

  removeTrack(playid, id) {
    return this.http.request('post', `http://localhost:3000/playlists/${playid}/removeTrack`, {body: {trackID: id}});
  }
}
