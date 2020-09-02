import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit {
  videoId: string = "test";
  safeSrc: SafeResourceUrl;
  stringurl: string;
  message: string;
  subscription;
  banned: Boolean = false;
  bannedVideos: any;
 constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

 ngOnInit(): void {
     this.bannedVideos = this.getData();
     this.route.paramMap.subscribe(params => { 
        this.videoId = params.get('videoId');
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

}
