import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
declare var $: any;

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})

export class DepartmentComponent implements OnInit {

  public Editor = ClassicEditor;
  title = 'app';
  department = { id: 0, department_name: '', head_of_department: '', department_location: '' };
  isEdit = false;
  item: any = {};
  stateobj = {};

  errors = {};
  isEditclientStateswiseBillingDetail = false;
  clientStateswiseBillingDetail = {};
  private smsselected = {};
  private emailselected = {};
  private gridApi;
  private gridColumnApi;
  isvisible = true;
  private autoGroupColumnDef;
  private defaultColDef;
  public rowSelection;
  public rowGroupPanelShow;
  public pivotPanelShow;
  columnDefs = [
    {
      headerName: 'Action', field: 'id', suppressMenu: true,
      suppressSorting: true,
      template:
        `<button type='button' data-action-type='edit' class='btn btn-success btn-sm'>
         Edit
       </button>

      <button type='button' data-action-type='delete' class='btn btn-danger btn-sm'>
         Delete
      </button>`},
    {
      headerName: 'department', field: 'department_name', sortable: true, filter: true, headerCheckboxSelection: true, width: 300,
      checkboxSelection: true
    },

    { headerName: 'Created at', field: 'created_at', sortable: true, filter: true, width: 250 },
    { headerName: 'Updated at', field: 'updated_at', sortable: true, filter: true, width: 250 },
    { headerName: 'IP Address', field: 'ip address', sortable: true, filter: true, width: 250 },
  ];

  rowData = [
  ];
  isopen: boolean;
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
  }

  LoadData(): void {
    this.db.list('department/list-department/', {}, ((response): void => {
      this.rowData = response;


    }));
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;


  }
  exportdat() {
    this.gridApi.exportDataAsCsv();
  }
  onSelectionChanged(event) {
    // console.log(event.api.getSelectedNodes());
    const rowCount = event.api.getSelectedNodes().length;
    window.alert('selection changed, ' + rowCount + ' rows selected');
  }

  public onRowClicked(e) {
    if (e.event.target !== undefined) {
      const data = e.data;
      const actionType = e.event.target.getAttribute('data-action-type');

      switch (actionType) {
        case 'delete':
          return this.onActionDeleteClick(data);
        case 'edit':
          return this.onActionEditClick(data);
      }
    }
  }

  public onActionDeleteClick(data: any) {

    if (confirm('Are you sure?')) {
      this.db.destroy('department/list-department/', data.id, ((response): void => {
        this.db.addmessageandremove('deleted');
        this.LoadData();
      })
      );

    }
    // console.log('View action clicked', data);
  }


  back(): void {
    this.isEdit = false;
    this.department = { id: 0, department_name: '', head_of_department: '', department_location: '' };

  }

  onActionEditClick(row): void {
   this.isvisible = true;
   this.isopen = false;
   this.isEdit = false;
   this.db.show('department/list-department/', row.id, ((response): void => {

      this.isEdit = true;
      this.department = response;
      //            for (var i in response.data) {
      //                for (var j in response.data[i]) {
      //                    this.gridOptions.columnDefs.push({field:j});
      //                }
      //                break;
      //            }


      //            this.gridTotalJobs.data = response.data;

    }));

  }

  departmentupdate(): void {
    //   if (!$('.validate').validate('#trackermaster')) {
    //     // $.fn.showMessage('Please fill values');
    //    return;
    //  }
    this.db.update('department/list-department/', this.department.id, this.department, ((response): void => {

      this.LoadData();
      this.db.showMessage('Updated Successfully');

    }));
  }

  departmentsave(): void {
    this.db.store('department/add-department/', this.department, ((response): void => {

      this.db.showMessage('Added Successfully');
      this.LoadData();
      this.department =  { id: 0, department_name: '', head_of_department: '', department_location: '' };



    }));

  }
  visible() {

    if (this.isvisible === false) {
      this.isvisible = true;
    } else {
      this.isvisible = false;
    }
    return this.isvisible;
  }
 /* open(){
if(this.isopen===false){
  this.isopen=true;

}else{
  this.isopen=true;
}
return this.isopen

  }*/
}
