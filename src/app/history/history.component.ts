import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../youtube/youtube.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  providers: [YoutubeService],
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  datahistory: any = {};
  constructor(private youtubeService: YoutubeService) { }

  ngOnInit(): void {
     this.datahistory = this.youtubeService.getPastSearchResults();
  }

}
