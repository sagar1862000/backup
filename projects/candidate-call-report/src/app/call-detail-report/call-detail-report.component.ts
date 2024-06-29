import { Component, OnInit, ViewChild } from '@angular/core';
import { DbService } from '../../../../../src/app/services/db.service';
import * as c3 from 'c3';
import { UserService } from '../../../../../src/app/services/user.service';
declare var $: any;


@Component({
  selector: 'app-call-detail-report',
  templateUrl: './call-detail-report.component.html',
  styleUrls: ['./call-detail-report.component.scss']
})

export class CallDetailReportComponent implements OnInit {
  Prgriddata: any;
  DataCalldetails: any;
  jobclientwiseId: any;
  clickvalue: any;
  // name = `Angular! v${VERSION.full}`;
  // @ViewChild("container", { read: ElementRef }) container: ElementRef;
  // public Bardata:any = [
  //   { name: 'abc-1', value: '100', color: '#9954E6' },
  //   { name: 'abc-2', value: '100', color: '#63adfeb3' },
  //   { name: 'abc-3', value: '500', color: '#533a84' },
  //   { name: 'abc-4', value: '300', color: '#dd8050c4' },
  //   { name: 'abc-5', value: '50', color: '#BF60C4' },
  // ];
  public Bardata: any = [
  ];
  public Datashow: any = [];
  public PieDatashow: any = []
  // Piechart:any = [
  //   {
  //     name: "text1",
  //     value: "95",
  //     color:'#6773f1'
  //   },
  //   {
  //     name: "text1",
  //     value: "70",
  //     color:'#FFE15D'
  //   },
  //   {
  //     name: "text3",
  //     value: "50",
  //     color:'#285430'
  //   }
  // ];
  Piechart: any = [
  ];
  // FunnelShowandHide = true;
  BarShowandHise = true;
  PieShowandHide = false;
  Charts: any = [
    // {value: 'Funnel', viewValue: 'Funnel'},
    { value: 'Bar', viewValue: 'Bar' },
    { value: 'Pie', viewValue: 'Pie' },
  ];

  loaddata = false;
  public myfunnelchart: object[];
  public chartLabel: Object;
  public legend: Object;
  public tooltipSetting: object;
  public autoGroupColumnDef;
  public rowSelection;
  public rowGroupPanelShow;
  public pivotPanelShow;
  public onSelectionChanged;
  limitstartIndex: any = 0;
  limitendIndex: any = 20;

  DataDefinitions = [
    { headerName: 'Recruiter Name', field: 'user_Name', sortable: 'true', filter: 'true', data_action_type: 'filtered', data_root: 'All', ignore: 'yes', show: 'yes' },
    { headerName: 'All', field: 'all_candidate', sortable: 'true', filter: 'true', data_action_type: 'filtered', data_root: 'All', action: 'ab', ignore: 'yes', show: 'yes' },
    { headerName: 'Interested', field: 'interested', sortable: true, filter: true, ignore: 'yes', show: 'yes' },
    { headerName: 'Not Interested', field: 'NotInterested', sortable: true, filter: true, ignore: 'yes', show: 'yes' },
    { headerName: 'Call Later', field: 'CallLater', sortable: true, filter: true, ignore: 'yes', show: 'yes' },
    { headerName: 'No Status', field: 'nostatus', sortable: true, filter: true, ignore: 'yes', show: 'yes' },
    { headerName: 'Ring Timeout', field: 'ringtimeout', sortable: true, filter: true, ignore: 'yes', show: 'yes' },
    { headerName: 'Failed', field: 'failed', sortable: true, filter: true, ignore: 'yes', show: 'yes' },
    { headerName: 'Congestion', field: 'Congestion', sortable: true, filter: true, ignore: 'yes', show: 'yes', action: '' },
    { headerName: 'Busy', field: 'busy', sortable: true, filter: true, ignore: 'yes', show: 'yes' },
  ];

  DataDefinitionsGrid = [
    { headerName: 'Recruiter Name', field: 'user_Name', sortable: 'true', filter: 'true', data_action_type: 'filtered', data_root: 'All', ignore: 'yes', show: 'yes' },
    { headerName: 'Candidate Name', field: 'candidate_name', sortable: true, filter: true, ignore: 'yes', show: 'yes' },
    { headerName: 'email', field: 'email', sortable: true, filter: true, ignore: 'yes', show: 'yes' },
    { headerName: 'mobileNo', field: 'mobileNo', sortable: true, filter: true, ignore: 'yes', show: 'yes' },
    { headerName: 'Candidate Status', field: 'final_disposition', sortable: true, filter: true, ignore: 'yes', show: 'yes' },
  ];
  rowData = [];
  @ViewChild('ModelShowCallcallprint')
  public chartObj: CallDetailReportComponent;
  candidatecampignreport: any;
  candidatecampignreportpie: any;
  rowDatas: any;
  managers: any;
  userids: any;
  gridApi: any;
  gridColumnApi: any;
  filtertitle: any;
  chartColors = ['#B18ABD', '#DC913E', '#B2CE6C'];
  chartBarColors = [];
  PieBarColors = []
  data: any;
  candidate_filtered_cols: { headerName: string; field: string; sortable: boolean; filter: boolean; }[];
  candidate_filtered: any;
  campaign: any;
  start_date: any;
  end_date: any;
  myjobdatas: any;
  jobid: number;
  callDetailreportpie: any;
  callDetailreport: any;
  constructor(public db: DbService, public USR: UserService) { }


  printdata(data): void {
    let printContents, popupWin;

    printContents = document.getElementById(data).innerHTML;

    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }


  ngOnInit() {
    this.USR.loadmyteam();
    this.getlistdata();
    this.joblist();
  }

  joblist(): void {
    // this.isLoadingJobs = true;
    this.db.list('joblist/', {}, ((response): void => {
      this.myjobdatas = response;
    })
    );
  }


  getlistdata(): void {


    this.data = {};
    if (this.userids == undefined) {
      this.userids = 0;
    }
    if (this.jobid == undefined) {
      this.jobid = 0;
    }

    if (this.start_date == undefined) {
      this.start_date = new Date('2020-01-01');
    }
    if (this.end_date == undefined) {
      this.end_date = new Date();
    }
    this.data = {
      manager: this.userids, job_id: this.jobid, start_date: this.db.toYYMMDD(this.start_date), end_date: this.db.toYYMMDD(this.end_date)
    };

    //  candidatecallreportApi
    this.db.list('getCallreport/', this.data, (response): void => {

      this.rowDatas = response[0].Interested;

      //   this.myfunnelchart = [
      //     { x: 'No status', value: response[0].nostatus, text: 'No status  : ' + response[0].nostatus },
      //     { x: 'CallLater', value: response[0].CallLater, text: 'No Response: ' + response[0].CallLater },
      //     { x: 'Not Intrested', value: response[0].NotInterested, text: 'Not Intrested : ' + response[0].NotInterested },
      //     { x: 'Congestion', value: response[0].Congestion, text: 'No Response: ' + response[0].Congestion },
      //     { x: 'All', value: response[0].all_candidate, text: 'No Response: ' + response[0].all_candidate },
      //     { x: 'failed', value: response[0].failed, text: 'No Response: ' + response[0].failed },

      //     { x: 'ringtimeout', value: response[0].ringtimeout, text: 'No Response: ' + response[0].ringtimeout },

      //     // {x: 'Interested InComplete', value: response[0].Interested_InComplete, text: 'Interested InComplete : ' + response[0].Interested_InComplete},
      //     // {x: 'Interested Complete', value: response[0].Interested_Complete, text: 'Interested Complete : ' + response[0].Interested_Complete},
      //   ];



      //   this.Bardata = response.flatMap((v) => [

      //     // { Name: v.candidate_name,Count:32 },
      //     // { Name: v.Process_name,Count:32 },
      //     { name: 'Ns', value: v.nostatus, color: '#a64eed' },
      //     // { Name: 'Nr', value: v.No_Response, color: '#BA94D1'},
      //     { name: 'Ni', value: v.NotInterested, color: '#A0E4CB' },
      //     { name: 'In', value: v.interested, color: '#5F8D4E' },

      //     { name: 'Co', value: v.Congestion, color: '#D6E4E5' },
      //     { name: 'al', value: v.all_candidate, color: '#F2E7D5' },
      //     { name: 'By', value: v.busy, color: '#FFEFD6' },
      //     { name: 'Rt', value: v.ringtimeout, color: '#FCDDB0' },
      //     { name: 'Fa', value: v.failed, color: '#474E68' },
      //     // { name: 'Ic', value: v.Interested_Complete, color: '#735F32'},
      //   ]);
      //   this.chartBarColors = ['#a64eed', '#A0E4CB', '#5F8D4E', '#D6E4E5', '#F2E7D5', '#FFEFD6', '#FCDDB0', '#474E68'];
      //   this.Datashow = ['No status', 'Not Intrested', 'Interested Complete', 'Congestion', 'All_candidate', 'Busy', 'Ringtimeout', 'Failed'];

      //   this.Piechart = response.flatMap((v) => [

      //     // { Name: v.candidate_name,Count:32 },
      //     // { Name: v.Process_name,Count:32 },
      //     { name: 'No_status', value: v.nostatus, color: '#a64eed' },
      //     // { Name: 'No_Response',value:v.No_Response,color:'#BA94D1'},
      //     { name: 'Not_Interested', value: v.NotInterested, color: '#BA94D1' },
      //     // { name: 'Interested_InComplete', value: v.Interested_InComplete, color: '#A0E4CB'},
      //     { name: 'Interested_Complete', value: v.interested, color: '#975C8D' },
      //     { name: 'Congestion', value: v.Congestion, color: '#D6E4E5' },
      //     { name: 'all_candidate', value: v.all_candidate, color: '#F2E7D5' },
      //     { name: 'busy', value: v.busy, color: '#FFEFD6' },
      //     { name: 'ringtimeout', value: v.ringtimeout, color: '#FCDDB0' },
      //     { name: 'failed', value: v.failed, color: '#474E68' },

      //   ]);
      //   this.PieBarColors = ['#a64eed', '#A0E4CB', '#5F8D4E', '#D6E4E5', '#F2E7D5', '#FFEFD6', '#FCDDB0', '#474E68'];
      //   this.PieDatashow = ['No status', 'Not Intrested', 'Interested Complete', 'Congestion', 'All_candidate', 'Busy', 'Ringtimeout', 'Failed'];

      //   // Piechart:any = [
      //   //   {
      //   //     name: "text1",
      //   //     value: "95",
      //   //     color:'#6773f1'
      //   //   },
      //   //   {
      //   //     name: "text1",
      //   //     value: "70",
      //   //     color:'#FFE15D'
      //   //   },
      //   //   {
      //   //     name: "text3",
      //   //     value: "50",
      //   //     color:'#285430'
      //   //   }
      //   // ];
      //   this.tooltipSetting = {
      //     enable: true,
      //     format: '${point.x} : <b>${point.y}</b>'
      //   };
      //   this.chartLabel = {
      //     visible: true,
      //     position: 'Inside',
      //     name: 'text'
      //   };
      //   this.legend = {
      //     visible: true,
      //     position: 'Bottom',
      //     height: '8%',
      //     width: '60%'
      //   };

      //   this.loaddata = false;
      //   // }

      //   if (this.columnDefs.length === 0 && response.length > 0) {

      //   }
      //   this.rowData = response;
      //   this.db.sl();

      const xval = ['x'];

      // var Total_Jobs = ['Total Jobs'];
      const nostatus = ['No status'];
      const NotInterested = ['Not Intrested'];
      const interested = ['Interested'];
      const Congestion = ['Congestion'];
      const busy = ['Busy'];
      const ringtimeout = ['Ringtimeout'];
      const failed = ['Failed'];


      for (const i in response) {
        if (response[i]) {
          // xval.push(response[i].recruiter_Name + '( Jobs : ' + response[i].Total_Jobs + ')');
          xval.push(response[i].user_Name);
          nostatus.push(response[i].nostatus);
          NotInterested.push(response[i].NotInterested);
          interested.push(response[i].interested);
          Congestion.push(response[i].Congestion);
          busy.push(response[i].busy);
          ringtimeout.push(response[i].ringtimeout);
          failed.push(response[i].failed);

        }
      }

      const Columns = [];
      const ColumnsPie = [];
      Columns.push(xval);

      Columns.push(nostatus);

      Columns.push(NotInterested);
      Columns.push(interested);
      Columns.push(Congestion);
      Columns.push(busy);
      Columns.push(ringtimeout);
      Columns.push(failed);
      

      ColumnsPie.push(NotInterested);
      ColumnsPie.push(interested);
      ColumnsPie.push(Congestion);
      ColumnsPie.push(busy);
      ColumnsPie.push(ringtimeout);
      ColumnsPie.push(failed);

      

      if (this.loaddata) {

        this.callDetailreport.load({
          unload: true,
          columns: Columns
        });

        this.callDetailreportpie.load({
          unload: true,
          columns: ColumnsPie
        });
      } else {

        this.callDetailreport = c3.generate({
          bindto: '#callDetailReport',
          data: {
            x: 'x',
            columns: Columns,
            type: 'bar'
          },
          bar: {
            width: {
              ratio: 0.8 // this makes bar width 50% of length between ticks
            }
          },
          axis: {
            x: {
              type: 'category',
              tick: {
                rotate: 70,
                multiline: false
              },
              height: 150
            }
          }
        });
        this.callDetailreportpie = c3.generate({
          bindto: '#callDetailReportpie',
          data: {

            columns: ColumnsPie,
            type: 'pie'
          },
          bar: {
            width: {
              ratio: 0.8 // this makes bar width 50% of length between ticks
            }
          },
          axis: {
            x: {
              type: 'category',
              tick: {
                rotate: 75,
                multiline: false
              },
              height: 150
            }
          }
        });

        this.loaddata = true;
      }
      this.rowData = response;
      this.db.sl();



    });

  }
  print() {

    // this.clickvalue=true;
    window.print();
    // this.chartObj.print();

  }
  public pointClick(args: any): void {
    // alert(args.point.x);

    const data = this.rowData[0];
    const dataroot = args.point.x;

    this.load_filtered(data, dataroot);
  }


  datfromprgrid(evt) {
    this.data.startindex = evt.startIndex;
    this.data.endindex = evt.pageSize;
    this.GetCandidateCallReportwise();

    // alert(JSON.stringify(evt));
  }



  public onRowClicked(e) {
    const data = e.data;
    const actionType = e.actionType;
    const dataroot = e.header;
    // switch (actionType) {
    //   case 'filtered':
    return this.load_filtered(data, dataroot);
    // }
  }

  load_filtered(data, dataroot) {
    this.data.root_data = dataroot;
    this.data.value = data;
    this.data.startindex = 0;
    this.data.endindex = 20;
    this.GetCandidateCallReportwise();

  }

  GetCandidateCallReportwise(): void {

    $('#ModelShowCandidatecallWise').appendTo('body').modal('show');

    this.db.list('getCallreportwise/', this.data, (response): void => {

      this.DataCalldetails = response
    });
  }
  openmodal(modalname) {
    $(modalname).appendTo('body').modal('show');

  }
  selectchart(data) {

    if (data == 'Funnel') {

      // this.FunnelShowandHide = !this.FunnelShowandHide;
      this.BarShowandHise = false;
      this.PieShowandHide = false;

    }
    else if (data == 'Bar') {
      this.BarShowandHise = true;
      // this.FunnelShowandHide = false;
      this.PieShowandHide = false;
    }
    else if (data == 'Pie') {
      this.PieShowandHide = true;
      // this.FunnelShowandHide = false;
      this.BarShowandHise = false;

      // FunnelShowandHide:boolean=true;
      // BarShowandHise:boolean=false;
      // PieShowandHide:boolean=false;
    }
    else {

    }
  }

}
