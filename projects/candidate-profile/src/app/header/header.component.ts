import { Component } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import axios from 'axios';
import { forkJoin } from 'rxjs';
// import { SharedService } from '../shared/shared.service';
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
  showMoreOptionsDropdown =false;
  // Stage: any;
  ngOnInit() {}
  ngDoCheck() {
    this.message = this.shared.getMessage();
  }
  toggleDropdownForStaegs(): void {
    this.showStagesDropdown = !this.showStagesDropdown;
    this.showMoreOptionsDropdown=false;
  }
  toggleDropdownForMoreOptions(): void{
    this.showMoreOptionsDropdown = !this.showMoreOptionsDropdown;
    this.showStagesDropdown=false;
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
      .put(`${this.url}Update-Details/84/`,formData)
      .then((response) => {
        console.log('Response : ', response);
        this.candidateDetails = response.data;
      })
      .catch((error) => {
        console.error('Upload failed', error);
      });
  }

  // UpdateStageInBackend(Value: any) {}
}