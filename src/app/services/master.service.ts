import { Injectable, OnInit } from '@angular/core';
import { DbService } from './db.service';
import { Router } from '@angular/router';

declare var $: any;

@Injectable()
export class MasterService implements OnInit {
  departments: any = [];
  assignedJob: any = [];
  Campaigns: any = [];
  constructor(public db: DbService, private router: Router) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  applicationdepartment(isclientdepartment : any): void {
    debugger;
    this.db.list(
      'department/list-department/',
      { isclientdepartment: isclientdepartment },
      (response): void => {
        this.departments = response;

        setTimeout(function () {
          $('.repeatcheckbox .checkbox-material').each(function () {
            $(this).parent().find('.visible').removeClass('visible');
          });
        }, 1000);
      }
    );
  }
  GetJobAssignedbyclientdepartments(
    isclientdepartment : any,
    client_department_id : any
  ): void {
    this.db.list(
      'jobs/view-assign-job/',
      {
        ClientDepartment: client_department_id,
        isclientdepartment: isclientdepartment,
      },
      (response): void => {
        this.assignedJob = response;
      }
    );
  }

  getCampaign(): void {
    debugger;
    this.db.list('campaign/campaign/', null, (response): void => {
      this.Campaigns = response;
    });
  }
}
