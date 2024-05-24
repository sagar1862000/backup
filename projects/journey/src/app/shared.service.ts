import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  message:string='';
  Stage:any;
  private recruitmentProcessData: any;
  constructor() {}
  setMessage(data : any) {
    this.message=data;
  }
  getMessage() {
    return this.message;
  }
  setStage(data : any){
    this.Stage=data;
  }
  getStage(){
    return this.Stage;
  }

  setRecruitmentProcessData(data: any) {
    this.recruitmentProcessData = data;
  }

  getRecruitmentProcessData() {
    return this.recruitmentProcessData;
  }
}