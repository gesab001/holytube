import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { YoutubeService } from '../youtube/youtube.service';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  providers: [YoutubeService],
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit {
  videoId: string = "test";
  title: string = "";
  safeSrc: SafeResourceUrl;
  stringurl: string;
  message: string;
  subscription;
  banned: Boolean = false;
  bannedVideos: any;
 constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private youtubeService: YoutubeService) {}

 ngOnInit(): void {
     this.bannedVideos = this.getData();
     this.route.paramMap.subscribe(params => { 
        this.videoId = params.get('videoId');
        this.title = params.get('title');
        if (this.bannedVideos.includes(this.videoId)){
           this.banned = true;
        }
        this.safeSrc = this.getSafeSrc(this.videoId);

     });

  }

  public getSafeSrc(videoId: string): SafeResourceUrl {
     this.stringurl = "https://www.youtube.com/embed/"+videoId + "?rel=0";
     this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(this.stringurl);
     return this.safeSrc;
  }

  public getData() {
      var jsondata = [];
      if("bannedVideos" in localStorage){
      
        jsondata = JSON.parse(localStorage.getItem("bannedVideos"));

      } else {

       jsondata = [];
      }
      return jsondata;
  }

  public addToFavorites(){
      var jsondata = this.youtubeService.getFavoriteVideos();
          jsondata[this.videoId] = this.title;
           alert("added " + jsondata);
             
           this.youtubeService.saveFavoriteVideos(jsondata);
           jsondata = this.youtubeService.getFavoriteVideos();
           alert(JSON.stringify(jsondata));
        


  }

}
