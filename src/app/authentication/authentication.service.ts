import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'ngx-auth';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { TokenStorage } from './token-storage.service';

interface AccessData {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthenticationService implements AuthService {

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorage
  ) {}

  public isAuthorized(): Observable < boolean > {
    return this.tokenStorage
      .getAccessToken()
      .map(token => !!token);
  }

  public getAccessToken(): Observable < string > {
    return this.tokenStorage.getAccessToken();
  }

  public refreshToken(): Observable < any > {
    return this.tokenStorage
      .getRefreshToken()
      .switchMap((refreshToken: string) => {
        return this.http.post(`http://localhost:3000/refresh`, { refreshToken });
      })
      .do(this.saveAccessData.bind(this))
      .catch((err) => {
        this.logout();

        return Observable.throw(err);
      });
  }

  public refreshShouldHappen(response: HttpErrorResponse): boolean {
    return response.status === 401;
  }

  public verifyTokenRequest(url: string): boolean {
    return url.endsWith('/refresh');
  }

  public login(username, password): Observable<any> {
    return this.http.post(`http://localhost:3000/user/login`, {username: username, password: password}, {responseType: 'text'}  )
      .do((tokens: string) => this.saveAccessData(tokens));
  }

  public signup(username, email, password): Observable<any> {
    return this.http.post(`http://localhost:3000/user/signup`, {username: username, mail: email, password: password} , {responseType: 'text'} )
      .do((tokens: string) => this.saveAccessData(tokens));
  }

  public logout(): void {
    this.tokenStorage.clear();
    location.reload(true);
  }

  private saveAccessData(token: string) {
    this.tokenStorage
      .setAccessToken(token)
      .setRefreshToken(token);

  }

  public getHeaders(token: string) {
    return { Authorize: token};
  }
}
