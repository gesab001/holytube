import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {YoutubeComponent} from './youtube/youtube.component';
import {WatchComponent} from './watch/watch.component';

const routes: Routes = [   
  {path: 'search/:keyword', component: YoutubeComponent},
  {path: 'watch/:videoId', component: WatchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
