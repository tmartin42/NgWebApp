import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YourMusicComponent } from './yourMusic.component';

const routes: Routes = [
  {
    path: '',
    component: YourMusicComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YourMusicRoutingModule { }
