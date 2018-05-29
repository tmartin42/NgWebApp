import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AuthenticationModule } from './authentication/authentication.module';
import { AppRoutingModule } from './app-routing.module';
import { JsonpModule, Jsonp } from '@angular/http';
import { AppComponent } from './app.component';
import { SanitizeHtml } from './pipe';
import { DataService } from "./data.service";
import { ErrorService } from "./error.service";
import {PlaylistService} from "./playlist/playlist.service";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AuthenticationModule,
    AppRoutingModule,
    JsonpModule
  ],
  providers: [
    DataService,
    ErrorService,
    PlaylistService
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
