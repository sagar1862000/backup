import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { DbService } from 'src/app/services/db.service';
// import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';


@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss']
})

export class AgencyComponent implements OnInit {
  constructor(public db: DbService) {
  }



  event: any;

  agency: any = { id: 0 };
  ishideshow = false;
  agency_name: any;
  // onSelectionChanged:any;
  isEdit = false;


  agency_location = [];

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
      headerName: 'Agency Name', field: 'agency_name', sortable: true, filter: true, resizable: true
    },
    { headerName: 'Location', field: 'preferred_location', sortable: true, filter: true },

    { headerName: 'Created at', field: 'created_at', sortable: true, filter: true },
    { headerName: 'Updated at', field: 'updated_at', sortable: true, filter: true },
  ];
  rowData = [];
  gridColumnApi: any;
  gridApi: any;
  onSelectionChanged(event: { api: { getSelectedNodes: () => { (): any; new(): any; length: any; }; }; }) {
    const rowCount = event.api.getSelectedNodes().length;
    window.alert('selection changed, ' + rowCount + ' rows selected');
  }

  ngOnInit() {
    this.agencylocation();

    this.LoadData();
  }
  LoadData(): void {
    this.db.list('agency/', {}, ((response): void => {
      this.rowData = response;
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

  agencynamesuggestion(event: MatAutocompleteSelectedEvent): void {

    this.db.getdata('agencynamesuggestion/', { agencyname: this.agency.agency_name },
      (response: any) => {

        this.agency_name = response;

      });

  }
  agencylocation(): void {

    this.db.getdata('agencylocationsuggestion/', null, (response) => {

      this.agency_location = response;

    });

  }
  // agencylocationsuggestion(event: MatAutocompleteSelectedEvent): void {

  //   this.db.getdata("agencylocationsuggestion/", { agencylocation: this.agency.preferred_location }, (response) => {

  //     this.agency_location = response;

  //   });

  // };

  public onRowClicked(e: { event: { target: { getAttribute: (arg0: string) => any; }; }; data: any; }) {
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
      this.db.destroy('agency/', data.id, ((response): void => {
        this.db.addmessageandremove('Deleted');
        this.LoadData();
      })
      );
    }
  }

  back() {
    this.isEdit = false;
    this.agency = { id: 0 };
    return this.isEdit;
  }

  onActionEditClick(row: { id: any; }): void {

    this.isEdit = false;
    this.db.show('agency/', row.id, ((response): void => {

      this.isEdit = true;
      this.ishideshow = true;
      this.agency = response;
    }));

  }
  agencyupdate(): void {
    this.db.update('agency/', this.agency.id, this.agency, ((response): void => {
      this.isEdit = false;
      this.ishideshow = true;
      this.agency = { id: 0 };
      this.LoadData();
      this.db.showMessage('Updated Successfully');

    }));
  }


  newagencysave(): void {

    this.db.store('agency/', this.agency, ((response): void => {

      this.db.addmessageandremove('Added Successfully');
      this.LoadData();
      this.agency = { id: 0 };
    }));

  }
  onGridReady(params: { api: any; columnApi: any; }) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;


  }



}
function agencyname(arg0: string, agencyname: any, agency_name: any, arg3: (response: any) => void) {
  throw new Error('Function not implemented.');
}

