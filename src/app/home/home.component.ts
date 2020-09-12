import { Component, OnInit } from '@angular/core';
import { Youtube } from '../youtube/youtube';
import { YoutubeService } from '../youtube/youtube.service';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [YoutubeService],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: any; 
  numberofvideos:number;
  subscription;
  constructor( private youtubeService: YoutubeService, private sanitizer: DomSanitizer) {}

 ngOnInit(): void {
      this.numberofvideos = 1;
      this.loadData();
  }

 loadData() {
    this.subscription = this.youtubeService.getLatestVideos(this.numberofvideos).subscribe(
      res => (this.data = res["items"]), 
      error => console.log(error),
    );
  }

}
