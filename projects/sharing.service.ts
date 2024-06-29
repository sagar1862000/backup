import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharingService {
  constructor() {}
  message: [];
  Stage: any;
  private dataSubject = new BehaviorSubject<any>(null);
  currentData = this.dataSubject.asObservable();

  setMessage(data: any) {
    this.dataSubject.next(data);
    console.log('shared Ids:', data);
  }

  getMessage() {
    console.log('shared Ids1:', this.dataSubject.value);
    return this.dataSubject.value;
  }
  setStage(data: any) {
    this.Stage = data;
  }
  getStage() {
    return this.Stage;
  }
}
