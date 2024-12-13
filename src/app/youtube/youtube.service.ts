import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { tap } from 'rxjs/operators';
import {publishReplay, refCount} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  _data: any = null;
  url_download = "https://20.70.176.210/php/youtube/download.php?";
  private apiKey = "&key=AIzaSyD2YWxD7OdpUcux0GxqyHYCa8N4jk5-Eoo";
  private apiKeySameChannel = "&key=AIzaSyDtYfNdzcemiuwbfB7tmNyT2vIp0MgyE_g";
  private apiKeySearch = "&key=AIzaSyASBk-yzLV2okPsPt3P0Ui9Wd9tMnnHcJA";
  private apiKeyHome = "&key=AIzaSyDdyEdV0DMLwbJkGCazuLryPT5cCdz6Kys";
  private handleError: HandleError;
  url_videos_from_channel = 'https://www.googleapis.com/youtube/v3/search?fields=items(id(videoId),snippet(title,channelId, thumbnails(default(url))))&part=snippet,id&order=date&maxResults=10&channelId=';
  url_video = "https://www.googleapis.com/youtube/v3/videos?fields=items(contentDetails(duration),statistics(viewCount),snippet(title,channelId,thumbnails(default(url))))&part=snippet,contentDetails,statistics";
  url_latest_videos = 'https://www.googleapis.com/youtube/v3/search?fields=items(id(videoId),snippet(title,channelId,thumbnails(default(url))))&part=snippet,id&order=date&maxResults=10&channelId=UCzYV7j0i85BUenpki8Vv1UQ&order=date&type=video&maxResults=';
  url_search = 'https://www.googleapis.com/youtube/v3/search?fields=items(id(videoId),snippet(title,channelId,thumbnails(default(url))))&part=snippet&q=';  
  url_related_videos = "https://www.googleapis.com/youtube/v3/search?fields=items(id(videoId), snippet(title, channelId, thumbnails(default(url))))&part=snippet&type=video&q=&relatedToVideoId=";

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('YoutubeService');
  }

  clearCache() {
    this._data = null;
  }


  getData(limit: number, keyword: string) {
    this.clearCache();
    if (!this._data) {
      this._data = this.http
        .get(this.url_search+keyword+"&maxResults="+limit.toString()+this.apiKeySearch)
        .pipe(publishReplay(1), refCount(),
          catchError((err) => {
			  console.log('error caught in service')
			  console.error(err);
	 
			  //Handle the error here
	 
			      //Rethrow it back to component
			  return throwError(err);
			})
        );
    }
    return this._data;
  }
  getVideo(videoId){
    var videoData;
      if (!this._data) {
       videoData = this.http
        .get(this.url_video + "&id="+videoId + this.apiKeySearch)
        .pipe(publishReplay(1), refCount());
    }
    return videoData;
  }
  
  getLatestVideos(numberofvideos): Observable<any[]> {
    this.clearCache();
    if (!this._data) {
      this._data = this.http
        .get(this.url_latest_videos+numberofvideos.toString() + this.apiKeyHome)
        .pipe(publishReplay(1), refCount(), 
			  catchError((err) => {
			  console.log('error caught in service')
			  console.error(err);
	 
			  //Handle the error here
	 
			      //Rethrow it back to component
			  return throwError(err);
			})
        );
    }
    return this._data;
  }

  getRelatedVideosFromSameChannel(channelId){
    this.clearCache();
    if (!this._data) {
      this._data = this.http
        .get(this.url_videos_from_channel+channelId + this.apiKeySameChannel)
        .pipe(publishReplay(1), refCount(),
          catchError((err) => {
			  console.log('error caught in service')
			  console.error(err);
	 
			  //Handle the error here
	 
			      //Rethrow it back to component
			  return throwError(err);
			})
        );
    }
    return this._data;	  
  }

  getRelatedVideos(videoId){
    this.clearCache();
    if (!this._data) {
      this._data = this.http
        .get(this.url_related_videos+videoId + this.apiKey)
        .pipe(publishReplay(1), refCount());
    }
    return this._data;	  
  }
  
  getCachedData(){
          return this._data;
  }

  saveBannedVideos(jsondata){
    // Check browser support
    if (typeof(Storage) !== "undefined") {

      localStorage.setItem("bannedVideos", JSON.stringify(jsondata));
    
    } 
  }

  savePastSearchResults(jsondata){

    // Check browser support
    if (typeof(Storage) !== "undefined") {

      localStorage.setItem("pastSearchResults", JSON.stringify(jsondata));
    
    } 
  }

  saveFavoriteVideos(jsondata){
   // Check browser support
    if (typeof(Storage) !== "undefined") {

      localStorage.setItem("favoriteVideos", JSON.stringify(jsondata));
    
    } 
  }

  getFavoriteVideos(){
      var jsondata = {};
      if("favoriteVideos" in localStorage){
      
        jsondata = JSON.parse(localStorage.getItem("favoriteVideos"));

      } else {

       jsondata = {"videoId": ""};
      }
      return jsondata;
  }

  getBannedVideos(){
      var jsondata = [];
      if("bannedVideos" in localStorage){
      
        jsondata = JSON.parse(localStorage.getItem("bannedVideos"));

      } else {

       jsondata = [];
      }
      return jsondata;
  }

  download(videoId){
    this.clearCache();
    if (!this._data) {
      this._data = this.http
        .get(this.url_download+ "videoId=https://www.youtube.com?v=" + videoId + "&filename=test.mp4")
        .pipe(publishReplay(1), refCount());
    }
    return this._data;	  
  }
  
  getPastSearchResults(){
      var jsondata = {};
      if("pastSearchResults" in localStorage){
      
        jsondata = JSON.parse(localStorage.getItem("pastSearchResults"));

      } else {

       jsondata = {};
      }
      return jsondata;
  }
}


