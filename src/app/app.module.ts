import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import { HttpErrorHandler }     from './http-error-handler.service';
import { MessageService }       from './message.service';
import { YoutubeComponent } from './youtube/youtube.component';
import { HttpClientModule } from '@angular/common/http';
import { WatchComponent } from './watch/watch.component';
import { SearchComponent } from './search/search.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { HistoryComponent } from './history/history.component';
import { SettingsComponent } from './settings/settings.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { LocalstorageComponent } from './localstorage/localstorage.component';
import { DropboxComponent } from './dropbox/dropbox.component';
import { FirebaseComponent } from './firebase/firebase.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { WhiteboardComponent } from './whiteboard/whiteboard.component';

@NgModule({
  declarations: [
    AppComponent,
    YoutubeComponent,
    WatchComponent,
    SearchComponent,
    FavoritesComponent,
    HistoryComponent,
    SettingsComponent,
    HomeComponent,
    LocalstorageComponent,
    DropboxComponent,
    FirebaseComponent,
    LoginComponent,
    SignupComponent,
    ForgotpasswordComponent,
    WhiteboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
	MatSliderModule,
	MatIconModule,
	MatButtonModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [HttpErrorHandler, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
