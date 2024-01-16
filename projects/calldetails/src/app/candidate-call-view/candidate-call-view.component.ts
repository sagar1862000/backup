import { Component, OnInit, HostListener, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
// import { PrgridcalldetailComponent } from '../grids/prgridcalldetail/prgridcalldetail.component';
import { DbService } from 'src/app/services/db.service';
import { Chart } from 'chart.js';
// import { CandidateCallDatailsComponent } from '../control/candidate-call-datails/candidate-call-datails.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ExcelService } from 'src/app/services/excel.service';
import { ChartType, ChartOptions } from 'chart.js';

import { BubblechartService } from 'projects/charts/src/app/charts/bubblechart/bubblechart.service';
import { TreemapserviceService } from 'projects/charts/src/app/charts/bubblechart/treemapservice.service';
import { column } from '../../../../charts/src/app/charts/circular-progress/circular-progress.component';
declare var $: any;

import pdfmake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfmake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-candidate-call-view',
  templateUrl: './candidate-call-view.component.html',
  styleUrls: ['./candidate-call-view.component.scss']
})


export class CandidateCallViewComponent implements OnInit {
  @ViewChild("myChart") _myChart: ElementRef;
  Datashow = ['1 Rating', '2 Rating', '3 Rating', '4 Rating', '5 Rating'];
  chartData: column[] = [

  ]

  allChartData: column[] = [];

  chartColors: string[] = [];
  chartBarColors = ["#B18ABD", "#DC913E", "#B2CE6C", '#5F8D4E', '#735F32'];
  GraphsData: any = [
    {
      ringtimeout: 10,
      busy: 20,
      Interested: 30,
      Notinterested: 9,
      rating1: 5,
      rating2: 10,
      rating3: 40,
      completecall: 50,
      notcompletecall: 80,
      totalcandidate: 100,
      rating4: 30,
      rating5: 20,
      cognation: 42,
      nostatus: 20,
      other: []
    }
  ]
  title: string = "MIGRATION PROGRESS";

  public dynHeight = 300;
  direction = 100;
  public doughnutChartType: ChartType = 'doughnut';

  trackerdata: any;
  trackerselected: any[];
  isEdit: boolean;
  trackermessage: any;
  trackermaster: any;
  Getdownloadcandidatedata: any = [];
  jobcount: any;
  totalcandidateCount: any;
  SearchfilterCalls: any;
  showchart: boolean = true;
  showmyjoblist: any = {};
  gridmyjoblist: any = {};
  gridmyjoblistApi: any = {};
  gridApipopup: any = {};
  first_skill: string;
  second_skill: string;
  third_skill: string;

  constructor(public db: DbService, public route: ActivatedRoute, private router: Router, private excelService: ExcelService, private d3PackedBubbleChartService: BubblechartService, private d3TreemapService: TreemapserviceService) {


  }



  senddata: boolean = false
  Rating: any;
  @Input() childMessage: string;
  sendtracker: any = {};
  isvisible = false;
  nocv: any;
  resumesupload: any;
  withoutcv: any;
  download = false;
  selectednodes = [];
  allids = [];
  callids = [];
  rowData: any = {};
  datas: any = {};
  graphdatas: any;
  searchcandidate: any;
  jobslistmain: any;
  isLoadingJobs: boolean;
  jobslist: any;
  locationname: any;
  locationcount: any;
  candidatesearch: any;
  avgreting: number = 0;
  gmrreting: number = 0;
  jobsdata: any;
  expfrom: number = 0;
  height: any;
  rating: any;
  downloadcv = false;
  isinterview: number;
  freshness: any;
  jobitemselected: any;
  mainprocessnewvar: any;
  childprocessnewvar: any;
  gridheader: string;
  selectedjob: any;
  startIndexNumber: any;
  EndIndexNumber: any;
  process: any;
  item: any = { start_date_temp: new Date(), end_date_temp: new Date() };
  mainprocess: number;
  ShowCandidates = false;
  gridColumnApi: any;
  Bubbledata: any;
  Bubble: any = {}
  arr: any = []
  gridApi: any;
  gridOptionsloadcandidatesInPopUp: any = {};
  callconversation: any = {};
  conversationsobj: any[];
  checkconversations: any;
  conversations: any;
  candidate_id = 0;
  onCommentClick: any;
  currentData: {};
  locationtype: string;
  convidsplited: any;
  chatconversation: any;
  breakchat: any;
  chatobj: any;
  chatdata: any;
  locations: any[];
  location: any;
  fullscreen = true;
  filterscreen = false;
  Tecnical = false;
  Averages = false;
  pskills = false;
  sskills = false;
  tskills = false;
  myjobid: string;
  cv_to_panel: any = {};
  commentstatus: { ajid: number; comment: any; status: any; };
  ajid: any;
  call_id: any;
  trackerno: any;
  countRowsinMyJob = 0;
  gmrretingsec: number = 0;
  tskill: number = 0;
  sskill: number = 0;
  pskill: number = 0;
  expto: number = 50;
  education: any;
  // process: any;
  // mainprocess: any;
  noticp: any;
  Experiencefrom: any;
  Average: any;
  // grammar: any;
  thirdskill: any;
  secondskill: any;
  firstskill: any;
  Experienceto: any;
  // location: any;
  salaryto: number = 90;
  salaryfrom: number = 0;
  // selectedjob: any;
  candidate: any;
  calltype: any;
  // isinterview: any;
  start_date: any;
  Education: any;
  relocatelocation: any;
  jobOpportunity: any;
  nightshift: any;
  isinternet: any;
  Concentrixpremises: any;
  issystem: any;
  Diplomaflanguage: any;
  Workedinpast: any;
  appid: number;
  EndIndexCandidateCallview: any = 20;
  limitstartIndex: any = 0;
  limitendIndex: any = 20;
  finalexportdata: any;
  candidatestatus = 'all';
  evt: any;
  notes: string;
  CandidateNote: any = {
    notes: ''
  };
  activities: any;



  hidecols = [
    'Detailed Report', 'Checkbox', 'candidateProfile', 'Candidate Details'
  ];


  DataDefinitions = [
    { headerName: 'Checkbox', field: 'id', type: 'checkbox', print: 'heading', showxl: 'no' },
    { headerName: 'candidate Name', field: 'candidate_name', type: 'text', style: 'font-size:15px;', class: 'mt-1', tag: 'span', print: 'headingleft', showxl: 'yes' },
    { headerName: 'Contact number', field: 'mobileNo', type: 'texticon', iconname: 'number.svg', size: 'col-md-4', tag: 'span', print: 'bodyleft', showxl: 'yes' },
    { headerName: 'Email', field: 'email', type: 'texticon', iconname: 'Email.svg', tag: 'span', size: 'col-md-4', print: 'bodyleft', showxl: 'yes' },
    { headerName: 'Current Salary', field: 'currentSalary', type: 'texticon', iconname: 'Salary.svg', size: 'col-md-4', tag: 'span', print: 'bodyleft', showxl: 'yes' },
    { headerName: 'currentOrganization', field: 'currentOrganization', type: 'texticon', iconname: 'organization.svg', size: 'col-md-4', print: 'bodyleft', showxl: 'yes' },

    { headerName: 'CallID', field: 'call_h_id', type: 'texticon', tag: 'span', size: 'col-md-4', iconname: 'call id.svg', print: 'bodyleft', showxl: 'yes' },
    // { headerName: 'notes', field: 'candidate_name', type: "icon", style: "font-weight: bold; font-size:15px;", class: "material-icons", tag: "mat-icon", print: "headingleft", size: "col-md-3", value:"speaker_notes" },
    { headerName: 'call_updated_at', field: 'call_updated_at', size: 'col-md-4', type: 'texticon', tag: 'span', iconname: 'date-and-time 1.svg', print: 'bodyleft', showxl: 'yes' },
    { headerName: 'Voice Result', field: 'voice_match', size: 'col-md-4', type: 'texticon', tag: 'span', iconname: 'mic.svg', print: 'bodyleft', showxl: 'yes' },

    { headerName: 'Candidate Skills Rating', field: 'final_avg_rating_skills', type: 'rating', style: 'font-weight: bold; font-size:15px;', class: 'pull-left', tag: 'span', print: 'headingright', size: 'pull-left', outoffrating: 5, showxl: 'no' },

    { headerName: 'candidateProfile', field: 'candidate_name', type: 'iconimagesmall', iconname: 'Resume.svg', style: 'font-weight: bold; font-size:15px;', class: 'mt-1', tag: 'span', print: 'headingleft', size: 'col-md-3', showxl: 'no', ngIf: "true" },
    // {
    //   headerName: 'Candidate Remove Dedupe', field: 'candidate_name', type: 'icon', style: 'font-weight: bold; font-size:15px;', class: 'material-icons pull-right', tag: 'span', print: 'headingright', size: 'pull-right', showxl: 'no', value: 'person_remove',
    //   ngIf: "({{varify_aadhar}}==0 || {{apply_again}}==0)"
    // },
    { headerName: 'candidateProfile', field: 'candidate_name', type: 'iconimagelarge', iconname: 'akar-icons_whatsapp-fill.svg', style: 'font-weight: bold; font-size:15px;', class: 'pull-right', tag: 'span', print: 'headingright', size: 'pull-right', showxl: 'no' },
    { headerName: 'Candidate Grammar Rating', field: 'Average_Rating', type: 'rating', style: 'font-weight: bold; font-size:15px;', class: 'pull-right', tag: 'span', print: 'headingleft', size: 'pull-right', outoffrating: 5, showxl: 'no' },

    { headerName: 'Candidate Status', field: 'final_disposition', type: 'button', tag: 'center', class: 'col-md-12 ', style: 'color:#76489c; font-weight:bold', print: 'bodyright', size: 'col-md-12', showxl: 'no' },
    { headerName: 'Detailed Report', field: 'call_h_id', type: 'showheader', tag: 'button', print: 'bodyright', size: 'col-md-12', class: 'btn btn-sm btn-outline-info col-md-12', style: 'color:#76489c; border: 1px solid #76489c;', showxl: 'no' },
  ];
  // public databarchart= [
  // ];
  public databarchart = [
    { name: "abc-1", value: "100", color: "#9954E6" },
    { name: "abc-2", value: "100", color: "#63adfeb3" },
    { name: "abc-3", value: "100", color: "#533a84" },
    { name: "abc-4", value: "100", color: "#dd8050c4" },
    { name: "abc-5", value: "50", color: "#BF60C4" }
  ];

  // public databarchart: SimpleDataModel[]=[]
  //   <span
  // ngIf: "(({{varify_aadhar}}==0 || {{apply_again}}==0) && ({{fromSubmitTime}} >=start_date_temp && {{fromSubmitTime}} <=end_date_temp)) && this.db.mp.detailed_report"

  //   *ngIf="((item.varify_aadhar==1 || item.apply_again==1) && (item.fromSubmitTime >=start_date_temp && item.fromSubmitTime <=end_date_temp)) && db.mp.detailed_report"
  //   class="material-icons" style="color: red; cursor: pointer;" (click)="removededupe(item)"
  //   title="Remove De-dupe">
  //   person_remove
  // </span>
  grammar: boolean;
  callportnameobj: any[];
  callportname: any;
  grammarII = false;
  grammarI = false;
  selectemail = true;
  todaydatedate = new Date();
  Filterdatetime: any;
  trackerlist: any;
  hiringmanagers: any;
  scrollPosition: number;
  header_variable = false;
  currentPage: any;
  pageSize: any;
  call_id_Printernalgrid: any;
  PrInternalGrid_data: any;
  startIndex: any;
  endIndex: any;







  checkpage: string;



  SendmsgWhatsapp(): void {

    // const appid = this.db.profile.appid;
    const appid = this.db.profile.appid;
    const statusurl = '\n  https://passivereferral.com/call_status_candidate/' + this.PrInternalGrid_data.call_id + '/' + this.PrInternalGrid_data.recruiter_id + '/' + this.PrInternalGrid_data.id + '/' + this.PrInternalGrid_data.jobid + '/ChangeStatus';
    this.db.list('candidatenote/', { candidate_id: this.PrInternalGrid_data.id }, (response): void => {


      if (response.length > 0) {
        this.notes = response[0].notes;
      } else {
        this.notes = '';
      }

      const urlboolean = 'https://wa.me/?text=' + this.notes + '\n' + statusurl;
      window.open(urlboolean.toString(), '_blank');
    });
  }

  public oncandidateshowClick1() {



    // this.PrInternalGrid_data.tempdate = new Date().getMilliseconds();
    this.currentData = {};

    this.currentData = this.PrInternalGrid_data;
    $('#candidateshow').appendTo('body').modal('show');

  }

  datafromprgridbuttondetailsWhatup(evt) {
    // console.log('parent');


    switch (evt.buttondetails1) {

      case 'SendmsgWhatsapp':

        this.SendmsgWhatsapp();
        break;
      case 'oncandidateshowClick':

        this.oncandidateshowClick1();
        break;
    }
    return evt.call_h_id;
  }


  changestatus(candidatestatus): void {

    const data = this.finalexportdata;

    this.callids = [];
    for (const con in data) {

      this.callids.push(data[con].call_id);

    }


    if (this.callids.length == 0) {
      this.callids = this.PrInternalGrid_data.call_h_id;
    }

    const changestatus = {
      call_id: this.PrInternalGrid_data.call_h_id.toString(),
      status: candidatestatus,
      // call_id_Printernalgrid
    };

    if (confirm('Are you sure?')) {
      this.db.list('updatecandidatestatus/', changestatus, (response): void => {

        this.loadCandidate();
        this.loadGraphs();
        this.db.addmessageandremove('candidate status changed');

      });
    }

    // data;
  }


  //  case "Busy":  case "Congestion": case "Not interested" : case "Profile interested": case "Ring timeout":
  //  case "No status ":

  //  // const url = this.router.serializeUrl(
  //   //   this.router.createUrlTree(['candidate-call-history',evt.data.id ]) );
  //   //   // candidateDetails
  //   //   // recruiterreportnew
  //   // window.open(url, '_blank');
  //   // this.changestatus(evt.final_disposition);
  //




  OnRowclicked(evt) {

    switch (evt.headername) {
      case 'Detailed Report':
        this.Getcandidatedetail(evt.fulldata.call_id, evt.fulldata.id);
        break;
      case 'candidateProfile':
        const url = '/candidate/' + evt.fulldata.id;
        window.open(url, '_blank');
        break;
      case 'notes':
        return this.onNotesClick(evt.fulldata);
        break;
    }



  }


















  getcallshistory(callid, id) {
    const id1 = btoa(id);
    // $('#call-history').appendTo("body").modal('show');
    // const call_id = callid;
    // this.db.list('getcallshistory/', { 'callid': call_id }, (response): void => {

    // this.callhistorydatas = response;
    // })

    const url = this.router.serializeUrl(

      // this.router.createUrlTree(['candidate-call-history', { call_id: callid }])
      // this.router.createUrlTree(['../Candidatedetails/calls', { call_id: callid,id:id }])
      this.router.createUrlTree(['Candidatedetails', { id: id1 }])
    );

    window.open(url, '_blank');

  }
  Getcandidatedetail(callid, id): void {
    const id1 = btoa(id);
    const callidencrypted = btoa(callid);
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['Candidatedetails', { candidateid: id1 }, 'calls', 'candidate-call-history', { call_id: callid }])
    );

    window.open(url, '_blank');
  }


  OnHeaderClicked(evt) {

    this.limitstartIndex = evt.startIndex;
    this.limitendIndex = evt.pageSize;

    this.limitstartIndex = evt.startIndex;
    this.EndIndexCandidateCallview = evt.pageSize;
    this.myjobid = this.route.snapshot.paramMap.get('job_id');
    const jobid = this.route.snapshot.paramMap.get('job_id');
    const mainprocess = 'My Candidates';
    const childprocess = this.route.snapshot.paramMap.get('callstatus');
    const startdate = this.route.snapshot.paramMap.get('SearchstartDatefilter');
    const enddate = this.route.snapshot.paramMap.get('EndDatefilter');
    this.router.navigate(['call-view', { job_id: jobid, callstatus: childprocess, startIndex: evt.startIndex, endIndex: evt.pageSize, candidate_name: this.searchcandidate, SearchstartDatefilter: this.db.toYYMMDD(this.item.start_date_temp), EndDatefilter: this.db.toYYMMDD(this.item.end_date_temp), setpage: evt.pageSize }]);
    this.filterdrbytab(mainprocess, childprocess, jobid);


  }


  @HostListener('window:scroll', [])
  checkScroll() {
    window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const header = document.getElementById('myHeader');
    const sticky = header.offsetTop;
    if (window.pageYOffset > sticky) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }

  }
  formatLabel(value: any) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;

  }





  ngOnInit() {

    // this.d3PackedBubbleChartService.renderChart();

    this.getHM();
    this.item.start_date_temp = new Date((new Date(this.item.end_date_temp)).getTime() - ((60 * 60 * 24 * 1000) * 30));
    this.applicationcallportname();

    this.ratingshowbycallport();

    localStorage.setItem('page', '1');
    // this.datafromprgridbuttondetails(evt)
    this.filterscreens();
    this.loadlocation();

    this.myjobid = this.route.snapshot.paramMap.get('job_id');

    const jobid = this.route.snapshot.paramMap.get('job_id');
    const mainprocess = 'My Candidates';
    const childprocess = this.route.snapshot.paramMap.get('callstatus');
    const startdate = this.route.snapshot.paramMap.get('SearchstartDatefilter');
    const enddate = this.route.snapshot.paramMap.get('EndDatefilter');

    this.startIndex = this.route.snapshot.paramMap.get('startIndex');
    this.endIndex = this.route.snapshot.paramMap.get('endIndex');
    this.pageSize = this.route.snapshot.paramMap.get('setpage');
    this.call_id_Printernalgrid = this.route.snapshot.paramMap.get('call_id_Printernalgrid');
    this.PrInternalGrid_data = this.route.snapshot.paramMap.get('PrInternalGrid_data');

    this.item = { start_date_temp: new Date(startdate), end_date_temp: new Date(enddate) };

    this.candidatesearch = this.route.snapshot.paramMap.get('candidate_name');
    this.bindJob(jobid);
    this.filterdrbytab(mainprocess, childprocess, jobid);
    this.db.list('tracker/tracker-master/', null, ((response): void => {
      this.trackermaster = response;
    }));


  }



  getHM(): void {
    this.db.list('hiringmanager/', {}, ((response): void => {

      this.hiringmanagers = response;
    }));
  }
  fullscreens(): void {
    this.fullscreen = true;
    this.filterscreen = false;
  }

  filterscreens(): void {
    this.filterscreen = true;
    this.fullscreen = false;
  }


  bindJob(jobid: string): void {
    this.db.list('getJobdata/', { jobid }, ((response): void => {
      this.first_skill = response[0].first_skill;
      this.second_skill = response[0].second_skill;
      this.third_skill = response[0].third_skill;


      this.jobsdata = response;
      this.appid = response[0].app_id;

    })
    );
  }
  close() {
    this.isvisible = false;
    $('#filter').show();
    $('#pull').addClass('col-md-12');
  }
  changeemailsubmittopannel(): void {
    if (this.selectemail == true) {
      this.selectemail = false;
    } else if (this.selectemail == false) {
      this.selectemail = true;

    }
  }


  ratingshowbycallport(): void {

    this.db.list('chackcallport', {}, (response): void => {
      this.rating = response[0].campaign_name;
      if (this.rating == 'Rating Bot' || this.rating == 'Pilot Rating Bot') {
        this.Tecnical = true;
        this.Averages = true;
        this.grammar = false;

      } else if (this.rating == 'Communication Bot' || this.rating == 'Video & Cv Bot' || this.rating == 'Pilot Communication Bot') {
        this.Tecnical = false;
        this.grammar = true;
        this.Averages = true;
      } else {
        this.Tecnical = false;
        this.grammar = false;
        this.Averages = false;
      }
    });

  }

  rateingshow(): void {

    if (this.rating == 0) {
      this.Averages = true;
      this.pskills = false;
      this.sskills = false;
      this.tskills = false;
      this.grammarI = false;
      this.grammarII = false;
    } else if (this.rating == 1) {
      this.Averages = false;
      this.pskills = true;
      this.sskills = false;
      this.tskills = false;
      this.grammarI = false;
      this.grammarII = false;
    }
    else if (this.rating == 2) {
      this.Averages = false;
      this.pskills = false;
      this.sskills = true;
      this.tskills = false;
      this.grammarI = false;
      this.grammarII = false;
    }
    else if (this.rating == 3) {
      this.Averages = false;
      this.pskills = false;
      this.sskills = false;
      this.tskills = true;
      this.grammarI = false;
      this.grammarII = false;
    }
    else if (this.rating == 4) {
      this.Averages = false;
      this.pskills = false;
      this.sskills = false;
      this.tskills = false;
      this.grammarI = true;
      this.grammarII = false;
    } else if (this.rating == 5) {
      this.Averages = false;
      this.pskills = false;
      this.sskills = false;
      this.tskills = false;
      this.grammarI = false;
      this.grammarII = true;
    }
  }

  loaddatawithdate(startenddateloadcvparse: string) {
    this.todaydatedate = new Date();
    if (startenddateloadcvparse == 'Today') {
      this.item.start_date_temp = new Date();
      this.item.end_date_temp = new Date();
    } else if (startenddateloadcvparse == 'Yesterday') {
      this.item.start_date_temp = new Date((new Date(this.todaydatedate)).getTime() - (60 * 60 * 24 * 1000));
      this.item.end_date_temp = new Date((new Date(this.todaydatedate)).getTime() - (60 * 60 * 24 * 1000));
    } else if (startenddateloadcvparse == 'Last 7 Days') {
      this.item.start_date_temp = new Date((new Date(this.todaydatedate)).getTime() - ((60 * 60 * 24 * 1000) * 7));
      this.item.end_date_temp = new Date();
    } else if (startenddateloadcvparse == 'Last 30 Days') {
      this.item.start_date_temp = new Date((new Date(this.todaydatedate)).getTime() - ((60 * 60 * 24 * 1000) * 30));
      this.item.end_date_temp = new Date();
    } else if (startenddateloadcvparse == 'This Month') {
      this.item.start_date_temp = new Date(this.todaydatedate.getFullYear(), this.todaydatedate.getMonth(), 1);
      this.item.end_date_temp = new Date();
    } else if (startenddateloadcvparse == 'Last Month') {
      this.item.start_date_temp = new Date(this.todaydatedate.getFullYear(), this.todaydatedate.getMonth() - 1, 1);
      this.item.end_date_temp = new Date(this.todaydatedate.getFullYear(), this.todaydatedate.getMonth() - 1 + 1, 0);
    }
    // const start = this.db.toYYMMDD(this.start_date_temp);
    // const end = this.db.toYYMMDD(this.end_date_temp);
    this.loadCandidate();
    this.loadGraphs();
    $('#choosedatescv').modal('hide');
    this.Filterdatetime = startenddateloadcvparse;
    if (this.Filterdatetime == null) {
      this.Filterdatetime = 'Custom';
    }
  }

  loadlocation(): void {

    this.locationtype = 'location';
    this.locations = [];
    this.locationcount = [];
    this.locationname = [];
    const jobid = this.route.snapshot.paramMap.get('job_id');


    this.db.list('getlocationbycall', { jobid }, (response): void => {
      const data = response[0];
      for (const j in data) {
        if (data[j]) {
          this.locationname.push(data[j].location);
        }


      }


      this.locations;
      const datacount = response[1];
      for (const i in datacount) {
        if (datacount[i]) {
          this.locationcount.push(datacount[i].count);
        }
      }

      for (const t in datacount) {
        if (datacount[t]) {
          this.locations.push(this.locationname[t]); // + '(' + this.locationcount[t] + ')');
        }
      }
      // }

    });
  }

  filterdrbytab(mainprocess?: string, childprocess?: string, jobid?: string): void {


    this.isinterview = 9;
    if (childprocess === 'isinterview') {
      childprocess = 'all';
      this.isinterview = 1;
    }
    $('#activetaball').css('background-color', 'transparent');
    $('#activetabintersted').css('background-color', 'transparent');
    $('#activetabnotintrested').css('background-color', 'transparent');
    $('#activetabrejected').css('background-color', 'transparent');
    $('#activetabcallleter').css('background-color', 'transparent');
    $('#activetabscampaign').css('background-color', 'transparent');
    $('#activetabIcampaign').css('background-color', 'transparent');

    // this.jobitemselected = jobitem;
    if (mainprocess == null) {
      mainprocess = this.mainprocessnewvar;
    }
    if (childprocess == null) {
      childprocess = this.childprocessnewvar;
    }
    this.mainprocessnewvar = mainprocess;
    this.childprocessnewvar = childprocess;

    if (jobid != null) {
      this.selectedjob = jobid;
    }
    this.process = childprocess;
    if (mainprocess === 'My Referrals') {
      this.mainprocess = 1;
      //            $('#1b .nav li').removeClass('active');
      //            $('#1b .nav li').eq(0).addClass('active');
    } else {
      //            $('#2b .nav li').removeClass('active');
      //            $('#2b .nav li').eq(0).addClass('active');
      this.mainprocess = 0;
    }
    this.filterbyJob();
  }


  filterbyJob(): void {

    this.loadCandidate();
    this.loadGraphs();
    this.ShowCandidates = true;
  }

  activetab(childprocess: string): void {
    if (childprocess == 'allcalled') {
      this.currentPage = 'Export All Candidate';
      $('#activetaball').css('background-color', '#a64eed');
    } else if (childprocess == 'calledinterested') {
      this.currentPage = 'Export Interested Candidate';
      $('#activetabintersted').css('background-color', '#a64eed');
    } else if (childprocess == 'callednotinterested') {
      this.currentPage = 'Export Not Interested Candidate';
      $('#activetabnotintrested').css('background-color', '#a64eed');
    } else if (childprocess == 'rejected') {
      this.currentPage = 'Export Rejected Candidate';
      $('#activetabrejected').css('background-color', '#a64eed');
    } else if (childprocess == 'callothers') {
      this.currentPage = 'Export Call Later Candidate';
      $('#activetabcallleter').css('background-color', '#a64eed');
    } else if (childprocess == 'StopCampaign') {
      this.currentPage = 'Export Completed Campaign Candidate';

      $('#activetabscampaign').css('background-color', '#a64eed');
    } else if (childprocess == 'InCampaign') {
      this.currentPage = 'Export In Campaign Candidate';
      $('#activetabIcampaign').css('background-color', '#a64eed');
    }
  }

  onGridReady(params: { api: any; columnApi: any; }) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;


  }

  OnDownlaoddata(event): any {
    switch (event) {
      case 'downloadsDatewise':
        $('#exportexcel').appendTo('body').modal('show');
        return this.getTracker();
      case 'downloadsFiltered':
        $('#exportexcelfiltered').appendTo('body').modal('show');
        return this.getTracker();
      case 'downloadSelected':
        $('#exportexcelpagewise').appendTo('body').modal('show');
        return this.getTracker();
    }


  }

  getTracker(): void {



    this.db.list('tracker/', null, ((response): void => {


      try {
        this.trackerlist = response;
      } catch (e) {

      }

    }));
  };


  getTrackerData(): void {
    this.trackerno;
    this.db.show('tracker/', this.trackerno, ((response): void => {
      this.trackerdata = response;
      this.Edit(this.trackerdata);
    }));
  }

  Edit(row): void {

    this.trackerselected = [];
    this.isEdit = true;
    this.trackermessage = row;
    const tracker_data = JSON.parse(row.tracker_data);
    for (const k in tracker_data) {
      if (tracker_data[k]) {
        for (const j in this.trackermaster) {
          if (tracker_data[k] == this.trackermaster[j].id) {
            this.trackerselected.push(this.trackermaster[j]);
            break;
          }
        }
      }
    }
  }

  Downloadtrackerdata(): void {
    this.Getdownloadcandidatedata = [];
    for (var i = 0; i < this.db.idscheckbox?.length; i++) {
      let id = this.datas.map(e => e.id).indexOf(this.db.idscheckbox[i]);
      this.Getdownloadcandidatedata.push(this.datas[id]);
    }
    this.Downloaddata();

  }

  DownloadFilterdData(): void {
    this.SearchfilterCalls.endindex = this.totalcandidateCount;
    this.SearchfilterCalls.startindex = 0;

    this.db.list('call/callcandidatesdetailhistory/', this.SearchfilterCalls, ((response: any[]): void => {
      this.Getdownloadcandidatedata = response;
      this.Downloaddata();
    }));
  }

  Downloaddata(): void {
    let titlelist = [];
    let list = [];
    this.trackerselected.forEach((valuet: any, keyt: any) => {
      // console.log(this.trackerselected[keyt]['db_name']);
      titlelist.push(this.trackerselected[keyt]['display_name']);
    });

    list.push(titlelist);
    this.Getdownloadcandidatedata.forEach((cvalue: any, ckey: any) => {
      let titlelist = [];
      this.trackerselected.forEach((tvalue: any, tkey: any) => {
        let key = this.trackerselected[tkey]['db_name'];
        let value = this.trackerselected[tkey]['display_name'];

        if (cvalue.hasOwnProperty(key)) {
          titlelist.push(cvalue[key]);
        } else {
          titlelist.push("");
        }
      });
      list.push(titlelist);

    });
    $('#exportexcelpagewise').appendTo('body').modal('hide');

    this.excelService.exportAsExcelFile(list, 'callreport');

  }

  exportdatajobcandidate(): void {

    let trackersid = this.trackerno;
    let jobstr = this.route.snapshot.paramMap.get('job_id');
    if (trackersid == "" || trackersid == undefined) {
      return this.db.addmessageandremove('Please select a Tracker');
    }
    let trstr = trackersid;


    this.db.list('downloadcandidatedata/', { jobid: jobstr, trackerid: trstr, startdate: this.db.toYYMMDD(this.item.start_date_temp), enddate: this.db.toYYMMDD(this.item.end_date_temp) }, ((response): void => {
      this.excelService.exportAsExcelFile(response, 'callreport');

      $('#exportexcel').modal('hide');

    })
    );
  }



  // public onRowClicked(e: { event: { target: { getAttribute: (arg0: string) => any; }; }; data: any; }) {
  //   if (e.event.target !== undefined) {
  //     const data = e.data;
  //     const actionType = e.event.target.getAttribute('data-action-type');


  //     switch (actionType) {
  //       case 'conversation':
  //         return this.conversation(data);
  //       case 'openpopup':
  //         return this.openpopup(data.call_id);
  //       case 'activity':
  //       //   return this.activityclick(data);
  //       case 'comment':
  //         return this.onCommentClick(data);
  //       case 'notes':
  //         return this.onNotesClick(data);
  //       case 'candidateshow':
  //         return this.oncandidateshowClick(data);
  //       case 'chat':
  //         return this.chat(data);

  //     }
  //   }
  // }
  openpopup(id: string): void {
    window.open(this.db.http_or_https + '://api.passivereferral.com/recording/?id='
      + id, '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=300,left=500,width=400,height=150');
  }


  public oncandidateshowClick(data: any) {


    data.tempdate = new Date().getMilliseconds();
    this.currentData = {};
    this.currentData = data;
  }
  public onNotesClick(data: any) {

    this.candidate_id = data.id;
  }



  conversation(entity: { call_id: string; }): void {
    this.callconversation = entity;
    $('#player').html('<iframe src="' + this.db.http_or_https + '://api.passivereferral.com/recording/?id=' + entity.call_id +
      '" width="100%" height="100" style="border:none; width:300px;height:100px"></iframe>');

    this.conversationsobj = [];
    this.db.show('calldetail/', entity.call_id, ((response): void => {

      this.conversations = JSON.parse(response.conversation);
      for (const con in this.conversations) {
        if (true) {
          if (this.conversations.audio || true) {
            this.convidsplited = con.substring(con.lastIndexOf('_'));
            this.conversationsobj.push({
              key: con.split('__')[0],
              value: this.conversations[con].text,
              start_speaking: this.conversations[con].start_speaking,
              end_speaking: this.conversations[con].end_speaking,
              start_transcribe: this.conversations[con].start_transcribe,
              end_transcribe: this.conversations[con].end_transcribe,
              audio: 'https://api.passivereferral.com/recording/' + response.local_call_id + this.convidsplited + '.wav',
              text: this.conversations[con],

            });
          } else {
            this.conversationsobj.push({ key: con.split('__')[0], text: this.conversations[con] });
          }
        }
      }
      $('#conversation').modal('show');
    })
    );

  } chat(entity: { call_id: string; }): void {

    this.chatconversation = entity;
    //          /  this.conversations = JSON.parse(entity.conversation);
    // $('#conversation').modal('show');
    $('#player').html('<iframe src="' + this.db.http_or_https + '://api.passivereferral.com/recording/?id=' + entity.call_id +
      '" width="100%" height="100" style="border:none; width:300px;height:100px"></iframe>');

    this.chatobj = [];
    // this.callconversation=entity;
    this.db.show('chatdetail/', entity.call_id, ((response): void => {

      if (response != undefined) {
        this.chatdata = response.video_link;
        const chats = (response.conversation);
        this.breakchat = chats.split(';');
        $('#chat').modal('show');

        // for (const con in this.chats) {
      } else {
        this.db.addmessageandremove('No Chat Conversation');
      }


      //   if (true) {
      //     //if (this.conversations['audio']) {
      //     this.conversationsobj.push({
      //       //key: Object.keys(con).toString(),

      //       key: con.split('__')[0],
      //       value: this.conversations[con].text,
      //       start_speaking: this.conversations[con].start_speaking,
      //       end_speaking: this.conversations[con].end_speaking,
      //       start_transcribe: this.conversations[con].start_transcribe,
      //       end_transcribe: this.conversations[con].end_transcribe,
      //       audio: this.conversations[con].audio,
      //       text: this.conversations[con].text,
      //       // start_speaking: this.conversations[con].start_speaking,
      //       //            start_speaking: this.conversations[con].start_speaking,

      //     })
      //     // } else if (this.conversations[con].text != null) {
      //     //   this.chatobj.push({ key: con.split('__')[0], text: this.conversations[con].text })
      //     //  } else {
      //     // this.conversationsobj.push({ key: con.split('__')[0], text: this.conversations[con].text })
      //     //this.chatobj.push({ key: con.split('__')[0], text: this.conversations[con] })
      //     // }
      //   }
      // }
    })
    );

  } showintegration() {
    this.db.addmessageandremove('integration in progress');
  }
  openwithnewtab() {
    window.open(this.chatdata, '_blank');

  }

  filterdrbythistab(mainprocess?: any, childprocess?: any, jobitem?: any) {
    // const url = this.router.serializeUrl(
    //   this.router.createUrlTree(['call-view', { job_id: jobitem, callstatus: childprocess, candidate_name: this.searchcandidate, SearchstartDatefilter:this.db.toYYMMDD(this.item.start_date_temp),EndDatefilter:this.db.toYYMMDD(this.item.end_date_temp)}])
    //   );

    this.filterdrbytab(mainprocess, childprocess, jobitem);
    this.router.navigate(['call-view', { job_id: jobitem, callstatus: childprocess, candidate_name: this.searchcandidate, SearchstartDatefilter: this.db.toYYMMDD(this.item.start_date_temp), EndDatefilter: this.db.toYYMMDD(this.item.end_date_temp) }]);
    // job_id: jobitem, callstatus: childprocess, candidate_name: this.searchcandidate, SearchstartDatefilter: this.db.toYYMMDD(this.item.start_date_temp), EndDatefilter: this.db.toYYMMDD(this.item.end_date_temp)
    // location.reload();

    // window.open(url);
  }

  loadCandidate = function () {

    //
    // const a=this.datfromprgrid();
    // this.noticp;
    this.expfrom;

    let SelectedJob = '';
    if (this.isfirstload !== 1) {
    } else {
      SelectedJob = this.selectedjob;
    }
    SelectedJob = this.selectedjob;

    this.globaljobid = SelectedJob;
    if (this.filterdropdown == undefined) {
      this.filterdropdown = null;
    }
    if (this.searchcandidatetext == undefined) {
      this.searchcandidatetext = null;
    }

    if (this.searchcandidate == undefined) {
      // const data = this.route.snapshot.paramMap.get('jobid');
      // var arr = data.split('&');
      // const candidate = arr[2];
      this.searchcandidate = this.route.snapshot.paramMap.get('candidate_name');
    }


    // if (this.callto == undefined) {
    //   // this.callto = 'alls';
    //   this.Tecnical = false;
    //   this.grammar = true;
    //   this.avgreting = undefined;
    //   this.tskill = undefined;
    //   this.sskill = undefined;
    //   this.pskill = undefined;
    // }
    // else if (this.callto == 'allPR1' || this.callto == 'allPR3' || this.callto == "allPR4" || this.callto == "allPR5") {
    //   // this.callto = 'allPR1';
    //   this.Tecnical = false;
    //   this.grammar = true;
    //   this.avgreting = undefined;
    //   this.tskill = undefined;
    //   this.sskill = undefined;
    //   this.pskill = undefined;
    // } else if (this.callto == 'allPR2') {
    //   this.Tecnical = true;
    //   this.grammar = false;
    //   this.gmrreting = undefined;
    // }


    // if (this.Tecnical == true) {
    //   this.Averages = true;
    // } else {
    //   this.Averages = false;
    // }
    if (this.location != undefined) {

      if (this.location.length > 0) {
        this.location = this.location.toString();
      } else {
        this.location = 'all';
      }
      this.location = this.location.toString();
    } else {
      this.location = 'all';
    }
    //  const datapgrid= this.datfromprgrid();
    //  alert(datapgrid);


    this.SearchfilterCalls = {
      process: this.process,
      mainprocess: this.mainprocessnewvar,
      noticp: this.noticp,
      Experiencefrom: this.expfrom,
      Average: this.avgreting,
      // startindex: this.startindex,
      grammar: this.gmrreting,
      thirdskill: this.tskill,
      secondskill: this.sskill,
      firstskill: this.pskill,
      Experienceto: this.expto,
      location: this.location,
      salaryto: this.salaryto,
      salaryfrom: this.salaryfrom,
      selectedjob: SelectedJob,
      startIndexNumber1: this.startIndexNumber,
      candidate: this.searchcandidate,
      calltype: this.callto,
      isinterview: this.isinterview,
      start_date: this.db.toYYMMDD(this.item.start_date_temp),
      end_date: this.db.toYYMMDD(this.item.end_date_temp),
      Education: this.education,
      relocatelocation: this.relocatelocation,
      jobOpportunity: this.jobOpportunity,
      nightshift: this.nightshift,
      isinternet: this.isinternet,
      Concentrixpremises: this.Concentrixpremises,
      issystem: this.issystem,
      Diplomaflanguage: this.Diplomaflanguage,
      Workedinpast: this.Workedinpast,
      // candidatestatus: this.candidatestatus,
      // StartIndex: this.startIndex,
      // EndIndex: this.endInded,
      // setpage: this.pageSize,
      PrInternalGrid_data: this.PrInternalGrid_data,
      candidatestatus: this.candidatestatus,
      endindex: this.EndIndexCandidateCallview,
      startindex: this.limitstartIndex
    };



    // startindex:0,endindex:20,pagelimit:20
    $('#conversation').on('hidden.bs.modal', function () {
      $('#player').html('');
    });

    //
    // const pggriddata=this.loaddata()
    //
    this.router.navigate(['call-view', { job_id: this.selectedjob, startindex: this.startindex, endindex: this.endIndex, callstatus: this.process, candidate_name: this.searchcandidate, SearchstartDatefilter: this.db.toYYMMDD(this.item.start_date_temp), EndDatefilter: this.db.toYYMMDD(this.item.end_date_temp) }]);

    // alert("startIndex " + evt.startIndex + ". endIndex." + evt.endIndex + "Call")
    // this.rowData = [this.rowHeight = 200];
    // startindex:this.startIndexNumber1
    // // console.log(Search);

    this.db.list('call/callcandidatesdetailhistory/', this.SearchfilterCalls, ((response: any[]): void => {

      // this.gridOptionsloadcandidatesInPopUp.columnDefs = this.columnDefs;
      debugger;
      this.jobcount = response[0];
      this.totalcandidateCount = response[0].totalcandidate;
      this.candidatedetails = response;
      this.rowData = response;
      this.datas = response;
      this.activetab(this.process);

      this.gridOptionsloadcandidatesInPopUp.exporterAllDataFn = function () {
        return this.candidatedetails;
      };
      this.candidateinpopup = response;

    })

    );
  };

  loadGraphs = function () {

    
    let SelectedJob = '';
    if (this.isfirstload !== 1) {
    } else {
      SelectedJob = this.selectedjob;
    }
    SelectedJob = this.selectedjob;

    this.globaljobid = SelectedJob;
    if (this.filterdropdown == undefined) {
      this.filterdropdown = null;
    }
    if (this.searchcandidatetext == undefined) {
      this.searchcandidatetext = '%%';
    }

    if (this.searchcandidate == undefined) {
      // const data = this.route.snapshot.paramMap.get('jobid');
      // var arr = data.split('&');
      // const candidate = arr[2];
      this.searchcandidate = this.route.snapshot.paramMap.get('candidate_name');
    }
    if (this.location != undefined) {

      if (this.location.length > 0) {
        this.location = this.location.toString();
      } else {
        this.location = 'all';
      }
      this.location = this.location.toString();
    } else {
      this.location = 'all';
    }
    //  const datapgrid= this.datfromprgrid();
    //  alert(datapgrid);


    const Search = {
      process: this.process,
      mainprocess: this.mainprocessnewvar,
      noticp: this.noticp,
      Experiencefrom: this.expfrom,
      Average: this.avgreting,
      // startindex: this.startindex,
      grammar: this.gmrreting,
      thirdskill: this.tskill,
      secondskill: this.sskill,
      firstskill: this.pskill,
      Experienceto: this.expto,
      location: this.location,
      salaryto: this.salaryto,
      salaryfrom: this.salaryfrom,
      selectedjob: SelectedJob,
      startIndexNumber1: this.startIndexNumber,
      candidate: this.searchcandidate,
      calltype: this.callto,
      isinterview: this.isinterview,
      start_date: this.db.toYYMMDD(this.item.start_date_temp),
      end_date: this.db.toYYMMDD(this.item.end_date_temp),
      Education: this.education,
      relocatelocation: this.relocatelocation,
      jobOpportunity: this.jobOpportunity,
      nightshift: this.nightshift,
      isinternet: this.isinternet,
      Concentrixpremises: this.Concentrixpremises,
      issystem: this.issystem,
      Diplomaflanguage: this.Diplomaflanguage,
      Workedinpast: this.Workedinpast,
      PrInternalGrid_data: this.PrInternalGrid_data,
      candidatestatus: this.candidatestatus,
      endindex: this.EndIndexCandidateCallview,
      startindex: this.limitstartIndex
    };
    $('#conversation').on('hidden.bs.modal', function () {
      $('#player').html('');
    });
    this.router.navigate(['call-view', { job_id: this.selectedjob, startindex: this.startindex, endindex: this.endIndex, callstatus: this.process, candidate_name: this.searchcandidate, SearchstartDatefilter: this.db.toYYMMDD(this.item.start_date_temp), EndDatefilter: this.db.toYYMMDD(this.item.end_date_temp) }]);
    this.db.list('call/callcandidatesdetailhistoryReport/', Search, ((response: any[]): void => {
      this.senddata = true;

      const CandidateRating = response['candidateRating'];
      const CallCompletedOrNot = response['callcompletedornot'];
      const CandidateStatus = response['candidatestatus'];

      var Rating0 = 0;
      var Rating1 = 0;
      var Rating2 = 0;
      var Rating3 = 0;
      var Rating4 = 0;
      var Rating5 = 0;
      for (var i = 0; i < CandidateRating?.length; i++) {
        Rating0 = Rating0 + CandidateRating[i].Rating0;
        Rating1 = Rating1 + CandidateRating[i].Rating1;
        Rating2 = Rating2 + CandidateRating[i].Rating2;
        Rating3 = Rating3 + CandidateRating[i].Rating3;
        Rating4 = Rating4 + CandidateRating[i].Rating4;
        Rating5 = Rating5 + CandidateRating[i].Rating5;
      }

      this.Rating = [
        { name: 0, value: Rating0, color: '#f6edfd' },
        { name: 1, value: Rating1, color: '#eddcfb' },
        { name: 2, value: Rating2, color: '#dbb8f8' },
        { name: 3, value: Rating3, color: '#ca95f4' },
        { name: 4, value: Rating4, color: '#b871f1' },
        { name: 5, value: Rating5, color: '#a64eed' },

      ];

      this.chartBarColors = ['#f6edfd', '#eddcfb', '#dbb8f8', '#ca95f4', '#b871f1', '#a64eed'];
      this.Datashow = ['Rating 1', 'Rating 2', 'Rating 3', 'Rating 4', 'Rating 5',];
      var Interested = 0;
      var NotIntersted = 0;
      var busy = 0;
      var CallLater = 0;
      var Congestion = 0;
      var failed = 0;
      var ringtimeout = 0;
      var nostatus = 0;
      for (var i = 0; i < CandidateStatus?.length; i++) {

        Interested = Interested + CandidateStatus[i].Interested;
        NotIntersted = NotIntersted + CandidateStatus[i].NotIntersted;
        busy = busy + CandidateStatus[i].busy;
        CallLater = CallLater + CandidateStatus[i].CallLater;
        Congestion = Congestion + CandidateStatus[i].Congestion;
        failed = failed + CandidateStatus[i].failed;
        ringtimeout = ringtimeout + CandidateStatus[i].ringtimeout;
        nostatus = nostatus + CandidateStatus[i].nostatus;

      }

      this.Bubbledata = [
        { Name: 'Interested', Count: Interested },
        { Name: 'Not Interested', Count: NotIntersted },
        { Name: 'Busy', Count: busy },
        { Name: 'Call Later', Count: CallLater },
        { Name: 'Congestion', Count: Congestion },
        { Name: 'Failed', Count: failed },
        { Name: 'No Status', Count: nostatus },
        { Name: 'Ring Timeout', Count: ringtimeout },
      ];

      var totalcandidate = 0;
      var completecall = 0;
      var notcompletecall = 0;
      for (var i = 0; i < CallCompletedOrNot?.length; i++) {

        notcompletecall = notcompletecall + CallCompletedOrNot[i].notcompletecall;
        completecall = completecall + CallCompletedOrNot[i].completecall;
        totalcandidate = totalcandidate + CallCompletedOrNot[i].totalcandidate;
      }
      this.allChartData = [
        { Name: 'Complete Call', Value: totalcandidate },
        { Name: 'Not Complete Call', Value: totalcandidate },
      ];

      this.chartData = [
        { Name: 'Complete Call', Value: completecall },
        { Name: 'Not Complete Call', Value: notcompletecall },
      ];
      const copybubble = {}
      const key = 'children';
      // copybubble[key] = this.Bubbledata;
      this.Bubble[key] = this.Bubbledata;
      this.chartColors = ["#a64eed", "#95ed4e"];
      this.Rating;
    })

    );
  };
  exportdat() {
    this.gridApi.exportDataAsCsv();
  }


  onSelectionChanged(event: { api: { getSelectedNodes: () => any[]; }; }) {

    this.selectednodes = event.api.getSelectedNodes();
    // this.allids = this.db.extractIDsData(event.api.getSelectedNodes());
    this.allids = this.db.ids;

    this.callids = this.db.extractCallId(event.api.getSelectedNodes());
    // this.db.setSelectedNodes(event.api.getSelectedNodes(), this.db.NodeType.internaldatabase);

  }
  applicationcallportname(): void {

    this.callportnameobj = [];
    this.db.list('getcallportname', {}, (response): void => {

      this.callportname = response;

      for (const con in this.callportname) {
        if (true) {
          // this.convidsplited = con.substring(con.lastIndexOf('_'));
          this.callportnameobj.push({
            key: con.split('__')[0],
            text: this.callportname[con],
          });

        }
      }

    });
  }

  submit_cv_to_panel_status(): void {

    // this.db.list('submit_cv_to_panel_status', {}, ((response): void => {

    //   this.cv_to_panel = { status: response };
    $('#submit_cv_to_panel_status').appendTo('body').modal('show');

    // }), ((response): void => {
    //   if (response.msg) {
    //     alert(response.msg);
    //   }
    // }));

  }





  extractDatas(getdata) {
    this.Getdownloadcandidatedata = [];
    for (var i = 0; i < this.db.idscheckbox?.length; i++) {
      let id = this.datas.map(e => e.id).indexOf(this.db.idscheckbox[i]);
      this.Getdownloadcandidatedata.push(this.datas[id]);
    }
    var ids = [];
    for (var i = 0; i < this.Getdownloadcandidatedata?.length; i++) {
      ids.push(this.Getdownloadcandidatedata[i][getdata]);
    }
    return ids;
  }

  sendCvToPanel(test: any): void {
    // if (!$('.validate').validate('#submit_cv_to_panel_status')) {
    //   //  $.fn.showMessage('Please fill values');
    //   return;
    // }





    const allrow = this.extractDatas('call_id');
    // const allrow = this.db.extractCallIDData(this.db.call_id, 'call_id');
    // const allrow = this.db.ids;

    if (allrow.length === 0) {

      this.db.showMessage('Please select candidates');
      return;
    }

    if (allrow.length === 0) {

      this.db.showMessage('Please select candidate to send to panel.');
    } else {

      this.cv_to_panel.allrow = allrow;

      this.db.store('sendtopanelcvemailcallscandidate', this.cv_to_panel, ((response) => {
        if (response.msg) {

          this.db.showMessage(response.msg);
        } else {

          for (const k in allrow) {
            if (allrow[k]) {
              this.ajid = allrow[k];

              this.commentstatus = {
                ajid: parseInt(allrow[k], 0),
                comment: this.cv_to_panel.comment,
                status: this.cv_to_panel.status,
              };

              this.db.addmessageandremove('Cv Submitted to panel.');
              $('#submit_cv_to_panel_status').modal('hide');

            }

          }
        }
      }), ((response): void => {

        this.db.showMessage('Try again.');
      })
      );
    }

  }
  submitcv(download: any): void {

    this.allids = this.db.idscheckbox;

    if (download) {
      this.downloadcv = false;
    } else {
      this.downloadcv = true;
    }
    this.db.list('tracker/', null, ((response): void => {


      try {
        this.trackerlist = response;
        if (this.downloadcv) {
          $('#downloadtracker').appendTo('body').modal('toggle');
        } else {
          $('#myModal').appendTo('body').modal('toggle');
        }
      } catch (e) {

      }

    }));
  }


  loadmyjoblist(): void {
    this.showmyjoblist = !this.showmyjoblist;
    this.db.list('allcandidatesmyjoblist/', {}, ((response): void => {
      this.gridmyjoblist.data = response;
    })
    );

  }

  downloadtracker(): void {


    this.download = true;


    if (this.db.idscheckbox > 0) {
      let totalrow = 0;
      if (this.showmyjoblist) {
        totalrow = this.gridApipopup.selection.getSelectedRows();
      } else {
        totalrow = this.gridmyjoblistApi.selection.getSelectedRows();
        this.sendtracker.trackerno = this.trackerno;
      }
      const allrow = this.db.SelectedWithComma(totalrow, 'ajid');
      this.sendtracker.atjids = allrow;
      if (this.download) {
        this.sendtracker.download = true;
      } else {
        this.sendtracker.download = false;
      }
      this.db.store('sendtracker', this.sendtracker, (r): void => {
        if (this.download) {
          this.db.showMessage('Your excel is ready.' +
            '<a href="http://api.passivereferral.com/trackers/' + r.excel + '">Click Here</a> to Download'
            , 'Excel Prepared');
        } else {
          this.db.addmessageandremove('tracker sent');
        }
      }, (r): void => {
        if (r.errormsg !== undefined) {
          this.db.addmessageandremove(r.errormsg);
        } else {
          this.db.addmessageandremove('Some error occured');
        }
      });
    } else {
      this.db.addmessageandremove('Please Select CV');
    }
  }


  sendinterviewlink(ss) {

    if (this.db.idscheckbox.length > 0) {
      // const allrow = this.db.extractCallIDData(this.db.call_id, 'call_id');
      const allrow = this.extractDatas('call_id');//this.db.extractCallIDData(this.db.ids, 'call_id');

      if (allrow.length === 0) {
        this.db.showMessage('Please select candidates');
        return;
      }

      const atjid = allrow.toString();
      this.sendtracker.call_id = atjid;

      this.db.store('sendinterviewcalls', this.sendtracker, ((r): void => {
      }));

    } else {
      this.db.showMessage('Please select candidates');

    }
  }
  sendtrackerdata(download: any): void {

    if (this.db.idscheckbox.length > 0) {
      // const allrow = this.db.extractCallIDData(this.db.call_id, 'call_id');
      const allrow = this.extractDatas('call_id'); //this.db.extractCallIDData(this.db.idscheckbox, 'call_id');

      if (allrow.length === 0) {
        this.db.showMessage('Please select candidates');
        return;
      }
      const atjid = allrow.toString();

      this.sendtrackermsg(download);
    } else {
      this.db.showMessage('Please select candidates');

    }
  }


  sendtrackermsg(download): void {

    if (download) {
      this.download = true;
    } else {
      this.download = false;

    }

    if (this.db.idscheckbox > 0) {
      let totalrow = 0;
      if (this.showmyjoblist) {
        totalrow = this.gridApipopup.selection.getSelectedRows();
      } else {
        totalrow = this.gridmyjoblistApi.selection.getSelectedRows();
      }
      const allrow = this.db.SelectedWithComma(totalrow, 'ajid');
      this.sendtracker.atjids = allrow;
      if (this.download) {
        this.sendtracker.download = true;
      } else {
        this.sendtracker.download = false;
      }
      this.db.store('sendtracker', this.sendtracker, ((response): void => {
        if (this.download) {
          const resumes = response.resumes;
          let resumehtml = '';
          if (resumes.length > 0) {
            resumehtml = '</br> <h3>Resume List</h3> <div class="list - group">';
            for (const k in resumes) {
              if (resumes[k]) {
                resumehtml += '<a target="_blank" class="list - group - item" '
                  + ' href="http://api.passivereferral.com/resumes/' + resumes[k].resume
                  + '" > ' + resumes[k].name + ' < /a>';
              }
            }
            resumehtml += '</div>';
          }
          this.db.showMessage('Your excel is ready.<a  href="http://api.passivereferral.com/trackers/'
            + response.excel + '" > Click Here < /a> to Download ' + resumehtml, 'Excel Prepared');
        } else {
          this.db.addmessageandremove('tracker sent');
        }
      })
      );
    } else {
      this.db.addmessageandremove('Please Select CV');
    }
  }


  // sendtrackermsg(download: any, atjid: any): void {

  //   if (download) {
  //     this.download = true;
  //   } else {
  //     this.download = false;
  //   }
  //   $('#uploadresumesss').modal('hide');
  //   if (this.db.ids.length > 0) {

  //     this.sendtracker.atjids = atjid;
  //     if (this.download) {
  //       this.sendtracker.download = true;
  //     } else {
  //       this.sendtracker.download = false;
  //     }
  //     this.db.store('sendtrackercalldetails', this.sendtracker, ((r): void => {
  //       if (this.download) {

  //         if (r.No_Cv != undefined) {
  //           this.nocv = r.No_Cv;
  //           this.resumesupload = r.data;
  //           this.withoutcv = [];
  //           for (const k in this.resumesupload) {
  //             this.withoutcv.push(this.resumesupload[k].addtojob_id);
  //           }
  //           $('#uploadresumesss').appendTo('body').modal('show');

  //         } else {
  //           const resumes = r.resumes;
  //           let resumehtml = '';
  //           if (resumes.length > 0) {
  //             resumehtml = '</br> <h3>Resume List</h3> <div class="list-group">';
  //             for (const k in resumes) {
  //               if (resumes[k]) {
  //                 resumehtml += '<a target="_blank" class="list-group-item" href="https://bilateralprodstorage.blob.core.windows.net/resume/' + resumes[k].resume + '">' + resumes[k].name + '</a>';
  //               }
  //             }
  //             resumehtml += '</div>';
  //           }
  //           this.db.showDialog(`Your excel is ready.<a href="https://bilateralprodstorage.blob.core.windows.net/temp-folder/`
  //             + r.excel
  //             + `">Click Here</a> to Download ` + resumehtml, 'Message');

  //         }
  //       } else {

  //         if (r.No_Cv != undefined) {
  //           this.nocv = r.No_Cv;
  //           this.resumesupload = r.data;
  //           this.withoutcv = [];
  //           for (const k in this.resumesupload) {
  //             this.withoutcv.push(this.resumesupload[k].addtojob_id);
  //           }
  //           $('#uploadresumesss').appendTo('body').modal('show');

  //         } else {
  //           this.db.addmessageandremove('tracker sent');
  //         }
  //       }

  //     }),
  //       ((r): void => {

  //         if (r.errormsg !== undefined) {
  //           this.db.addmessageandremove(r.errormsg);
  //         }
  //       }));
  //   } else {
  //     this.db.addmessageandremove('Please Select CV');
  //   }
  // }
  Skipcandidate(download: any): void {

    const selectedcandidate = this.db.extractIDsData(this.db.call_id, 'call_id');
    const withoutresume = this.withoutcv;
    const withresume = selectedcandidate.filter(function (obj: any) { return withoutresume.indexOf(obj) == -1; });


    if (withresume.length === 0) {
      this.db.showMessage('Can\'t Send Empty Email');
      return;
    }
    const atjid = withresume.toString();
    this.sendtrackermsg(download);
    // withresume
  }

  openmodal(modalname: any) {

    $(modalname).appendTo('body').modal('show');
  }

  visible() {

    if (this.isvisible === false) {
      this.isvisible = true;
      $('#filter').hide();
      // $('#filter').addClass('stickytop1');
      $('#filtertop').addClass('stickytop');

      $('#pull').removeClass('col-md-12');
      $('#filtertop').removeClass('stickytop1');

      $('#pull').addClass('col-md-9');
    }
    else {
      this.isvisible = false;
      $('#pull').addClass('col-md-12');

      $('#filtertop').removeClass('stickytop');

      $('#filtertop').addClass('stickytop1');



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
  Removemodal(modalname): void {

    $(modalname).modal('hide');

  }





  async showPdf() {
    let docDefinition = {
      content: [
        {
          text: 'PDF Generated with Image from external URL',
          fontSize: 20,
        },
        {
          image: await this.getBase64Image(),
        },
      ],
    };
    // pdfmake.createPdf(docDefinition).open();
  }
  getBase64Image() {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const svgElement: SVGGraphicsElement =
        document.querySelector('.apexcharts-svg');
      const imageBlobURL =
        'data:image/svg+xml;charset=utf-8,' +
        encodeURIComponent(svgElement.outerHTML);
      img.onload = () => {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
      };
      img.onerror = (error) => {
        reject(error);
      };
      img.src = imageBlobURL;
    });
  }




}

