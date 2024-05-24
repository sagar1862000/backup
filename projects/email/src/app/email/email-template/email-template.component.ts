
import { Component, OnInit } from '@angular/core';
import { DbService } from '../../../../../../src/app/services/db.service';
import { Router } from '@angular/router'
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-email-template',
  templateUrl: './email-template.component.html',
  styleUrls: ['./email-template.component.scss'],
  animations: [
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-180deg)' })),
      transition('rotated => default', animate('1500ms ease-out')),
      transition('default => rotated', animate('400ms ease-in'))
    ])
  ]
})


export class EmailTemplateComponent implements OnInit {

  constructor(public db: DbService, private router: Router) { }
  state = 'default';
  isCreateTemplate: boolean = false
  is_Refresh: boolean = false

  childc: boolean = false;
  isSidebarOpen = false;
  email_templates: string[] = []

  DataDefinitionsGrid = [
    { headerName: 'Template Name', field: 'template_name', sortable: true, filter: true, ignore: 'yes', show: 'yes' },
    { headerName: 'email', field: 'email', sortable: true, filter: true, ignore: 'yes', show: 'yes' },
    { headerName: 'Sended By', field: 'sended_by', sortable: true, filter: true, ignore: 'yes', show: 'yes' },
    { headerName: 'Edit', field: 'id', action: 'button', actionType: 'edit' },
    { headerName: 'Delete', field: 'id', action: 'button', actionType: 'delete' }

  ];



  ngOnInit(): void {
    this.LoadTemplates();
  }



  LoadTemplates(): void {
    this.db.list('email/email-templates/', {}, ((response): void => {
      debugger;
      this.email_templates = response;
      // if (response.length === 0) {
      //   // Route to 'email-log/create-new'
      //   this.childc = true;
      //   this.toggleSidebar();
      //   this.router.navigate(['email/email-template', 'create-new']);
      // } else {
      //   this.router.navigate(['email-template', 'show']);
      // }
    }));
  }
  rotate() {
    this.state = (this.state === 'default' ? 'rotated' : 'default');
  }








  DatFromPRGridTableHeader(evt) {
    debugger;
    // this.data.startindex = evt.startIndex;
    // this.data.endindex = evt.pageSize;
    // this.GetCandidateCallReportwise();

    // alert(JSON.stringify(evt));
  }
  onRowClicked(evt) {
    debugger;
    if (evt.entry.actionType !== undefined) {
      const actionType = evt.entry.actionType;
      switch (actionType) {

        case 'edit':
          return this.router.navigate(['email/email-template/create-new', { id: evt.data.id }]);
        case 'delete':
          return this.onActionDeleteClick(evt.data)
      }
    }

  }
  private onActionDeleteClick(data: any) {
    if (confirm('Are you sure?')) {
      this.db.destroy('email/email-templates/', data.id, ((response): void => {
        this.db.addmessageandremove('deleted');
        this.LoadTemplates();
      })
      );

    }
    // console.log('View action clicked', data);
  }

  onCloseChild() {
    this.router.navigate(['email/email-template/']);

  }
  goToChild(url) {
    this.childc = true;
    this.router.navigate(['email/email-template/', url]);
  }

  // toggleSidebar() {
  //   this.isSidebarOpen = !this.isSidebarOpen;
  // }

}

