import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { isArray } from 'jquery';
import { DbService } from '../../../../../../src/app/services/db.service'
import { UserService } from '../../../../../../src/app/services/user.service';
import { MasterService } from '../../../../../../src/app/services/master.service';
declare var $: any;
@Component({
  selector: 'app-add-to-job',
  templateUrl: './add-to-job.component.html',
  styleUrls: ['./add-to-job.component.scss']
})
export class AddToJobComponent implements OnInit {
  clients = [];
  jobslistbyclientsaddtojob = [];
  managers = [];
  addtojob: any = {};
  sendemailmodel: any = {};
  copycandidate: any = {};
  myjob: any = {};
  sms: any = {};
  addnewjob: any = {};
  profile: any = {};
  store: any = {};
  selectedCarId: any;
  emailselected: any = {};
  smsselected: any = {};
  assign = false;
  unassign = false;
  _allids: any;
  @Input()
  // allids = [];
  @Input()
  callids = [];
  // filteredOptions = ['first', 'second', 'three'];
  myControl = new UntypedFormControl();
  options: string[] = ['One', 'Two', 'Three'];
  jobslistbyclientsaddtojobs: any;
  clientsdepartment: string;
  clientsdropdown = false;
  departmentsdropdown = false;
  departments: any;
  @Input()
  set allids(allids: any) {

    if (isArray(allids)) {

      this._allids = allids;

    }
  }
  constructor(public db: DbService, public USR: UserService, public MR: MasterService) {

  }

  ngOnInit() {
    this.assign = true;
    this.unassign = false;
    this.USR.loadmyteam();
    debugger
    this.MR.getCampaign();
  }

  assigncandidate(): void {
    this.assign = true;
    this.unassign = false;
  }
  unassigncandidate(): void {
    this.assign = false;
    this.unassign = true;
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  addtojobcandidates(): void {
    const allrow = this.db.idscheckbox;
    if (allrow.length === 0) {
      this.db.showMessage('Please select candidates');
      $('#addtojob').modal('hide');
      return;
    }

    const copyjob = {
      candidates: allrow.toString(), job: this.addnewjob.add_new_job_id,
      manager: this.addnewjob.manager
    };

    this.db.store('job/add-to-job/', copyjob, ((response): void => {
      $('#addtojob').modal('hide');
      let addtojobmessage = '';
      if (response.alreadyexists > 0) {

        addtojobmessage = response.alreadyexists + ' Candidate(s) already in pipeline.';
      } else {
        addtojobmessage = 'Candidate Added Successfully';


      }

      this.db.showMessage(addtojobmessage);
      this.afteraddtojob();

    })
    );
    // ((Response): void => {
    //   this.db.showMessage('Some error occured');
    // })
    // );

  }
  afteraddtojob(): void {

    if (this.callids.length > 0) {
      const allrow = this.allids;
      const callid = this.callids;
      const job_id = this.addnewjob.add_new_job_id;

      const data = { candidateid: allrow.toString(), callid: callid.toString(), job_id };
      this.db.store('candidateaddtojob/', data, (response): void => {
        this.db.showMessage('Candidate remove from callhistory');
      }
      );
    }
  }



  getclientdepartment() {

    if (this.clientsdepartment == 'Client') {
      this.addtojob.client_detail_id = null;
      this.clientsdropdown = true;
      this.departmentsdropdown = false;
      debugger
      this.MR.applicationdepartment('client');

    } else if (this.clientsdepartment == 'Department') {
      this.addtojob.client_detail_id = null;
      this.clientsdropdown = false;
      this.departmentsdropdown = true;
      this.MR.applicationdepartment('department');

    }

  }



  assignjob(): void {

    const assignjob = {
      managers: [this.addnewjob.manager],
      jobs: [this.addnewjob.add_new_job_id],
      assigndate: 'OneDay'
    };

    this.db.store('assignjob/', assignjob, ((response): void => {
      this.addtojobcandidates();
      // this.checkclientdepartment();

      this.db.addmessageandremove('job successfully asssign for ToDay');
    }));
  }
  // checkclientdepartment(): void {
  //   if (this.clientsdepartment == 'Client' || this.db.clientsdepartment == 'Client') {
  //     this.getcandidatebyaddtojob(1);
  //   } else if (this.clientsdepartment == 'Department' || this.db.clientsdepartment == 'Department') {
  //     this.getcandidatebyaddtojob(2);
  //   }
  // }


  // getcandidatebyclientaddtojob(): void {
  //
  //   this.db.list('addnewjob/', { clientId: this.addtojob.client_detail_id, managerId: this.addnewjob.manager }, ((response): void => {
  //
  //     this.jobslistbyclientsaddtojob = response[0];
  //     this.jobslistbyclientsaddtojobs = response[1];
  //   }));
  // }


  // filterListCareUnit(val) {
  //   // console.log(val);
  //   this.jobslistbyclientsaddtojobs = this.jobslistbyclientsaddtojobs.filter((unit) => unit.label.indexOf(val) > -1);
  // }

}
