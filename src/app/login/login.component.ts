import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Output() errorEvent = new EventEmitter<any>();
  usernameLogin = '';
  passwordLogin = '';
  usernameRegister = '';
  emailRegister = '';
  passwordRegister = '';
  passwordConfirmRegister = '';
  tab = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
  }

  public login(username, password) {
    if (username === '' || password === '') {
      return ;
    }
    this.authService
      .login(username, password)
      .subscribe(() => this.router.navigateByUrl('/'), err => {
        let str;
        if (err.error) {
          str = JSON.parse(err.error);
        }
        if (err.error && str && str.result) {
          this.errorEvent.emit({msg: str.result});
        } else {
          this.errorEvent.emit({msg: 'Unknown error in login'});
        }
      });
  }
  public register(username, email, password, passwordConfirm) {
    if (password !== passwordConfirm) {
      this.errorEvent.emit({msg: 'password must be the same as confirmation'});
    } else if (username === '' || email === '' || password === '') {
      return;
    } else if (username.length < 3) {
      this.errorEvent.emit({msg: 'username is too short'});
    } else if (password.length < 8 || /.*\d+.*/.test(password) === false) {
      this.errorEvent.emit({msg: 'password must be at least 8 characters long and have a number.'});
    } else if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) === false) {
      this.errorEvent.emit({msg: 'email must be valid.'});
    } else {
      this.authService
        .signup(username, email, password)
        .subscribe(() => this.router.navigateByUrl('/'),
          err => {
            let str;
            if (err.error) {
              str = JSON.parse(err.error);
            }
            if (err.error && str && str.result) {
              this.errorEvent.emit({msg: str.result});
            } else {
              this.errorEvent.emit({msg: 'Unknown error in signin'});
            }
          });
    }
  }

  public doubletab(isleft) {
    this.tab = isleft;
  }
}
