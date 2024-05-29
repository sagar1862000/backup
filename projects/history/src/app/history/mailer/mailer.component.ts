import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { DbService } from '../../../../../../src/app/services/db.service';
import { UserService } from '../../../../../../src/app/services/user.service';
declare var $: any;
@Component({
  selector: 'app-mailer',
  templateUrl: './mailer.component.html',
  styleUrls: ['./mailer.component.scss'],
})
export class MailerComponent implements OnInit {
  @Input()
  allids = [];
  clients = [];
  departments = [];
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
  // filteredOptions = ['first', 'second', 'three'];
  myControl = new UntypedFormControl();
  options: string[] = ['One', 'Two', 'Three'];
  clientsdepartment: string;
  clientsdropdown = false;
  departmentsdropdown = false;
  constructor(public db: DbService, public USR: UserService) {}

  ngOnInit() {
    this.db.list('department/list-client/', null, (response): void => {
      this.clients = response;
      // // console.log(this.clients);
    });
    this.db.list('department/list-department/', null, (response): void => {
      this.departments = response;
      // console.log(this.departments);
    });
    // this.db.list('department/', null, ((response): void => {
    //   this.clients = response;
    //   // console.log(this.departments);
    // }));
    this.db.list('user/profile/', null, (response): void => {
      this.profile = response;
      // // console.log(this.profile);
    });
    this.USR.loadmyteam();
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  sendmailsmstocandidates(): void {
    const allrow = this.db.ids;

    if (allrow.length === 0) {
      this.db.showMessage('Please select candidates');
      return;
    }
    const copyjob = {
      candidates: allrow.toString(),
      job: this.addnewjob.add_new_job_id,
      manager: this.addnewjob.manager,
    };

    this.db.store(
      'mailer/',
      copyjob,
      (response): void => {
        $('#mailer').modal('hide');

        const addtojobmessage = 'Done';

        this.db.showMessage(addtojobmessage);
      },
      (Response): void => {
        this.db.showMessage('Some error occured');
      }
    );
  }
  getclientdepartment() {
    if (this.clientsdepartment == 'Client') {
      // this.clientsdepartments = true;
      this.clientsdropdown = true;
      this.departmentsdropdown = false;
    } else if (this.clientsdepartment == 'Department') {
      // this.clientsdepartments = false;
      this.clientsdropdown = false;
      this.departmentsdropdown = true;
    }
  }
  getcandidatebyaddtojob(checkclientdepartment): void {
    this.db.list(
      'addnewjobss/',
      {
        clientId: this.addtojob.client_detail_id,
        isclientdepartment: checkclientdepartment,
      },
      (response): void => {
        this.jobslistbyclientsaddtojob = response;
      }
    );
  }
  // getcandidatebyclientaddtojob(): void {

  //   this.db.list('addnewjob/', { clientId: this.addtojob.client_detail_id }, ((response): void => {
  //     this.jobslistbyclientsaddtojob = response;
  //   }));
  // }
  getcandidatebydepartmentaddtojob(): void {
    this.db.list(
      'addnewjob/',
      { clientId: this.addtojob.client_detail_id },
      (response): void => {
        this.jobslistbyclientsaddtojob = response;
      }
    );
  }

  directlineupdata(): void {
    $('#directlineupdata').show();
  }
  hidedirectlineupdata(): void {
    $('#directlineupdata').hide();
  }
}
