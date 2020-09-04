import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../youtube/youtube.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  providers: [YoutubeService],
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

    constructor(private youtubeService: YoutubeService) { }

  ngOnInit(): void {
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

}
