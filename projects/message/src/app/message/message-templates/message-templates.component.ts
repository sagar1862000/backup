
import { Component, OnInit } from '@angular/core';
import { DbService } from '../../../../../../src/app/services/db.service';
import { Router } from '@angular/router'
import { animate, state, style, transition, trigger } from '@angular/animations';
import { debug } from 'console';
@Component({
  selector: 'app-message-templates',
  templateUrl: './message-templates.component.html',
  styleUrls: ['./message-templates.component.scss'],
  animations: [
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-180deg)' })),
      transition('rotated => default', animate('1500ms ease-out')),
      transition('default => rotated', animate('400ms ease-in'))
    ])
  ]
})

export class MessageTemplatesComponent implements OnInit {

  constructor(public db: DbService, private router: Router) { }
  
  state = 'default';
  isCreateTemplate: boolean = false
  is_Refresh: boolean = false

  childc: boolean = false;
  isSidebarOpen = false;
  message_templates: string[] = []

  DataDefinitionsGrid = [
    { headerName: 'Template Name', field: 'template_name', sortable: true, filter: true, ignore: 'yes', show: 'yes' },
    { headerName: 'Message', field: 'message', sortable: true, filter: true, ignore: 'yes', show: 'yes' },
    { headerName: 'Sended By', field: 'sended_by', sortable: true, filter: true, ignore: 'yes', show: 'yes' },
    { headerName: 'Edit', field: 'id', action: 'button', actionType: 'edit' },
    { headerName: 'Delete', field: 'id', action: 'button', actionType: 'delete' }

  ];



  ngOnInit(): void {
    this.LoadTemplates();
  }



  LoadTemplates(): void {
    this.db.list('sms/sms-templates/', {}, ((response): void => {
      debugger;
      this.message_templates = response;
      // if (response.length === 0) {
      //   // Route to 'message-log/create-new'
      //   this.childc = true;
      //   this.toggleSidebar();
      //   this.router.navigate(['message/message-template', 'create-new']);
      // } else {
      //   this.router.navigate(['message-template', 'show']);
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
          return this.router.navigate(['message/message-template/create-new', { id: evt.data.id }]);
        case 'delete':
          return this.onActionDeleteClick(evt.data)
      }
    }

  }
  private onActionDeleteClick(data: any) {
    if (confirm('Are you sure?')) {
      this.db.destroy('sms/sms-templates/', data.id, ((response): void => {
        this.db.addmessageandremove('deleted');
        this.LoadTemplates();
      })
      );

    }
    // console.log('View action clicked', data);
  }

  onCloseChild() {
    this.router.navigate(['message/message-template/']);

  }
  goToChild(url) {
    debugger
    this.childc = true;
    this.router.navigate(['message/message-template/', url]);
  }

  // toggleSidebar() {
  //   this.isSidebarOpen = !this.isSidebarOpen;
  // }

}






