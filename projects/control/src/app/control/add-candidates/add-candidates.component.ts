import { Component, OnInit } from '@angular/core';
import { DbService } from '../../../../../../src/app/services/db.service'
declare var $: any;

@Component({
  selector: 'app-add-candidates',
  templateUrl: './add-candidates.component.html',
  styleUrls: ['./add-candidates.component.scss']
})

export class AddCandidatesComponent implements OnInit {

  store: any = { candidate_name: '', gender: '', mobileNo: '', email: '' };
  updateid: any;
  countries = [];
  genders = [];
  constructor(public db: DbService) { }

  ngOnInit() {
    this.LoadDropDown();
  }

  candidatesave = function () {


    this.db.store('candidatedetail/', this.store, ((response): void => {

      this.updateid = response.id;


      this.loadInternalData();
      this.db.addmessageandremove('Candidate added successfully.');
      $('#addcandidate').modal('hide');
    }));
  };
  LoadDropDown(): void {
    this.db.list('master/country', {
      gi: 'rolecreating'
    }, ((response): void => {
      this.countries = response;
    }));
    this.db.list('master/gender', {
      gi: 'rolecreating'
    }, ((response): void => {
      this.genders = response;
    }));
  }
  hidemodal(modalname) {
    $(modalname).modal('.hide');

  }
  // onsubmit(){

  /*Function for calling modal*/


  // $('#addcandidate').modal('hide');
  // }

}