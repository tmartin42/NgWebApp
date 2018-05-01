import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  emailLogin = '';
  passwordLogin = '';
  emailRegister = '';
  passwordRegister = '';
  passwordConfirmRegister = '';
  tab = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
  }

  public login(email, password) {
    this.authService
      .login(email, password)
      .subscribe(() => this.router.navigateByUrl('/'));
  }
  public register(email, password, passwordConfirm) {
    console.log('register');
  }

  public doubletab(isleft) {
    this.tab = isleft;
  }
}
