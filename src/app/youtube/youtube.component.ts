import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Youtube } from './youtube';
import { YoutubeService } from './youtube.service';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  providers: [YoutubeService],
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit {
  keyword = "hello";
  safeSrc: SafeResourceUrl;
  stringurl: string;
  youtube: Youtube[];
  message: string;
  data: any;
  subscription;

  constructor(private route: ActivatedRoute, private youtubeService: YoutubeService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {

     this.route.paramMap.subscribe(params => { 
        this.keyword = params.get('keyword');
        this.loadData(this.keyword);
     });

  }

 loadData(keyword: string) {
    this.subscription = this.youtubeService.getData(keyword).subscribe(
      res => (this.data = res["items"]), 
      error => console.log(error),
    );
  }


  public getSafeSrc(videoId: string): SafeResourceUrl {
     this.stringurl = "https://www.youtube.com/embed/"+videoId;
     this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(this.stringurl);
     return this.safeSrc;
  }

  banThis(videoId: string){
    var jsondata = this.getData();
    if (!jsondata.includes(videoId)){
      jsondata.push(videoId);
     this.saveToLocalStorage(jsondata);
    }
  }

  liftBan(videoId: string){
    var correctVerse = "Finally, brethren, whatsoever things are true, whatsoever things are honest, whatsoever things are just, whatsoever things are pure, whatsoever things are lovely, whatsoever things are of good report; if there be any virtue, and if there be any praise, think on these things.";
    var verseInput = prompt("Enter Philippians 4:8 in KJV version");
    var verseInput2 = verseInput.replace(/\[/gi, '');
    var verseInput3 = verseInput2.replace(/\]/gi, '');
    alert(verseInput3);
    if (correctVerse===verseInput3){
        alert("same");
        var jsondata = this.getData();
        const index = jsondata.indexOf(videoId, 0);
        if (index > -1) {
           jsondata.splice(index, 1);
           this.saveToLocalStorage(jsondata);
        }
    }else{
       alert("wrong verse");
    }

  }

  clearBanList(){
      var jsondata = [];
      this.saveToLocalStorage(jsondata);
  }

  saveToLocalStorage(jsondata){
    // Check browser support
    if (typeof(Storage) !== "undefined") {

      localStorage.setItem("bannedVideos", JSON.stringify(jsondata));
    
    } 
  }

  getData(){
      var jsondata = [];
      if("bannedVideos" in localStorage){
      
        jsondata = JSON.parse(localStorage.getItem("bannedVideos"));

      } else {

       jsondata = [];
      }
      return jsondata;
  }

}
