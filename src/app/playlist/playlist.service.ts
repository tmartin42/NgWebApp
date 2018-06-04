import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PlaylistService {

  constructor(private http: HttpClient) {}
  
  getPlaylists() {
    return this.http.get('http://localhost:3000/playlists/me');
  }

  getPlaylist(id): Observable<any> {
    return this.http.get(`http://localhost:3000/playlists/${id}`);
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

  moveTrack(playid, tid, id) {
    return this.http.request('post', `http://localhost:3000/playlists/${playid}/moveTrack`, {body: {trackID: tid, newPos: id}});
  }

  changeTitle(playid, newTitle) {
    return this.http.patch(`http://localhost:3000/playlists/changeTitle/${playid}`, {title: newTitle});
  }

  deletePlaylist(playid) {
    return this.http.delete(`http://localhost:3000/playlists/${playid}`, {});
  }

  togglePublic(playid, isPublic) {
    return this.http.patch(`http://localhost:3000/playlists/isPublic/${playid}`, {isPublic: isPublic});
  }
}
