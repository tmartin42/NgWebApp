import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

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
    this.authService
      .login(username, password)
      .subscribe(() => this.router.navigateByUrl('/'));
  }
  public register(username, email, password, passwordConfirm) {
    if (password == passwordConfirm)
    {
      this.authService
        .signup(username, email, password)
        .subscribe(() => this.router.navigateByUrl('/'));
    }
    console.log('register');
  }

  public doubletab(isleft) {
    this.tab = isleft;
  }
}
