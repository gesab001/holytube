import { Component, OnInit } from '@angular/core';
import { Youtube } from '../youtube/youtube';
import { YoutubeService } from '../youtube/youtube.service';
import { LocalstorageService } from '../localstorage/localstorage.service';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [YoutubeService, LocalstorageService],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: any; 
  numberofvideos:number;
  subscription;
  constructor(private localstorageService: LocalstorageService, private youtubeService: YoutubeService, private sanitizer: DomSanitizer) {}

 ngOnInit(): void {
      this.numberofvideos = this.getVideoLimit() ;
      this.loadData();
	  
  }

 loadData() {
    this.subscription = this.youtubeService.getLatestVideos(this.numberofvideos).subscribe(
      res => (this.data = res["items"]), 
      error => console.log(error),
    );
  }
  
   getVideoLimit(){
    var jsondata = this.localstorageService.get("latestvideoslimit");
	return jsondata["limit"];
 }

}
