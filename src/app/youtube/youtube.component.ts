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

}
