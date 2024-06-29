import { Component, OnInit } from '@angular/core';
import { DbService } from '../../../../../../src/app/services/db.service';
declare var $: any;

@Component({
  selector: 'app-add-candidates',
  templateUrl: './add-candidates.component.html',
  styleUrls: ['./add-candidates.component.scss'],
})
export class AddCandidatesComponent implements OnInit {
  constructor(public db: DbService) {}
  store: any = {
    candidate_name: '',
    gender: '',
    mobile_no: '',
    email: '',
    source_id: '1',
  };
  updateid: any;
  countries = [];
  genders = [];
  ngOnInit() {
    this.LoadDropDown();
  }

  candidatesave():void {
    this.db.store(
      'candidate/add-candidate/',
      this.store,
      (response: any): void => {
        try {
          this.updateid = response.id;
          // this.loadInternalData();
          this.db.addmessageandremove('Candidate added successfully.');
          $('#addcandidate').modal('hide');
        } catch (error) {
          console.error('Error processing response:', error);
          this.db.addmessageandremove('An error occurred while adding the candidate. Please try again.');
        }
      },
    );
  };
  LoadDropDown(): void {
    this.db.list(
      'master/country',
      {
        gi: 'rolecreating',
      },
      (response): void => {
        this.countries = response;
      }
    );
    this.db.list(
      'master/gender',
      {
        gi: 'rolecreating',
      },
      (response): void => {
        debugger;
        this.genders = response;
        console.log('gender : ', this.genders[0].gender_name);
      }
    );
  }
  hidemodal(modalname) {
    $(modalname).modal('.hide');
  }
  // onsubmit(){

  /*Function for calling modal*/

  // $('#addcandidate').modal('hide');
  // }
}
