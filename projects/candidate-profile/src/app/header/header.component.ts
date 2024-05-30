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
  ngOnInit() {
  }
  ngDoCheck() {
    this.getSymbol();
  }

  _candidateId : any;
  @Input()
  set CandidateId(data: any) {
    if (data) {
      this._candidateId = data;
    }
  }
  candidateIds: any;
  @Input()
  set AllCandidateIds(data:any) {
    if(data){
      this.candidateIds=data;
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
    this._candidateId = this._candidateId + 1;
    // this.shared.setMessage(this._candidateId);
    // console.log('current Id1:', this._candidateId);
  }
  
  previous() {
    this._candidateId = this._candidateId - 1;
    // this.shared.setMessage(this._candidateId);
    // console.log('current Id2:', this._candidateId);
  }
}
