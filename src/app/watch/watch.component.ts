import { Component, OnInit, OnChanges, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { YoutubeService } from '../youtube/youtube.service';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  providers: [YoutubeService],
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit, AfterViewInit {
  paused = false;
  public YT: any;
  public video: any;
  public player: any;
  public reframed: Boolean = false;	
  relatedVideos: any =  [ { "id": { "videoId": "ReeEzmYTHZg" }, "snippet": { "channelId": "UCo7QR7fmX24_uxcFJ6fSdNA", "title": "What Would You Do If Boss Mandates the Prick? What’s the Dew &amp; Showers Doctrine Church &amp; World Need?", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/ReeEzmYTHZg/default.jpg" } } } }, { "id": { "videoId": "54R1ugfa8w0" }, "snippet": { "channelId": "UCo7QR7fmX24_uxcFJ6fSdNA", "title": "Hilari Henriques | Daily Devotional | My Life Today 04/16/2021", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/54R1ugfa8w0/default.jpg" } } } }, { "id": { "videoId": "4x7aiXTrGJU" }, "snippet": { "channelId": "UCo7QR7fmX24_uxcFJ6fSdNA", "title": "True Repentance Before Probation Closes.Pope Calls For Global Governance.Biden:No Absolute Amendment", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/4x7aiXTrGJU/default.jpg" } } } }, { "id": { "videoId": "2lDTMHwI3TA" }, "snippet": { "channelId": "UCo7QR7fmX24_uxcFJ6fSdNA", "title": "Kid Cudi, Harry Styles, &amp; Adam Levine Wear Dresses. What Does God&#39;s Word Say About Cross-Dressing?", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/2lDTMHwI3TA/default.jpg" } } } }, { "id": { "videoId": "Q0vamZD2lzc" }, "snippet": { "channelId": "UCo7QR7fmX24_uxcFJ6fSdNA", "title": "Hilari Henriques | Daily Devotional | My Life Today 04/15/2021", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/Q0vamZD2lzc/default.jpg" } } } }, { "id": { "videoId": "FSWipEpVRME" }, "snippet": { "channelId": "UCo7QR7fmX24_uxcFJ6fSdNA", "title": "Send Food to St.Vincent. Military:Chip Under Skin Ends C19 Forever.Full of Disease or Full of Spirit", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/FSWipEpVRME/default.jpg" } } } }, { "id": { "videoId": "EJeD30RuZrU" }, "snippet": { "channelId": "UCo7QR7fmX24_uxcFJ6fSdNA", "title": "Atheist America? NAD Equips Church Leaders to Confront Conspiracies; Shaken Out While In the Church!", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/EJeD30RuZrU/default.jpg" } } } }, { "id": { "videoId": "NftHQ4EWQ6M" }, "snippet": { "channelId": "UCo7QR7fmX24_uxcFJ6fSdNA", "title": "Hilari Henriques | Daily Devotional | My Life Today 04/14/2021", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/NftHQ4EWQ6M/default.jpg" } } } }, { "id": { "videoId": "JSJjOD0HEPo" }, "snippet": { "channelId": "UCo7QR7fmX24_uxcFJ6fSdNA", "title": "Gov:Stop Pricking PPL w/J+J. Will SDAs &amp; 3ABN Doctors Recant? We’re Not GuineaPigs. SDAs Unite w/Gov", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/JSJjOD0HEPo/default.jpg" } } } }, { "id": { "videoId": "mohmrDMxgjo" }, "snippet": { "channelId": "UCo7QR7fmX24_uxcFJ6fSdNA", "title": "Hilari Henriques | Daily Devotional | My Life Today 04/13/2021", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/mohmrDMxgjo/default.jpg" } } } } ];
  channelId: string = "test";
  videoId: string = "test";
  title: string = "";
  safeSrc: SafeResourceUrl;
  stringurl: string;
  message: string;
  subscription;
  banned: Boolean = false;
  bannedVideos: any;
 constructor(private router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer, private youtubeService: YoutubeService) {}

 ngOnInit(): void {
     this.bannedVideos = this.getData();
     this.route.paramMap.subscribe(params => { 
        this.videoId = params.get('videoId');
		this.video = this.videoId;
		if(this.channelId!=params.get('channelId')){
			this.relatedVideos = null;
		}
        this.channelId = params.get('channelId');
		console.log("channelId:" + this.channelId);
        this.title = params.get('title');
        if (this.bannedVideos.includes(this.videoId)){
           this.banned = true;
        }
        this.safeSrc = this.getSafeSrc(this.videoId);
		this.init();

     });

  }


  ngAfterViewInit(): void {
	    //this.draw();
		this.init();
  }

 init() {
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    /* 3. startVideo() will create an <iframe> (and YouTube player) after the API code downloads. */
    window['onYouTubeIframeAPIReady'] = () => this.startVideo();
  }
  
  playRelatedVideo(videoId, title, channelId){
	  console.log("play related video");
	  console.log("videoId" + videoId);
	  console.log("title"  + title);
	  console.log("channelId" + channelId);
	  this.router.navigate(['/watch', videoId, "title", channelId]).then(page => { window.location.reload(); });
  }
  
   getRelatedVideos() {
	 console.log("get relatedVideos");  
    this.subscription = this.youtubeService.getRelatedVideos(this.videoId).subscribe(
      res => (this.relatedVideos = res["items"]), 
      error => console.log(error),
    );
  }
  
  getRelatedVideosFromSameChannel() {
	 console.log("get relatedVideos");  
    this.subscription = this.youtubeService.getRelatedVideosFromSameChannel(this.channelId).subscribe(
      res => (this.relatedVideos = res["items"]), 
      error => console.log(error),
    );
  }
  
  playYoutubeVideo(){
	  console.log("play video");
	  console.log(this.player);
	  this.player.playVideo();
	  this.paused = false;
  }

  pauseYoutubeVideo(){
	  console.log();
	  console.log(this.player);
	  this.player.pauseVideo();
	  this.paused = true;
	  if(this.relatedVideos==null){
		  this.getRelatedVideosFromSameChannel();
	  }
	  //this.getRelatedVideos();
  }
  
  startVideo() {
    this.reframed = false;
    this.player = new window['YT'].Player('player', {
      videoId: this.video,
	  height: "100%",
	  width: "100%",
      playerVars: {
        autoplay: 1,
        modestbranding: 1,
        controls: 0,
        disablekb: 1,
        rel: 0,
        showinfo: 0,
        fs: 0,
        playsinline: 1
      },
      events: {
        'onStateChange': this.onPlayerStateChange.bind(this),
        'onError': this.onPlayerError.bind(this),
        'onReady': this.onPlayerReady.bind(this),
      }
    });
  }

  /* 4. It will be called when the Video Player is ready */
  onPlayerReady(event) {
    event.target.playVideo();
  }

  onPlayerStateChange(event) {
    console.log(event)
    switch (event.data) {
      case window['YT'].PlayerState.PLAYING:
        if (this.cleanTime() == 0) {
          console.log('started ' + this.cleanTime());
        } else {
          console.log('playing ' + this.cleanTime())
        };
        break;
      case window['YT'].PlayerState.PAUSED:
        if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
          console.log('paused' + ' @ ' + this.cleanTime());
        };
        break;
      case window['YT'].PlayerState.ENDED:
        console.log('ended ');
        break;
    }
  }
 
  cleanTime() {
    return Math.round(this.player.getCurrentTime())
  }

  onPlayerError(event) {
    switch (event.data) {
      case 2:
        console.log('' + this.video)
        break;
      case 100:
        break;
      case 101 || 150:
        break;
    }
  } 
 
  public getSafeSrc(videoId: string): SafeResourceUrl {
     this.stringurl = "https://www.youtube.com/embed/"+videoId + "?rel=0";
     this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(this.stringurl);
     return this.safeSrc;
  }

  public getData() {
      var jsondata = [];
      if("bannedVideos" in localStorage){
      
        jsondata = JSON.parse(localStorage.getItem("bannedVideos"));

      } else {

       jsondata = [];
      }
      return jsondata;
  }

  public addToFavorites(){
      var jsondata = this.youtubeService.getFavoriteVideos();
          jsondata[this.videoId] = this.title;
           alert("added " + jsondata);
             
           this.youtubeService.saveFavoriteVideos(jsondata);
           jsondata = this.youtubeService.getFavoriteVideos();
           alert(JSON.stringify(jsondata));
        


  }

}
