import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { isArray } from 'jquery';
import { DbService } from '../../../../../../src/app/services/db.service'
import { UserService } from '../../../../../../src/app/services/user.service';
import { MasterService } from '../../../../../../src/app/services/master.service';
declare var $: any;
@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss']
})
export class CallComponent implements OnInit {
  @Input()
  // allids = [];
  getcandidatebyclientaddtojob: any;
  clients = [];
  callportnameobj: any;
  departments = [];
  jobslistbyclientsaddtojob = [];
  managers = [];
  addtojob: any = {};
  sendemailmodel: any = {};
  copycandidate: any = {};
  myjob: any = {};
  sms: any = {};
  call: any = {};
  profile: any = {};
  store: any = {};
  selectedCarId: any;
  emailselected: any = {};
  smsselected: any = {};
  // filteredOptions = ['first', 'second', 'three'];
  myControl = new UntypedFormControl();
  options: string[] = ['One', 'Two', 'Three'];
  callportname: any;
  byjobcalltype = false;
  clientsdepartment: string;
  clientsdropdown = false;
  departmentsdropdown = false;
  _allids: any = [];
  location: any;
  isSelectLocation = false;
  @Input()
  set allids(allids: any) {

    if (isArray(allids)) {
      this._allids = allids;


    }
  }
  constructor(public db: DbService, public USR: UserService, public MR:MasterService) {

  }

  ngOnInit() {

    this.db.list('department/list-client/', null, ((response): void => {
      this.clients = response;
      // // console.log(this.clients);
    }));
    this.db.list('department/list-department/', null, ((response): void => {
      this.departments = response;
      // // console.log(this.departments);
    }));


    //  manoj     check
    // this.db.list('department/', null, ((response): void => {
    //   this.clients = response;
    //   // console.log(this.departments);
    //  }));
    //  manoj     check

    this.db.list('user/profile/', null, ((response): void => {
      this.profile = response;
      // // console.log(this.profile);
    }));
    // this.applicationcallportname();
    this.USR.loadmyteam();

  }
  // applicationcallportname(): void {

  //   this.callportnameobj = [];
  //   this.db.list('getcallportname', {}, (response): void => {

  //     this.callportname = response;

  //     for (const con in this.callportname) {
  //       if (true) {
  //         // this.convidsplited = con.substring(con.lastIndexOf('_'));
  //         this.callportnameobj.push({
  //           key: con.split('__')[0],
  //           text: this.callportname[con],
  //         });

  //       }
  //     }

  //   });
  // }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  checkcallport(): void {
    
    this.call.add_new_job_id;

    this.db.list('getcallportnamebyjobid', this.call, (response): void => {

      this.call.callto = response[0].calltype;
      if (this.call.callto == null || this.call.callto === '') {
        this.byjobcalltype = false;
      } else {
        this.byjobcalltype = true;
      }

      // for (const con in this.callportname) {
      //   if (true) {
      //     this.callportnameobj.push({
      //       key: con.split('__')[0],
      //       value: this.callportname[con].text,
      //       text: this.callportname[con],

      //     })

      //   }
      // }

    });

    // if (this.db.profile.call_status = 'newcall') {
      this.db.show('job/show-job/', this.call.add_new_job_id, (response): void => {
        
        // response.location;
        var arr2 = response.location.toString().split(',');
        
        this.location = arr2.filter(element => {
          return element;
        });
        this.isSelectLocation = true;
        

      });
    // }
  }
  getclientdepartment() {

    if (this.clientsdepartment == 'Client') {
      // this.clientsdepartments = true;
      this.addtojob.client_detail_id = null;
      this.clientsdropdown = true;
      this.departmentsdropdown = false;
      debugger
      this.MR.applicationdepartment('client');

    } else if (this.clientsdepartment == 'Department') {
      // this.clientsdepartments = false;
      this.addtojob.client_detail_id = null;
      this.clientsdropdown = false;
      this.departmentsdropdown = true;
      debugger
      this.MR.applicationdepartment('department');
    }
  }



  sendcalltocandidates(): void {


    const allrow = this.db.idscheckbox;
    // this.db.extractIDsData(this.db.ids1);
    // this.db->selectedids;

    if (allrow.length === 0) {
      this.db.showMessage('Please select candidates');
      return;
    }
    
    if ((this.call.interview_startdate === undefined) || (this.call.interview_enddate === undefined)) {
      const copyjob = {
        candidates: allrow.toString(), job: this.call.add_new_job_id,
        manager: this.call.manager, callto: this.call.callto,
        inbound_lead: 1, language: this.call.language,
        job_location: this.call.job_location, department_id: this.call.department_id
        // 'interview_startdate': this.db.toYYMMDDTT(this.call.interview_startdate),
        // 'interview_ostartdate': this.db.toYYMMDDTT(this.call.interview_ostartdate),
        // 'interview_enddate': this.db.toYYMMDDTT(this.call.interview_enddate),
        // 'interview_oenddate': this.db.toYYMMDDTT(this.call.interview_oenddate),
        // 'interview_loc': this.call.interview_loc
      };

      //

      this.db.store('call/send-call-ats/', copyjob, ((response): void => {

        // // console.log(response);
        $('#calldiv').modal('hide');

        const addtojobmessage = 'Call In Queue';
        // if (response.error.msg == null) {

        this.db.addmessageandremove(addtojobmessage);
        //  } else if (response.error.msg != null) {
        //   this.db.addmessageandremove(response.error.msg);
        // }
      }));
      // , ((Response): void => {
      //
      //   this.db.addmessageandremove(Response.msg);
      // })
      // );
    } else {
      const copyjob = {
        candidates: allrow.toString(), job: this.call.add_new_job_id,
        manager: this.call.manager, callto: this.call.callto,
        interview_startdate: this.db.toYYMMDD(this.call.interview_startdate),
        interview_time_start: this.db.toTT(this.call.interview_ostartdate),
        interview_enddate: this.db.toYYMMDD(this.call.interview_enddate),
        interview_time_end: this.db.toTT(this.call.interview_oenddate),
        interview_loc: this.call.interview_loc,
        language: this.call.language,
        job_location: this.call.job_location,
        department_id: this.call.department_id
      };

      //

      this.db.store('call/send-call-ats/', copyjob, ((response): void => {

        // // console.log(response);
        $('#calldiv').modal('hide');

        const addtojobmessage = 'Call In Queue';
        // if (response.error.msg == null) {

        this.db.addmessageandremove(addtojobmessage);
        // } else if (response.error.msg != null) {
        //   this.db.addmessageandremove(response.error.msg);
        // }

      })
        // , ((Response): void => {
        //
        //   this.db.showMessage(Response.msg);
        // })
      );

    }
  }
  directlineupdata(): void {
    $('#directlineupdata').show();


  }
  hidedirectlineupdata(): void {
    $('#directlineupdata').hide();


  }
}
