import { Component, EventEmitter, Output } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import axios from 'axios';
@Component({
  selector: 'app-right-side-nav',
  templateUrl: './right-side-nav.component.html',
  styleUrls: ['./right-side-nav.component.css'],
})
export class RightSideNavComponent {
  constructor(private shared: SharedService) {}

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
  ngDoCheck() {
    // console.log('hi');
    if(this.shared.getStage()){
    this.Stage = this.shared.getStage();
    console.log('myStage : ',this.Stage);
    }
  }
  CandidateDetails() {
    axios
      .get(`${this.url1}candidate_details/84/`)
      .then((response) => {
        this.candidateDetails = response.data;
        this.name = this.candidateDetails.candidate_name;
        console.log(this.candidateDetails);
        this.Stage = this.candidateDetails.stages;
        console.log('Stage : ', this.Stage);
        this.my('', this.name);
      })
      .catch((error) => {
        console.error('Upload failed', error);
      });
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
    let formData = this.convertDetailsToFormData(this.candidateDetails);
    axios
      .put(`${this.url2}Update-Details/84/`, formData)
      .then((response) => {
        console.log('Response : ', response);
        this.candidateDetails = response.data;
        this.name = this.candidateDetails.candidate_name;
        console.log(this.candidateDetails);
        this.my('', this.name);
      })
      .catch((error) => {
        console.error('Upload failed', error);
      });
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
