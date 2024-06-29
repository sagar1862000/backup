import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from '../../../../../../src/app/services/db.service';

@Component({
  selector: 'app-showbot',
  templateUrl: './showbot.component.html',
  styleUrls: ['./showbot.component.scss']
})

export class ShowbotComponent implements OnInit {
  botdataheader = [
    { headerName: 'Bot Name', field: 'bot_name', sortable: 'true', filter: 'true', data_action_type: 'filtered', data_root: 'All', show: 'yes' },
    { headerName: 'Category', field: 'category', sortable: 'true', filter: 'true', data_action_type: 'filtered', data_root: 'All', show: 'yes'},

  ];
  botData: any = [];
  gridApi: any;
  gridColumnApi: any;
  constructor(private db: DbService, private router: Router, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getBots();

  }

getBots(): void{
  this.db.list('bot/', null, (response): void => {

    this.botData = response;
   });

}

  public onRowClicked(e): void {

    // alert(e.value.id);
    this.router.navigate(['../bot', e.data.id], { relativeTo: this.route });

    // const data = e.value;
    // const actionType = e.actionType;
    // const dataroot = e.dataroot ;
    // switch (actionType) {
    //     case 'filtered':
    // }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }


  datfromprgrid(evt)
  {

    //  alert("startIndex " + evt.startIndex + ". endIndex." + evt.endIndex + "job")
    // alert(JSON.stringify(evt));
  }


}
