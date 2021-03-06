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
    path: 'yourMusic',
    canActivate: [ ProtectedGuard ],
    loadChildren: './yourMusic/yourMusic.module#YourMusicModule'
  },
  {
    path: 'playlist/:id',
    canActivate: [ ProtectedGuard ],
    loadChildren: './playlist/playlist.module#PlaylistModule'
  },
  {
    path: 'profile',
    canActivate: [ ProtectedGuard ],
    loadChildren: './profile/profile.module#ProfileModule'
  },
  {
    path: 'search',
    canActivate: [ ProtectedGuard ],
    loadChildren: './search/search.module#SearchModule'
  },
  {
    path: '',
    redirectTo: 'yourMusic',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'yourMusic',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
