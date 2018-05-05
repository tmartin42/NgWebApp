import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) {}

  getUser(id): Observable<any> {
    return this.http.get('http://localhost:3000/user/' + id);
  }

  getData() {
    return this.http.get('http://localhost:3000/data');
  }

}
