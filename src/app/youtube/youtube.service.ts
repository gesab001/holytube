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

  url = 'https://www.googleapis.com/youtube/v3/search?fields=items(id(videoId),snippet(title,description,channelId,channelTitle,publishedAt,thumbnails(default(url))))&part=snippet&maxResults=10&key=AIzaSyA6xZqvU8GsCuu_qKbnUZVv2ddxLdyiLpA&q=';  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('YoutubeService');
  }

  clearCache() {
    this._data = null;
  }


  getData(keyword: string) {
    this.clearCache();
    if (!this._data) {
      this._data = this.http
        .get(this.url+keyword)
        .pipe(publishReplay(1), refCount());
    }
    return this._data;
  }

  getCachedData(){
          return this._data;
  }
}


