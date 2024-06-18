import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor() { }
  message:[];
  Stage:any;
  setMessage(data : any) {
    this.message=data;
    console.log('shared Ids : ' , this.message);
  }
  getMessage() {
    console.log('shared Ids1 : ',this.message);
    return this.message;
  }
  setStage(data : any){
    this.Stage=data;
  }
  getStage(){
    return this.Stage;
  }
}
