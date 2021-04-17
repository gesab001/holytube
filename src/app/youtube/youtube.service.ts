import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { tap } from 'rxjs/operators';
import {publishReplay, refCount} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  _data: any = null;

  private handleError: HandleError;
  url_videos_from_channel = 'https://www.googleapis.com/youtube/v3/search?fields=items(id(videoId),snippet(title,channelId, thumbnails(default(url))))&part=snippet,id&order=date&maxResults=10&key=AIzaSyA6xZqvU8GsCuu_qKbnUZVv2ddxLdyiLpA&channelId=';

  url_latest_videos = 'https://www.googleapis.com/youtube/v3/search?fields=items(id(videoId),snippet(title,channelId,%20thumbnails(default(url))))&part=snippet,id&order=date&maxResults=10&key=AIzaSyA6xZqvU8GsCuu_qKbnUZVv2ddxLdyiLpA&channelId=UCo7QR7fmX24_uxcFJ6fSdNA&q=-Hilari&order=date&type=video&maxResults=';
  url_search = 'https://www.googleapis.com/youtube/v3/search?fields=items(id(videoId),snippet(title,channelId,thumbnails(default(url))))&part=snippet&key=AIzaSyA6xZqvU8GsCuu_qKbnUZVv2ddxLdyiLpA&q=';  
  url_related_videos = "https://www.googleapis.com/youtube/v3/search?fields=items(id(videoId), snippet(title, channelId, thumbnails(default(url))))&part=snippet&type=video&key=AIzaSyA6xZqvU8GsCuu_qKbnUZVv2ddxLdyiLpA&q=&relatedToVideoId=";

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
        .get(this.url_search+keyword+"&maxResults="+limit.toString())
        .pipe(publishReplay(1), refCount());
    }
    return this._data;
  }

  getLatestVideos(numberofvideos) {
    this.clearCache();
    if (!this._data) {
      this._data = this.http
        .get(this.url_latest_videos+numberofvideos.toString())
        .pipe(publishReplay(1), refCount());
    }
    return this._data;
  }

  getRelatedVideosFromSameChannel(channelId){
    this.clearCache();
    if (!this._data) {
      this._data = this.http
        .get(this.url_videos_from_channel+channelId)
        .pipe(publishReplay(1), refCount());
    }
    return this._data;	  
  }

  getRelatedVideos(videoId){
    this.clearCache();
    if (!this._data) {
      this._data = this.http
        .get(this.url_related_videos+videoId)
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


