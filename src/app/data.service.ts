import { Component, Injectable, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Jsonp } from '@angular/http';

@Injectable()
export class DataService {

  constructor(private http: HttpClient, private jsonp: Jsonp) {}

  getUsers(): Observable<any> {
    return this.http.get(`http://localhost:3000/playlists` );
  }

  getData() {
    return this.http.get('http://localhost:3000/data');
  }

  getTrack(id) {
    return this.jsonp.request(`https://api.deezer.com/track/${id}?output=jsonp&callback=JSONP_CALLBACK`, {method: 'Get'})
      .map(res => {
        return res.json();
      });
  }

  reallisten(url) {

    return this.jsonp.request(`https://api.deezer.com/oembed?url=${url}&output=jsonp&callback=JSONP_CALLBACK`, {method: 'Get'})
      .map(res => {
        return res.json();
      });
  }
}
