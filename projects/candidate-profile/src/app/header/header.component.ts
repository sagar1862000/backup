import { Component, Input } from '@angular/core';
import axios from 'axios';
import { forkJoin } from 'rxjs';
import { SharedService } from '../shared/shared.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  message: any = '';
  url = 'http://192.168.4.13:8000/';
  candidateDetails: any;
  constructor(private shared: SharedService) {}
  showStagesDropdown = false;
  showMoreOptionsDropdown = false;
  Symbol: any;
  ngOnInit() {}
  ngDoCheck() {
    this.getSymbol();
    this.message = this.shared.getMessage();
  }

  _candidateId: any;
  @Input()
  set CandidateId(data: any) {
    if (data) {
      this._candidateId = data;
      this.shared.setId(this._candidateId);
    }
  }
  candidateIds: any;
  Index: number;
  _redirectedFrom:any;
  @Input()
  set AllCandidateIds(data: any) {
    if (data) {
      this.candidateIds = data;
      // console.log('my index : ' , this.Index);
      this.Index = this.candidateIds.indexOf(this._candidateId);
      console.log('my index : ', this.Index);
    }
  }
  @Input()
  set redirected(data:any){
    if(data){
      this._redirectedFrom = data;
      console.log('redirected : ' , data);
    }
  }

  getSymbol() {
    this.Symbol = this.message.toUpperCase();
  }

  toggleDropdownForStaegs(): void {
    this.showStagesDropdown = !this.showStagesDropdown;
    this.showMoreOptionsDropdown = false;
  }
  toggleDropdownForMoreOptions(): void {
    this.showMoreOptionsDropdown = !this.showMoreOptionsDropdown;
    this.showStagesDropdown = false;
  }
  GettingValue(Value: any) {
    this.showStagesDropdown = false;
    this.shared.setStage(Value);
    switch (Value) {
      case 'Discussion':
        // this.Stage = 'Discussion';
        this.OnChangeUpdateDatabase('Discussion');
        break;
      case 'Feedback':
        // this.Stage = 'Feedback';
        this.OnChangeUpdateDatabase('Feedback');
        break;
      case 'Interviewing':
        // this.Stage = 'Interviewing';
        this.OnChangeUpdateDatabase('Interviewing');
        break;
      case 'Made Offer':
        // this.Stage = 'Made Offer';
        this.OnChangeUpdateDatabase('Made Offer');
        break;
      case 'Disqualified':
        // this.Stage = 'Disqualified';
        this.OnChangeUpdateDatabase('Disqualified');
        break;
      case 'Hired':
        // this.Stage = 'Hired';
        this.OnChangeUpdateDatabase('Hired');
        break;
    }
  }

  OnChangeUpdateDatabase(type: string) {
    const formData = new FormData();
    formData.append('stages', type);
    axios
      .put(`${this.url}Update-Details/84/`, formData)
      .then((response) => {
        console.log('Response : ', response);
        this.candidateDetails = response.data;
      })
      .catch((error) => {
        console.error('Upload failed', error);
      });
  }
  next() {
    if (this.Index != 19) {
      this.Index = this.Index + 1;
      this._candidateId = this.candidateIds[this.Index];
      console.log('IndeNext : ', this.Index, 'value : ', this._candidateId);
      this.shared.setId(this._candidateId);
    } else {
      alert('Array Out of Bound');
    }
  }

  previous() {
    if (this.Index != 0) {
      this.Index = this.Index - 1;
      this._candidateId = this.candidateIds[this.Index];
      console.log('Indeprevious : ', this.Index, 'value : ', this._candidateId);
      this.shared.setId(this._candidateId);
    } else {
      alert('Array Out of Bound');
    }
  }
}
