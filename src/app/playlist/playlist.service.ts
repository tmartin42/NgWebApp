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

}
