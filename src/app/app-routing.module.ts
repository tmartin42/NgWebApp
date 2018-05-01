import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicGuard, ProtectedGuard } from 'ngx-auth';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [ PublicGuard ],
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: 'discover',
    canActivate: [ ProtectedGuard ],
    loadChildren: './discover/discover.module#DiscoverModule'
  },
  {
    path: 'playlist/:id',
    canActivate: [ ProtectedGuard ],
    loadChildren: './playlist/playlist.module#PlaylistModule'
  },
  {
    path: '',
    redirectTo: 'discover',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'discover',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
