import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';

@Injectable()
export class TokenStorage {

  public getAccessToken(): Observable<string> {
    const token: string = <string>localStorage.getItem('accessToken');
    return Observable.of(token);
  }

  public getRefreshToken(): Observable<string> {
    const token: string = <string>localStorage.getItem('refreshToken');
    return Observable.of(token);
  }

  public setAccessToken(token: string): TokenStorage {
    localStorage.setItem('accessToken', token);

    return this;
  }

  public setRefreshToken(token: string): TokenStorage {
    localStorage.setItem('refreshToken', token);

    return this;
  }

  public clear() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
