import { Component, OnInit } from '@angular/core';

import { DbService } from 'src/app/services/db.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { log } from 'util';
import { UntypedFormControl } from '@angular/forms';

declare var $: any;
@Component({
  selector: 'app-add-new-tracker',
  templateUrl: './add-new-tracker.component.html',
  styleUrls: ['./add-new-tracker.component.scss']
})

export class AddNewTrackerComponent implements OnInit {
  public Editor = ClassicEditor;
  $event: any;
  title = 'app';
  is_job_specific: any;
  myControl = new UntypedFormControl();
  states: any;
  newtracker = { id: 0, is_job_specific: '', display_name: '', db_name: '' };
  isEdit = false;
  item: any = {};
  stateobj = {};
  errors = {};
  ishideshow = false;
  isEditclientStateswiseBillingDetail = false;
  clientStateswiseBillingDetail = {};
  private smsselected = {};
  private emailselected = {};
  private gridApi: { exportDataAsCsv: () => void; };
  private gridColumnApi: any;

  private autoGroupColumnDef: any;
  private defaultColDef: { editable: boolean; enableRowGroup: boolean; enablePivot: boolean; enableValue: boolean; sortable: boolean; resizable: boolean; filter: boolean; };
  private rowSelection: any;
  private rowGroupPanelShow: string;
  private pivotPanelShow: string;
  colDefs = [
    {
      headerName: 'Action', field: 'id', // suppressMenu: true,
      // suppressSorting: true,
      template:
        `<button type='button' data-action-type='edit' class='btn btn-success btn-sm '>
         Edit
       </button>

      <button type='button' data-action-type='delete' class='btn btn-danger btn-sm '>
         Delete
      </button>`},
    {
      headerName: 'Display Name', field: 'display_name', sortable: true, filter: true, headerCheckboxSelection: true,
      checkboxSelection: true
    },
    { headerName: 'DB Name', field: 'db_name', sortable: true, filter: true },

    { headerName: 'Created at', field: 'created_at', sortable: true, filter: true },
    { headerName: 'Updated at', field: 'updated_at', sortable: true, filter: true },
    { headerName: 'IP Address', field: 'ipAddress', sortable: true, filter: true },
  ];

  rowData = [
  ];
  dname: any;
  dbname: any;
  constructor(public db: DbService) {
    this.defaultColDef = {
      editable: true,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: true,
      resizable: true,
      filter: true
    };
    this.rowSelection = 'singal';
    this.rowGroupPanelShow = 'always';
    this.pivotPanelShow = 'always';
  }

  ngOnInit() {
    this.LoadData();
    // this.loadStates();

  }

  DisplayNamesuggestion() {


    this.db.list('displaynamesuggestion/', this.newtracker, ((response): void => {

      this.dname = response;

    }));

  }


  // DisplayNamesuggestion():void {
  //
  //   this.newtracker;
  //   $("#dname").autocomplete({

  //       source: this.db.rooturi  + "index.php/api/displaynamesuggestion?token=" + this.db.token + '&' + this.newtracker,
  //       minLength: 1,
  //       select: function (event, ui) {


  //       }
  //   });
  // }

  DBNamesuggestion() {


    this.db.list('dbnamesuggestion/', this.newtracker, ((response): void => {

      this.dbname = response;

    }));

  }

  // DBNamesuggestion(): void{
  //
  //   $("#dbname").autocomplete({
  //       source: this.db.rooturi  + "index.php/api/dbnamesuggestion?token=" + this.db.token + '&' + this.newtracker,
  //       minLength: 1,
  //       select: function (event, ui) {
  //

  //           // log("Selected: " + ui.item.value + " aka " + ui.item.id);
  //       }
  //   });
  // }


  LoadData(): void {
    this.db.list('tracker/tracker-master/', {}, ((response): void => {
      this.rowData = response;


    }));
  }
  onGridReady(params: { api: any; columnApi: any; }) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;


  }
  exportdat() {
    this.gridApi.exportDataAsCsv();
  }
  onSelectionChanged(event: { api: { getSelectedNodes: () => { (): any; new(): any; length: any; }; }; }) {
    const rowCount = event.api.getSelectedNodes().length;
    window.alert('selection changed, ' + rowCount + ' rows selected');
  }

  public onRowClicked(e: { event: { target: { getAttribute: (arg0: string) => any; }; }; data: any; }) {
    if (e.event.target !== undefined) {
      const data = e.data;
      const actionType = e.event.target.getAttribute('data-action-type');

      switch (actionType) {
        case 'delete':
          return this.onActionDeleteClick(data);
        case 'edit':
          return this.onActionEditClick(data), this.showhideedit();
      }
    }
  }

  public onActionDeleteClick(data: any) {

    if (confirm('Are you sure?')) {
      this.db.destroy('tracker/tracker-master/', data.id, ((response): void => {
        this.db.addmessageandremove('deleted');
        this.LoadData();
      })
      );
    }
  }

  back() {
    this.isEdit = false;
    this.newtracker = { id: 0, display_name: '', is_job_specific: '', db_name: '' };
    return this.isEdit;
  }

  onActionEditClick(row: { id: any; }): void {
    debugger;
    this.isEdit = false;
    this.db.show('tracker/tracker-master/', row.id, ((response): void => {

      this.isEdit = true;
      this.newtracker = response;
      //            for (var i in response.data) {
      //                for (var j in response.data[i]) {
      //                    this.gridOptions.columnDefs.push({field:j});
      //                }
      //                break;
      //            }


      //            this.gridTotalJobs.data = response.data;

    }));

  }

  newtrackerupdate(): void {
    //     if (!$('.validate').validate('#trackertemp')) {
    //     // $.fn.showMessage('Please fill values');
    //    return;
    //  }

    this.db.update('tracker/tracker-master/', this.newtracker.id, this.newtracker, ((response): void => {

      this.LoadData();
      this.db.showMessage('Updated Successfully');

    }));
  }

  newtrackersave(): void {
    // if (!$('.validate').validate('#trackertemp')) {
    //     // $.fn.showMessage('Please fill values');
    //    return;
    //  }
    // this.user.profilepic=this.user.profilepic[0];

    this.db.store('tracker/tracker-master/', this.newtracker, ((response): void => {

      this.db.showMessage('Added Successfully');
      this.LoadData();
      this.newtracker = { id: 0, display_name: '', is_job_specific: '', db_name: '' };


    }));

  }
  showhide() {

    if (this.ishideshow === false) {
      this.ishideshow = true;
    }
    else {
      this.ishideshow = false;
    }
    return this.ishideshow;
  }
  showhideedit() {
    if (this.ishideshow === false) {
      this.ishideshow = true;
    }
    return this.ishideshow;
  }
  // OnGridReady(params: { api: any; columnApi: any; }) {
  // this.gridApi = params.api;
  // this.gridColumnApi = params.columnApi;


  // }

}
