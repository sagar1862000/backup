import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import axios from 'axios';
import { CandidateProfileService } from '../candidateprofile-service.service';
@Component({
  selector: 'app-right-side-nav',
  templateUrl: './right-side-nav.component.html',
  styleUrls: ['./right-side-nav.component.css'],
})
export class RightSideNavComponent {
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
  ngOnInit() {
    this.CandidateDetails();

  }

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

  ngDoCheck() {
    // console.log('hi');
    if (this.shared.getStage()) {
      this.Stage = this.shared.getStage();
    }
  }
  CandidateDetails() {
    this.CPService.list(
      `candidate/candidate/${this._candidateId}/`,
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

    // this.candidateDetails.candidate_name = name;
    // let formData = this.convertDetailsToFormData(this.candidateDetails);
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
    if (editableElement) {
      const textToCopy = editableElement.innerText;
      navigator.clipboard.writeText(textToCopy);
    } else {
      console.error('Element not found');
    }
    // console.log('Name is : ' , this.name);
  }
  copyToClipboardNumber() {
    const editableElement = document.getElementById('editableNumber');
    if (editableElement) {
      const textToCopy = editableElement.innerText;
      navigator.clipboard.writeText(textToCopy);
    } else {
      console.error('Element not found');
    }
  }
  copyToClipboardHeadline() {
    const editableElement = document.getElementById('editableNumber');
    if (editableElement) {
      const textToCopy = editableElement.innerText;
      navigator.clipboard.writeText(textToCopy);
    } else {
      console.error('Element not found');
    }
  }
  copyToClipboardEmail() {
    const editableElement = document.getElementById('editableEmail');
    if (editableElement) {
      const textToCopy = editableElement.innerText;
      navigator.clipboard.writeText(textToCopy);
    } else {
      console.error('Element not found');
    }
  }
}