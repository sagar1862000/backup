import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

declare var $: any;
@Component({
  selector: 'app-tracker-fields',
  templateUrl: './tracker-fields.component.html',
  styleUrls: ['./tracker-fields.component.scss']
})

export class TrackerFieldsComponent implements OnInit {
  id: any;
  ishidereference = true;
  Event: any;
  onSelectionChanged: any;
  obj: any;
  isEdit = false;
  trackermessage: any = {};
  trackerselected = [];
  trackerselected_temp = [];
  trackermaster = [];
  dd = [];
  isscroll = false;
  trackerdata: any;
  // public rowdata = [{ 1: 3 }, { 3: 3 }];
  tracker: any;
  search: '';
  ishideshow = false;
  // trackerfieldname =
  hidecheckbox = false;
  private smsselected = {};
  private emailselected = {};
  private gridApi;
  private gridColumnApi;
  private colDefs: any;
  private autoGroupColumnDef: any;
  private defaultColDef;
  private rowSelection;
  private rowGroupPanelShow;
  private pivotPanelShow;

  columnDefs = [
    {
      headerName: 'Action', field: 'id', suppressMenu: true,
      sortable: false, width: 320,
      template:
        `<button type="button" data-action-type="edit" class="btn btn-success btn-sm">
         Edit
       </button>

      <button type="button" data-action-type="delete" class="btn btn-danger btn-sm">
         Delete
      </button>`},

    { headerName: 'Tracker Name', field: 'tracker_name', sortable: true, filter: true, width: 320, },
    { headerName: 'Created at', field: 'created_at', sortable: true, filter: true, width: 320, },
    { headerName: 'Updated at', field: 'updated_at', sortable: true, filter: true, width: 320, },
  ];
  rowData = [];
  trackerfieldname: any;
  public onRowClicked(e): any {

    this.ishideshow = true;

    if (e.event.target !== undefined) {
      const data = e.data;
      const actionType = e.event.target.getAttribute('data-action-type');
      switch (actionType) {
        case 'delete':
          return this.onActionDeleteClick(data);
        case 'edit':
          return this.Edit(data), this.showhideedit();
      }
    }
  }
  public onActionDeleteClick(data: any): void {
    if (confirm('Are you sure?')) {
      this.db.destroy('tracker/', data.id, ((response): void => {
        this.db.addmessageandremove('deleted');
      }));
    }
  }
  onActionEditClick(row): void {

    this.isEdit = false;
    this.db.show('tracker/', row.id, ((response): void => {
      this.isEdit = true;
      this.trackermessage = response;

      if (this.isscroll === false) {
        window.scrollTo(0, 100);
      }

      //            for (var i in response.data) {
      //                for (var j in response.data[i]) {
      //                    this.gridOptions.columnDefs.push({field:j});
      //                }
      //                break;
      //            }


      //            this.gridTotalJobs.data = response.data;

    }));
  }



  constructor(private db: DbService, private http: HttpClient) {
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



  ngOnInit(): any {
    this.loadTrackerMaster();
    this.getlist();
  }


  show(): void {
    this.hidecheckbox = true;
  }

  back(): Boolean {
    this.isEdit = false;
    this.trackermessage = {};
    this.trackerselected = [];
    return this.isEdit;
  }
  showhide(): Boolean {
    if (this.ishideshow == false) {
      this.ishideshow = true;
    } else {
      this.ishideshow = false;
    }
    return this.ishideshow;
  }
  showhideedit(): Boolean {
    if (this.ishideshow === false) {
      this.ishideshow = true;
    }
    return this.ishideshow;
  }
  makeeditable(row): void {
    this.isEdit = true;
    // previousValue = scope.model;
  }

  Edit(row): void {
    debugger;
    this.trackerselected = [];
    this.isEdit = true;
    this.trackermessage = row;
    const tracker_data = row.tracker_data;
    for (const k in tracker_data) {
      if (tracker_data[k]) {
        for (const j in this.trackermaster) {
          // tslint:disable-next-line: triple-equals
          if (tracker_data[k] == this.trackermaster[j].id) {
            this.trackerselected.push(this.trackermaster[j]);
            break;
          }
        }
      }
    }



  }
  Delete(row): void {


    if (confirm('Are you sure?')) {
      this.db.destroy('tracker/tracker/', row.id, ((response): void => {

        this.db.addmessageandremove('Deleted Successfully');

        this.getlist();



      }));
    }

  }
  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.trackerselected, event.previousIndex, event.currentIndex);
  }

  trackersuggest(): void {
    if (!$('#searchtracker').hasClass('loaded')) {
      const availableTags = [];
      for (const k in this.trackermaster) {
        if (this.trackermaster[k]) {
          availableTags.push(this.trackermaster[k].display_name);
        }
      }
      $('#searchtracker').autocomplete({
        source: availableTags
      });

      $('#searchtracker').addClass('loaded');
    }
  }

  loadTrackerMaster(): void {
    this.db.list('tracker/tracker-master/', null, ((response): void => {

      this.trackermaster = response;
    }));
  }

  removetracker(tracker): void {
    this.trackerselected_temp = [];
    for (const i in this.trackerselected) {
      if (this.trackerselected[i].id !== tracker.id) {
        this.trackerselected_temp.push(this.trackerselected[i]);
      }
    }
    this.trackerselected = this.trackerselected_temp;
  }
  getlist(): void {
    this.db.list('tracker/tracker/', null, ((response): void => {
      // try {
      this.rowData = response;
      // } catch (e) {
      // }

    }));
  }
  deleteThisRow(entity): void {
  }



  trackersave(): void {
    //

    if (this.isEdit === false) {
      this.trackerselected = [];
    }

    for (const k in this.trackermaster) {
      if (this.trackermaster[k]) {
        this.tracker = this.trackermaster[k];
        if (this.tracker.selected) {

          let isExist = false;
          for (const i in this.trackerselected) {
            if (this.trackerselected[i].id === this.tracker.id) {
              isExist = true;
              break;
            }
          }
          if (!isExist) {
            if (this.tracker !== undefined) {
              this.trackerselected.push(this.tracker);
            }
          } else {
          }
        }
      }
    }
  }
  gettrackerfield(): void {
    this.db.list('searchtrackername/', null, ((response): void => {
      this.trackerfieldname = response;
    })
    );
  }

  // checkexistingjob(): void {
  //
  //   if (this.checkexistjob == this.myjob.job_title) {
  //     this.db.addmessageandremove('this job already added change job title');
  //   } else {
  //     this.addNewJobSave();
  //   }
  // }


  submittrackersave(): void {

    this.trackerdata = this.tracker;
    this.trackerdata = {};

    const liElements = this.trackerselected; // mySort.getElementsByTagName('li');
    //            for (var i = 0; i < liElements.length; i++) {
    //                newSortIndexes.push(liElements[i].getAttribute('data-index'));
    //            }
    for (let i = 0; i < liElements.length; i++) {
      this.trackerdata[(i + 1).toString()] = liElements[i].id;


    }
    if (this.trackermessage === undefined) {
      alert('please enter tracker');

    } else {
      const trackerdata = JSON.stringify(this.trackerdata);
      this.trackermessage.tracker_data = trackerdata;
      this.db.store('tracker/tracker/', this.trackermessage, ((response): void => {
        this.db.addmessageandremove('Added Successfully');
        this.getlist();
      }));
    }

  }



  showuser(id): void {

    //        this.channel.channel;
    this.db.show('tracker/', id, ((response): void => {
      this.trackermessage = response;
      this.Edit(this.trackermessage);

    }));
  }
  trackerupdate(): void {
    this.trackerdata = {};
    const liElements = this.trackerselected;
    for (let i = 0; i < liElements.length; i++) {
      this.trackerdata[(i + 1).toString()] = liElements[i].id;
    }

    this.trackermessage.tracker_data = JSON.stringify(this.trackerdata);
    this.db.update('tracker/', this.trackermessage.id, this.trackermessage, ((response): void => {

      this.getlist();
      this.db.addmessageandremove('Updated Successfully');
      this.ngOnInit();

    }));
  }



  onGridReady(event): void {

  }







}
