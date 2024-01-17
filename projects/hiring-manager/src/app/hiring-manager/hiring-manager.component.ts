import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import { UntypedFormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router'
import { FormGroup } from '@angular/forms';
import { MasterService } from 'src/app/services/master.service';
// import { DbService } from '../db.service';
@Component({
  selector: 'app-hiring-manager',
  templateUrl: './hiring-manager.component.html',
  styleUrls: ['./hiring-manager.component.scss'],
  animations: [
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-180deg)' })),
      transition('rotated => default', animate('1500ms ease-out')),
      transition('default => rotated', animate('400ms ease-in'))
    ])
  ]
})

export class HiringManagerComponent implements OnInit {

  

  emailFormControl = new UntypedFormControl('', [
    Validators.required,
    Validators.email,
  ]);

  isvisible = false;
  state = 'default';
  is_Refresh: boolean = false


  private smsselected = {};
  private emailselected = {};
  private gridApi;
  hiring = { id: 0 };
  private gridColumnApi;
  //  onRowClicked:any;
  onSelectionChanged: any;
  public autoGroupColumnDef;
  private defaultColDef;
  public rowSelection;
  public rowGroupPanelShow;
  public pivotPanelShow;
  isEdit = false;

  isCreateTemplate: boolean = false




  departments = [];
  hiringmanager = { id: 0, name: '', email: '', mobile: '', department: '' };
  rowData = [];
  // columnDefs = [
  //   {
  //     headerName: 'Action', field: 'id', suppressMenu: true,
  //     sortable: false, width: 320,
  //     template:
  //       `<button type="button" data-action-type="edit" class="btn btn-success btn-sm">
  //        Edit
  //      </button>

  //     <button type="button" data-action-type="delete" class="btn btn-danger btn-sm">
  //        Delete
  //     </button>`},

  //   { headerName: 'HM Name', field: 'name', sortable: true, filter: true, width: 320, },

  //   { headerName: 'Created at', field: 'created_at', sortable: true, filter: true, width: 320, },
  //   { headerName: 'Updated at', field: 'updated_at', sortable: true, filter: true, width: 320, },
  // ];
  DataDefinitions = [

  { headerName: 'Created At', field: 'name', sortable: true, filter: true, ignore: 'yes', show: 'yes' },
  { headerName: 'Name', field: 'updated_at', sortable: true, filter: true, ignore: 'yes', show: 'yes' },
  { headerName: 'Updated By', field: 'created_at', sortable: true, filter: true, ignore: 'yes', show: 'yes' },
  { headerName: 'Edit', field: 'id', action: 'button', actionType: 'edit' },
  { headerName: 'Delete', field: 'id', action: 'button', actionType: 'delete' }

];

  // DataDefinitions = [
  //   // { headerName: 'Action', field: 'id', sortable: true, filter: true, width: 320, show: 'yes' },

  //   { headerName: 'HM Name', field: 'name', sortable: true, filter: true, width: 320, show: 'yes' },

  //   { headerName: 'Created at', field: 'created_at', sortable: true, filter: true, width: 320, show: 'yes' },
  //   { headerName: 'Updated at', field: 'updated_at', sortable: true, filter: true, width: 320, show: 'yes' },
  //   { headerName: 'Edit', field: 'id', action: 'button', actionType: 'edit' },
  //   { headerName: 'Delete', field: 'id', action: 'button', actionType: 'delete' }
  // ];
  constructor(private db: DbService, private router: Router, private master:MasterService ) { }

  ngOnInit(): void {
    // this.applicationdepartment();
    this.LoadData();
  }

  // applicationdepartment(): void {
  //   this.db.list('applicationdepartment', {}, (response): void => {

  //     this.departments = response;

  //   });
  // }
 


  LoadData(): void {
    this.db.list('hiring-manager/', {}, ((response): void => {

      this.rowData = response;

    }));
  }

  addHiringmanager(): void {

    // console.log(this.hiringmanager);
    this.db.store('hiring-manager/', this.hiringmanager, ((response): void => {
      this.db.showMessage('Added Successfully');
      this.LoadData();
      this.hiringmanager = { id: 0, name: '', email: '', mobile: '', department: '' };
    }));
  }

  onGridReady(event): void {

  }


  visible() {

    if (this.isvisible === false) {
      this.isvisible = true;
    } else {
      this.isvisible = false;
    }
    return this.isvisible;
  }
  visibleonedit() {

    if (this.isvisible === false) {
      this.isvisible = true;
    } else {
      this.isvisible = true;

    }
    return this.isvisible;

  }
  back() {
    this.isEdit = false;
  }




  
  onRowClicked(evt) {
    // debugger;
    if (evt.entry.actionType !== undefined) {
      const actionType = evt.entry.actionType;
      switch (actionType) {

        case 'edit':
          return this.router.navigate(['hiring-manager/create-new-hiring', { id: evt.data.id }]);
        case 'delete':
          return this.onActionDeleteClick(evt.data)
      }
    }
  }


  onActionEditClick(row: { id: any; }): void {
    this.isvisible = true;
    this.isEdit = false;
    this.db.show('hiring-manager/', row.id, ((response): void => {

      this.isEdit = true;
      this.hiringmanager = response;
      //            for (var i in response.data) {
      //                for (var j in response.data[i]) {
      //                    this.gridOptions.columnDefs.push({field:j});
      //                }
      //                break;
      //            }


      //            this.gridTotalJobs.data = response.data;

    }));

  }

  datfromprgrid(evt) {
    //  alert("startIndex " + evt.startIndex + ". endIndex." + evt.endIndex + "job")
  }
  public onActionDeleteClick(data: any) {

    if (confirm('Are you sure?')) {
      this.db.destroy('hiring-manager/', data.id, ((response): void => {
        this.db.addmessageandremove('deleted');
        this.LoadData();
      })
      );
      // console.log('View action clicked', data);
    }
  }

  rotate() {
    this.state = (this.state === 'default' ? 'rotated' : 'default');
  }


  message_templates: string[] = []

  LoadTemplates(): void {
    this.db.list('hiring-manager/', {}, ((response): void => {
      // debugger;
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



  childc: boolean = false;
  goToChild(url) {
    this.childc = true;
    this.router.navigate(['hiring-manager/', url]);
  }

  onCloseChild() {
    this.router.navigate(['hiring-manager']);

  }


  DatFromPRGridTableHeader(evt) {
    // debugger;
    // this.data.startindex = evt.startIndex;
    // this.data.endindex = evt.pageSize;
    // this.GetCandidateCallReportwise();

    // alert(JSON.stringify(evt));
  }

}