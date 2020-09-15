import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../youtube/youtube.service';
import { LocalstorageService } from '../localstorage/localstorage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  providers: [LocalstorageService],
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
numberofsearchresults: number = 1;
numberofvideos: number = 1;
    constructor(private youtubeService: YoutubeService, private localstorageService: LocalstorageService) { }

  ngOnInit(): void {
	  this.getVideoLimit();
	  this.getSearchResultsLimit();
  }

 clearHistory(){
    var jsondata = {};
    this.youtubeService.savePastSearchResults(jsondata);
 }

 clearFavorites(){
      var jsondata = {"videoId": ""};
      this.youtubeService.saveFavoriteVideos(jsondata);
 }

 clearBanList(){
      var jsondata = [];
      this.youtubeService.saveBannedVideos(jsondata);
 }
 
 setVideoLimit(){
	 var jsondata = {"limit": this.numberofvideos};
     this.localstorageService.set("latestvideoslimit", jsondata);
	 }

 setSearchResultsLimit(){
	 var jsondata = {"limit": this.numberofsearchresults};
     this.localstorageService.set("searchvideoslimit", jsondata);
	 }	 
	 
 getVideoLimit(){
    var jsondata = this.localstorageService.get("latestvideoslimit");
	this.numberofvideos = jsondata["limit"];
 }	 

 getSearchResultsLimit(){
    var jsondata = this.localstorageService.get("searchvideoslimit");
	this.numberofsearchresults = jsondata["limit"];
 }	
}
