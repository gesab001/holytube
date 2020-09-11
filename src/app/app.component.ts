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
  searchKeyword = ""; 
  data: any; 
  subscription;
  constructor( private youtubeService: YoutubeService, private sanitizer: DomSanitizer) {}

 ngOnInit(): void {
      this.loadData();
  }

 loadData() {
    this.subscription = this.youtubeService.getLatestVideos().subscribe(
      res => (this.data = res["items"]), 
      error => console.log(error),
    );
  }
}
