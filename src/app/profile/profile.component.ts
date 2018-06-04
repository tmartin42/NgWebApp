import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';

import {  AuthenticationService } from '../authentication/authentication.service';
import {  UsersService } from '../users/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Output() errorEvent = new EventEmitter<any>();
  me;
  tab = 1;
  size = '15px';
  picURL;
  oldpassword = '';
  newpassword = '';
  confirmpassword = '';
  newusername = '';

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private usersService: UsersService
  ) { }


  imgChange(e) {
    console.log(e);
    if (e.target.files && e.target.files[0]) {
      this.usersService.uploadImg(e.target.files[0]).subscribe(val => {
        console.log(val);
        this.usersService.addImgAPI(val).subscribe(res => {
          console.log(res);
          this.picURL = `url('${val}')`;
          this.errorEvent.emit({msg: `Updated picture`, notError: true});
        });
      });
    } else if (e.target.value) {

      this.usersService.addImgAPI(e.target.value).subscribe(res => {
        console.log(res);

        this.picURL = `url('${e.target.value}')`;
        this.errorEvent.emit({msg: `Updated picture`, notError: true});
      });
    }
  }

  confirmChangesPass() {

    if (this.oldpassword !== '' && this.newpassword !== '' && this.confirmpassword !== '') {
        if (this.newpassword === this.confirmpassword) {
          this.usersService.changePassword(this.oldpassword, this.newpassword).subscribe(val => {
            console.log(val);
            this.errorEvent.emit({msg: 'Password changed !', notError: true});
          }, err => {
            console.log(err);
            if (err.message)
              this.errorEvent.emit({msg: err.message});
            else
              this.errorEvent.emit({msg:'Unknown error while changing password. password not changed'});
          });
        } else {
          this.errorEvent.emit({msg: 'new and confirm password must be the same'});
        }
    } else {
      this.errorEvent.emit({msg: 'Empty input'});
    }
  }

  confirmChangesUsername() {
  /*  if (this.newusername !== '') {
      this.usersService.changeUsername(this.newusername).subscribe(val=>{
        this.me.username = this.newusername;
        this.errorEvent.emit({msg: 'Username changed !', notError: true});
      }, err => {
        if (err.message)
          this.errorEvent.emit({msg: err.message});
        else
          this.errorEvent.emit({msg:'Unknown error while changing username. username not changed'});
      });
    } else {
      this.errorEvent.emit({msg:'Empty input'});
    }*/
    this.errorEvent.emit({msg: 'Sorry you can\'t change your username for now.'});
  }

  confirmDeleteAccount() {/*
    if (this.newusername !== '') {
      if (this.newusername === 'delete it please') {
        this.usersService.changeUsername(this.newusername).subscribe(val => {
          console.log(val);
          this.authService.logout();
          location.reload();
        }, err => {
          if (err.message)
            this.errorEvent.emit({msg: err.message});
          else
            this.errorEvent.emit({msg: 'Unknown error while deleting your account. account is (obviously) not deleted'});
        });
      } else {
        this.errorEvent.emit({msg: 'You must write "delete it please" to confirm !'});
      }
    } else {
      this.errorEvent.emit({msg: 'Empty input'});
    }*/

    this.errorEvent.emit({msg:'Sorry you can\'t delete your account yet.'});
  }

  ngOnInit() {
    this.usersService.getMe().subscribe(me => {this.me = me; console.log(me); this.picURL = `url('${this.me.pic}')`});
  }

}
