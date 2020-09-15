import { Component } from '@angular/core';
import { Youtube } from './youtube/youtube';
import { YoutubeService } from './youtube/youtube.service';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [YoutubeService],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'holytube';
  

  

 
}
