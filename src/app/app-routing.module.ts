import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {YoutubeComponent} from './youtube/youtube.component';
import {WatchComponent} from './watch/watch.component';
import {SearchComponent} from './search/search.component';
import {FavoritesComponent} from './favorites/favorites.component';
import {HistoryComponent} from './history/history.component';
import {SettingsComponent} from './settings/settings.component';
import {AppComponent} from './app.component';
const routes: Routes = [   
  {path: '', component: AppComponent},
  {path: 'results/:keyword', component: YoutubeComponent},
  {path: 'search', component: SearchComponent},
  {path: 'watch/:videoId', component: WatchComponent},
  {path: 'favorites', component: FavoritesComponent},
  {path: 'history', component: HistoryComponent},
  {path: 'settings', component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
