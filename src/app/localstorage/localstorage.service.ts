import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }
  
   set(key, jsondata){
   // Check browser support
    if (typeof(Storage) !== "undefined") {

      localStorage.setItem(key, JSON.stringify(jsondata));
    
    } 
  }
  
   get(key){
      var jsondata = {};
      if(key in localStorage){
      
        jsondata = JSON.parse(localStorage.getItem(key));

      } else {

       jsondata = {"limit": 1};
      }
      return jsondata;
  }
}
