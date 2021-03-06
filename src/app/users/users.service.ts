import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) {}

  getUser(id): Observable<any> {
    return this.http.get('http://localhost:3000/user/' + id);
  }

  getData() {
    return this.http.get('http://localhost:3000/data');
  }

  addFriend(id) {
    return this.http.post(`http://localhost:3000/friends/${id}`, {});
  }

  removeFriend(id) {
    return this.http.delete(`http://localhost:3000/friends/${id}`, {});
  }

  getMe() {
    return this.http.get('http://localhost:3000/user/me');
  }

  uploadImg(img) {
    return this.http.get(`http://uploads.im/api?upload=${img}`);
  }

  addImgAPI(img) {
    return this.http.post(`http://localhost:3000/picture`, {pic: img}, {responseType: 'text'});
  }

  changePassword(oldp, newp) {
    return this.http.patch(`http://localhost:3000/user/password`, {oldPassword: oldp, newPassword: newp}, {responseType: 'text'});
  }
/*
  changeUsername(newn) {
    return this.http.patch(`http://localhost:3000/user/me/username`, { newUsername: newn}, {responseType: 'text'});
  }*/

/* deleteAccount {
      return this.http.delete(`http://localhost:3000/user/me`, {responseType: 'text'});
  }
 */
}
