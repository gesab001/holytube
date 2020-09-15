import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Youtube } from './youtube';
import { YoutubeService } from './youtube.service';
import { LocalstorageService } from '../localstorage/localstorage.service';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  providers: [YoutubeService, LocalstorageService],
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit {
  keyword = "hello";
  safeSrc: SafeResourceUrl;
  stringurl: string;
  youtube: Youtube[];
  numberofsearchresults:number = 1;
  message: string;
  data: any;
  subscription;
  datahistory: any = {};

  constructor(private localstorageService: LocalstorageService, private route: ActivatedRoute, private youtubeService: YoutubeService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
     this.setSearchResultsLimit();
     this.datahistory = this.youtubeService.getPastSearchResults();
     this.route.paramMap.subscribe(params => { 
        this.keyword = params.get('keyword');
        if (this.datahistory[this.keyword]){

           this.data = this.datahistory[this.keyword];
        }
        else {

           this.loadData(this.keyword);
        }
     });

  }
 setSearchResultsLimit(){
    var jsondata = this.localstorageService.get("searchvideoslimit");
	this.numberofsearchresults = jsondata["limit"];
    alert(this.numberofsearchresults);
 }	
 
 loadData(keyword: string) {
    this.subscription = this.youtubeService.getData(this.numberofsearchresults, keyword).subscribe(
      res => (this.data = res["items"], this.datahistory[this.keyword] = this.data, this.youtubeService.savePastSearchResults(this.datahistory),      this.datahistory = this.youtubeService.getPastSearchResults()), 
      error => console.log(error),
    );
  }


  public getSafeSrc(videoId: string): SafeResourceUrl {
     this.stringurl = "https://www.youtube.com/embed/"+videoId;
     this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(this.stringurl);
     return this.safeSrc;
  }

  banThis(videoId: string){
    var jsondata = this.youtubeService.getBannedVideos();
    if (!jsondata.includes(videoId)){
      jsondata.push(videoId);
     this.youtubeService.saveBannedVideos(jsondata);
    }
  }

  liftBan(videoId: string){
    var correctVerse = "Finally, brethren, whatsoever things are true, whatsoever things are honest, whatsoever things are just, whatsoever things are pure, whatsoever things are lovely, whatsoever things are of good report; if there be any virtue, and if there be any praise, think on these things.";
    var verseInput = prompt("Enter Philippians 4:8 in KJV version");
    var verseInput2 = verseInput.replace(/\[/gi, '');
    var verseInput3 = verseInput2.replace(/\]/gi, '');
    alert(verseInput3);
    if (correctVerse===verseInput3){

        var jsondata = this.youtubeService.getBannedVideos();
        const index = jsondata.indexOf(videoId, 0);
        if (index > -1) {
           jsondata.splice(index, 1);
           this.youtubeService.saveBannedVideos(jsondata);
        }
    }else{
       alert("wrong verse");
    }

  }

  clearBanList(){
      var jsondata = [];
      this.youtubeService.saveBannedVideos(jsondata);
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
