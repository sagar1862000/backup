import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import axios from 'axios';
import { CandidateProfileService } from '../candidateprofile-service.service';
import { I } from '@angular/cdk/keycodes';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-right-side-nav',
  templateUrl: './right-side-nav.component.html',
  styleUrls: ['./right-side-nav.component.css'],
})
export class RightSideNavComponent implements OnInit, OnDestroy {
  constructor(
    private shared: SharedService,
    private CPService: CandidateProfileService
  ) {}

  @Output() nameChanged = new EventEmitter<string>();
  name: any;
  url1 = 'http://192.168.4.13:8000/';
  url2 = 'http://192.168.4.13:8000/';
  candidateDetails: any;
  Stage: any;
  // message:any='';
  Id: number;
  private idSubscription: Subscription;

  ngOnInit() {
    this.idSubscription = this.shared.currentId.subscribe(id => {
      this.Id = id;
      // console.log('IdRight: ', this.Id);
      this.CandidateDetails();
    });
  }

  ngOnDestroy() {
    if (this.idSubscription) {
      this.idSubscription.unsubscribe();
    }
  }

  // ngOnInit() {
  //   this.Id = this.shared.getId();
  //   this.CandidateDetails();
  // }
  // ngDoCheck(){
  //   this.Id = this.shared.getId();
  //   console.log('IdRight : ' , this.Id);
  //   this.CandidateDetails();
  // }

  _candidateId = '';
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
  CandidateDetails() {
    this.CPService.list(
      `candidate/candidate/${this.Id}/`,
      null,
      (response): void => {
        debugger;
        this.candidateDetails=response;
        // this.candidateDetails = response.data;
        // this.name = this.candidateDetails.candidate_name;
        // console.log(this.candidateDetails);
        // this.Stage = this.candidateDetails.stages;
        // console.log('Stage : ', this.Stage);
        this.my('', this.name);
      }
    );
    // axios
    //   .get(`${this.url1}/candidate/candidate_details/${this._candidateId}/`)
    //   .then((response) => {
    //     this.candidateDetails = response.data;
    //     this.name = this.candidateDetails.candidate_name;
    //     console.log(this.candidateDetails);
    //     this.Stage = this.candidateDetails.stages;
    //     console.log('Stage : ', this.Stage);
    //     this.my('', this.name);
    //   })
    //   .catch((error) => {
    //     console.error('Upload failed', error);
    //   });
  }

  my(type: string, name: any) {
    this.shared.setMessage(this.candidateDetails.candidate_name);
  }

  convertDetailsToFormData(details: any) {
    const formData = new FormData();
    for (const key in details) {
      if (
        details.hasOwnProperty(key) &&
        key !== 'documents' &&
        key !== 'resume'
      ) {
        formData.append(key, details[key]);
      }
    }
    return formData;
  }

  OnChangeUpdateDatabase(type: string, name: any) {
    switch (type) {
      case 'Name':
        this.candidateDetails.candidate_name = name;
        break;
      case 'Headlines':
        break;
      case 'Email':
        this.candidateDetails.email = name;
        break;
      case 'Mobile_No':
        this.candidateDetails.mobile_no = name;
        break;
    }
    console.log('MyId: ',this._candidateId);
    this.CPService.update(
      `candidate/candidate/`,this._candidateId,
      this.candidateDetails,
      (response:any): void => {
        debugger;
        console.log('myresponse : ' , response);
      }
    );
    // axios
    //   .put(`${this.url2}Update-Details/84/`, formData)
    //   .then((response) => {
    //     console.log('Response : ', response);
    //     this.candidateDetails = response.data;
    //     this.name = this.candidateDetails.candidate_name;
    //     console.log(this.candidateDetails);
    //     this.my('', this.name);
    //   })
    //   .catch((error) => {
    //     console.error('Upload failed', error);
    //   });
  }
  copyToClipboardName() {
    const editableElement = document.getElementById('editableName');
    console.log('element is : ' , editableElement);
    if (editableElement) {
      const textToCopy = editableElement.getAttribute('ng-reflect-model');
      navigator.clipboard.writeText(textToCopy);
      console.log('Name is : ' , textToCopy);
    } else {
      console.error('Element not found');
    }
  }
  copyToClipboardNumber() {
    const editableElement = document.getElementById('editableNumber');
    if (editableElement) {
      const textToCopy = editableElement.getAttribute('ng-reflect-model');
      navigator.clipboard.writeText(textToCopy);
      console.log('Name is : ' , textToCopy);
    } else {
      console.error('Element not found');
    }
  }
  copyToClipboardHeadline() {
    const editableElement = document.getElementById('editableHeadline');
    if (editableElement) {
      const textToCopy = editableElement.getAttribute('ng-reflect-model');
      navigator.clipboard.writeText(textToCopy);
      console.log('Name is : ' , textToCopy);
    } else {
      console.error('Element not found');
    }
  }
  copyToClipboardEmail() {
    const editableElement = document.getElementById('editableEmail');
    if (editableElement) {
      const textToCopy = editableElement.getAttribute('ng-reflect-model');
      navigator.clipboard.writeText(textToCopy);
      console.log('Name is : ' , textToCopy);
    } else {
      console.error('Element not found');
    }
  }
  initialDetails: any = {
    candidateName: '',
    headline: '',
    mobile_no: '',
    email: ''
  }; 
  showCheckmark = { candidateName: false, headline: false, mobile_no: false, email: false };
  onInputChange(fieldName: string) {
    this.showCheckmark[fieldName] = this.candidateDetails[fieldName] !== this.initialDetails[fieldName];
  }

  resetInput(fieldName: string) {
    console.log('MyId: ',this._candidateId);
    this.CPService.update(
      `candidate/candidate/`,this._candidateId,
      this.candidateDetails,
      (response:any): void => {
        debugger;
        console.log('myresponse : ' , response);
      }
    );
    this.showCheckmark[fieldName] = false;
  }

}