import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../youtube/youtube.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  providers: [YoutubeService],
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  constructor(private youtubeService: YoutubeService) { }
  favoriteVideos: any;
  ngOnInit(): void {
     this.favoriteVideos = {};
     this.favoriteVideos = this.youtubeService.getFavoriteVideos();
  }

}
