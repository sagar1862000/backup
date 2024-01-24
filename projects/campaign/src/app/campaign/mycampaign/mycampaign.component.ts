import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-mycampaign',
  templateUrl: './mycampaign.component.html',
  styleUrls: ['./mycampaign.component.scss']
})

export class MycampaignComponent implements OnInit {

  DataDefinitionsGrid = [
    { headerName: 'Campaign name', field: 'campaign_name', sortable: true, filter: true, ignore: 'yes', show: 'yes' },
    { headerName: 'Show Flow', field: 'id', action: 'button', actionType: 'flow' },
  ];
  botData: any = [];
  gridApi: any;
  gridColumnApi: any;
  constructor(private db: DbService, public router: Router) { }

  ngOnInit(): void {
    this.getCampaign();

  }

  getCampaign(): void {
    this.db.list('campaign/campaign/', null, (response): void => {
      this.botData = response;
    });
  }

  // public onRowClicked(e): void {

  //   if (e.data.id == null && e.data.id == undefined) {
  //     this.router.navigate(['dashboard/']);
  //   }
  //   else {

  //     const encoded = window.btoa(e.data.id);

  //     this.router.navigate(['campaign/flow/' + encoded, {}]);

  //     // this.router.navigate(['../Createcampaign'+  {}]);

  //     // if (e.event.target !== undefined) {
  //     //   const data = e.data;
  //     //   const actionType = e.event.target.getAttribute('data-action-type');
  //     //   const dataroot = e.event.target.getAttribute('data-root');

  //     const data = e.data;
  //     // const actionType = e.actionType;
  //     // const dataroot = e.dataroot;
  //     // switch (actionType) {
  //     //   case 'filtered':
  //     //   // return 'hi';
  //     //   // return this.load_filtered(data, dataroot);
  //     //   // break;
  //     //   // }
  //     // }
  //   }
  // }

  DatFromPRGridTableHeader(evt) {
    debugger;
    // this.data.startindex = evt.startIndex;
    // this.data.endindex = evt.pageSize;
    // this.GetCandidateCallReportwise();

    // alert(JSON.stringify(evt));
  }


  // onRowClicked(evt) {
  //   debugger;
  //   if (evt.entry.actionType !== undefined) {
  //     const actionType = evt.entry.actionType;
  //     switch (actionType) {

  //       case 'flow':
  //         const encoded = window.btoa(evt.data.id);
  //         return this.router.navigate(['campaign/flow/',  encoded ]);
  //     }
  //   }

  // }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }


  datfromprgrid(evt) {

    // alert("startIndex " + evt.startIndex + ". endIndex." + evt.endIndex + "job")
    // alert(JSON.stringify(evt));
  }


}