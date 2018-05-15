import { Component, Injectable, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Jsonp } from '@angular/http';

@Injectable()
export class ErrorService {

  constructor(private http: HttpClient, private jsonp: Jsonp) {}

  public trans: boolean[] = [];
  public closing: any[] = [];
  public errors: any[] = [];

  addError(err) {
    const i = this.trans.length;
    this.trans.push(true);
    this.closing.push({val: false, id: i});
    this.errors.push({err: err, id: i});
    setTimeout(() => {
        this.trans[i] = false;
    }, 100);
    console.log('added error:', this.errors);
  }


  removeError(id: number) {
    this.closing[id] = {val: true, id: this.closing[id].id};
    setTimeout(() => {
      this.trans.splice(id, 1);
      this.closing.splice(id, 1);
      this.errors.splice(id, 1);
      }, 400);

  }

}
