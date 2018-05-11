import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Jsonp } from '@angular/http';
import { DeezerResponse } from './deezerResult';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SearchService {

  constructor(private http: HttpClient, private jsonp: Jsonp) {}

  getUsers() {
    return this.http.get('http://localhost:3000/users');
  }

  getData() {
    return this.http.get('http://localhost:3000/data');
  }

  searchDeezer(word: string, complement: string): Observable<DeezerResponse> {
//    return this.http.get('https://api.deezer.com/search${complement' + complement + '?q=' + word + '?output=jsonp');

    return this.jsonp.request(`https://api.deezer.com/search${complement}?q=${word}&output=jsonp&callback=JSONP_CALLBACK`, {method: 'Get'})
      .map(res => {
        return <DeezerResponse>res.json();
      });
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

