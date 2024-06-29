import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  message:string='';
  Stage:any;
  private idSource = new BehaviorSubject<number>(null);
  currentId = this.idSource.asObservable();
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
  setId(id: number) {
    this.idSource.next(id);
  }

  getId() {
    return this.idSource.value;
  }
}