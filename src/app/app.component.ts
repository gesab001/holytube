import { Component } from '@angular/core';
import { Youtube } from './youtube/youtube';
import { YoutubeService } from './youtube/youtube.service';
import { LogUpdateService } from './log-update.service';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [YoutubeService, LogUpdateService],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'holytube';
  subscription;
  logdata: any;

  constructor (private logUpdateService: LogUpdateService){
	  
/*	  document.addEventListener(
	    "visibilitychange",
		() => {
		  if (document.hidden){
             console.log("document is hidden");
		  }else{
                  document.location.reload();
				 
                   
		  }			  			  

		}
		);*/
  }
  
    ngOnInit(): void { 
     
      this.logUpdateData(); 
  }
   
  logUpdateData() {
       this.logUpdateService.getAvailableUpdate();
  }
  
  checkForUpdates(){
	  this.logUpdateService.checkForUpdates();
  }
  

 
}
