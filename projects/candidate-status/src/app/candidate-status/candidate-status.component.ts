import { Component, OnInit } from '@angular/core';
import { DbService } from '../../../../../src/app/services/db.service'
import { Router } from '@angular/router'
import { animate, state, style, transition, trigger } from '@angular/animations';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-candidate-status',
  templateUrl: './candidate-status.component.html',
  styleUrls: ['./candidate-status.component.scss'],
  animations: [
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-180deg)' })),
      transition('rotated => default', animate('1500ms ease-out')),
      transition('default => rotated', animate('400ms ease-in'))
    ])
  ]
})
export class CandidateStatusComponent {

  constructor(private db: DbService,) {
  }

  ngOnInit() {
    this.getCandidateStatus()
  }

 

  DataDefinitionsGrid = [
    { headerName: 'Display Name', field: 'display_name', sortable: true, filter: true, ignore: 'yes', show: 'yes' },
    { headerName: 'Root Name', field: 'root_name', sortable: true, filter: true, ignore: 'yes', show: 'yes' },
    { headerName: 'Is Interview', field: 'is_interview', sortable: true, filter: true, ignore: 'yes', show: 'yes' },
    { headerName: 'Channel ID', field: 'channel_id', sortable: true, filter: true, ignore: 'yes', show: 'yes' },

  ];

  DatFromPRGridTableHeader(evt) {
    debugger;
    // this.data.startindex = evt.startIndex;
    // this.data.endindex = evt.pageSize;
    // this.GetCandidateCallReportwise();

    // alert(JSON.stringify(evt));
  }

  message_templates: string[] = []
  getCandidateStatus() {
    debugger;
    this.db.list('candidate-status/candidate-status/', null,  (response) => {
      debugger;
      this.message_templates = response;
    });
  }

  state = 'default';
  rotate() {
    this.state = (this.state === 'default' ? 'rotated' : 'default');
  }

}

