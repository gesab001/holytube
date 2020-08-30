import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {YoutubeComponent} from './youtube/youtube.component';

const routes: Routes = [   
  {path: 'search/:keyword', component: YoutubeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
