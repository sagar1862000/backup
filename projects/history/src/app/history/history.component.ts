
import { Component, OnInit, Renderer2, TemplateRef, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DbService } from '../../../../../src/app/services/db.service'
import { UserService } from '../../../../../src/app/services/user.service'
import { MatDialog } from '@angular/material/dialog';
import { CallComponent } from 'projects/component/src/app/components/call/call.component';

declare var $: any;
declare var window:any;
export interface Message {
  source: string;
  content: string;
}
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  animations: [
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-180deg)' })),
      transition('rotated => default', animate('1500ms ease-out')),
      transition('default => rotated', animate('400ms ease-in'))
    ])
  ]
})
export class HistoryComponent implements OnInit {

  callicon: 'src/assets/img/historyicon/Call.svg';
  myFiles: string[] = [];
  userFormGroup: string;
  profiletoken: string;
  file: any;
  imageSource: any = '';
  isHiddenAdd_to_Job = false;
  isHidden_Call = false;
  isHidden_internal_refeference = false;
  isHidden_Mailer = false;
  isHidden_Add_candidate = false;
  isHidden_Refresh = false;
  isHidden_Bulk_operation = false;
  myResume: any;
  Showgrid = true;
  Showtable = false;
  state = 'default';
  candidateresume: [];
  title = 'app';
  private gridApi;
  fullname: any;
  store = { candidate_name: '', mobile_no: '', email: '', gender: '', source_id: 1 };
  currentData: any;
  historystatuses: any;
  recruiter = this.db.profile.id;
  showcomment: any;
  currentpage: any;
  allids = [];
  managers: any;
  data: any = {};
  datas: any = {};
  candidateshowdata: any;
  enablesearch = false;
  enddate = new Date();
  startdate = new Date();
  cvshareddate: any;
  // CandidateNote: { candidate_id: 0, not_scheduled: '' };
  contactibility: any;
  showprocesses: any;
  not_scheduled: any;
  date: {};
  quality: any;
  gridOptions: any;
  graduation: {};
  selected = 'option2';
  client: {};
  saveclientprocess: {};
  experience: {};
  historydata: {};
  comment: {};
  cvslists: any;
  item: any = { end_date_temp: new Date() };
  curDate = new Date();
  candidate_id: any;
  candidatedetails: any;
  searchcandidatetext: any;
  clientdetails: any[];
  clientids: {};
  showprocess: { process: any };
  processes: any;
  genders = [];
  addresses = [];
  address: {};
  candidate_name: any;
  candidateemail: any;
  candidatePhone: any;
  candidateskills: any;
  candidatefilenname: any;
  candidateid: any;
  resumeDetails: boolean;
  candidateupdateid: string;
  candidategender: any;
  showexcelgrid = false;
  shownormalgrid = false;
  showlinkdingrid = false;
  paginationPageSize: number;
  disabled: any;
  limitstartIndex: any = 0;
  limitendIndex: any = 20;
  trackerid: number = 0
  paginationNumberFormatter: (params: any) => string;
  formModal: any;
  public gridColumnApi;

  public autoGroupColumnDef;
  public defaultColDef;
  public rowSelection;
  public rowGroupPanelShow;
  public pivotPanelShow;
  public getRowHeight;
  public bindrowdata;


  DataDefinitions = [
    // { headerName: 'candidate Name', field: 'candidate_name', iconname: "resume", action: 'icon', ignore: "yes", hide: "true", size: "col-md-3", font_weight: "font-weight: bold;", show: 'yes', tag: "h5", margingbootstrap: "mt-1" },
    { headerName: 'Checkbox', field: 'candidate_id', type: 'checkbox', print: 'heading' },
    { headerName: 'candidate Name', field: 'candidate_name', type: 'text', style: 'font-weight: bold; font-size:15px;', class: 'mt-1', tag: 'span', print: 'headingleft', size: 'col-md-3', showxl: 'yes', show: 'yes', click: 'yes' },
    { headerName: 'Contact number', field: 'mobile_no', type: 'texticon', iconname: 'number.svg', tag: 'span', print: 'bodyleft', size: 'col-md-2', showxl: 'yes', show: 'yes' },
    { headerName: 'Email', field: 'email', type: 'texticon', iconname: 'Email.svg', tag: 'span', show: 'yes', print: 'bodyleft', size: 'col-md-4', showxl: 'yes', },
    { headerName: 'Current Salary', field: 'currentSalary', type: 'texticon', iconname: 'Salary.svg', tag: 'span', show: 'yes', print: 'bodyleft', size: 'col-md-3', showxl: 'yes' },
    { headerName: 'currentOrganization', field: 'currentOrganization', type: 'texticon', iconname: 'organization.svg', size: 'col-md-12', show: 'yes', print: 'bodyright', showxl: 'yes' },
    { headerName: 'ovarall Experiance', field: 'ovarallExperiance', type: 'texticon', iconname: 'experience.svg', size: 'col-md-2', tag: 'span', show: 'yes', print: 'bodyleft', showxl: 'yes' },
    { headerName: 'candidateProfile', field: 'candidate_name', type: 'iconimagesmall', iconname: 'Resume.svg', style: 'font-weight: bold; font-size:15px;', class: 'mt-1', tag: 'span', show: 'yes', print: 'headingleft', size: 'col-md-3' },
    { headerName: 'Detailed Report', field: 'id', action: 'button', fielddata: 'headerName', iconname: 'Detailed Report', tag: 'button' },
  ];

  columnDefsexcel = [
    {
      headerCheckboxSelection: true, checkboxSelection: true,
      headerName: 'Parshed Date',
      width: 150, field: 'updated_at', sortable: true, filter: true
    },
    {
      headerName: 'Candidate Name', width: 140, field: 'candidate_name',
      sortable: true, filter: true,
      filterParams: { newRowsAction: 'keep' },
      cellRenderer(param) {
        return `<button type='button' data-action-type='candidateshow' data-toggle="modal" class='btn  btn-sm'>
          ` + param.value + `
    </button>
  `;
      }
    },
    {
      headerName: 'Mobile No', width: 140, field: 'mobile_no', sortable: true, filter: true,
      filterParams: { newRowsAction: 'keep' },
      cellRenderer(param) {
        return `<span help='` + param.value + `'  class='text'>
      ` + param.value + `
  </span>
`;
      }
    },
    {
      headerName: 'Email', width: 120, field: 'email', sortable: true, filter: true,
      filterParams: { newRowsAction: 'keep' },
      cellRenderer(param) {
        return `<span help='` + param.value + `'  class='text'>
    ` + param.value + `
</span>
`;
      }
    },
    {
      headerName: 'Status', width: 120, field: 'not_scheduled',
      sortable: true, filter: true,
      filterParams: { newRowsAction: 'keep' },
      cellRenderer(param) {
        return `<button type='button' help='` + param.value + `'  data-action-type='status' data-toggle="modal" class='btn  btn-sm'>
        ` + param.value + `
    </button>
  `;
      }
    },

    //   {
    //     headerName: 'Contactibility', width: 120, field: 'contactibility',
    //     sortable: true, filter: true,
    //     cellRenderer: function (param) {
    //       return `<button type='button'help='` + param.value + `'  data-action-type='notes' data-toggle="modal" class='btn  btn-sm'>
    //       ` + param.value + `
    //   </button>
    // `;
    //     }
    //   },

    {
      headerName: 'client', width: 120, field: 'client',
      filterParams: { newRowsAction: 'keep' },
      sortable: true, filter: true,
      cellRenderer(param) {
        return `<button type='button' help='` + param.value + `' data-action-type='client' data-toggle="modal" class='btn  btn-sm'>
        ` + param.value + `
    </button>
  `;
      }
    },
    {
      headerName: 'Process', width: 120, field: 'clientprocess',
      sortable: true, filter: true,
      filterParams: { newRowsAction: 'keep' },
      cellRenderer(param) {
        return `<button type='button' help='` + param.value + `'  data-action-type='ClientProcess' data-toggle="modal" class='btn  btn-sm'>
        ` + param.value + `
    </button>
  `;
      }
    },
    {
      headerName: 'Qualification', width: 120, field: 'graduation',
      sortable: true, filter: true,
      cellRenderer(param) {
        return `<button type='button' help='` + param.value + `'  data-action-type='Graduation' data-toggle="modal" class='btn  btn-sm'>
        ` + param.value + `
    </button>
  `;
      }
    },
    {
      headerName: 'Experience', width: 120, field: 'experience',
      sortable: true, filter: true,
      cellRenderer(param) {
        return `<button type='button'  data-action-type='Experience' data-toggle="modal" class='btn  btn-sm'>
        ` + param.value + `
    </button>
  `;
      }
    },
    {
      headerName: 'Comment', width: 140, field: 'comment',
      sortable: true, filter: true,
      cellRenderer(param) {
        const abc = param.value;
        return `<button type='button' help='` + param.value + `'  data-action-type='Comment' data-toggle="modal" class='btn  btn-sm'>
        ` + param.value + `
    </button>
  `;
      }
    },

    {
      headerName: 'Cv Shared date', width: 120, field: 'cvshareddate',
      sortable: true, filter: true,
    },
    { headerName: 'Lineup Date', width: 150, field: 'schedule_date', sortable: true, filter: true },
    {
      headerName: 'Last Withdrawn Salary', width: 120, field: 'currentSalary',
      sortable: true, filter: true,
      cellRenderer(param) {
        return `<button type='button' help='` + param.value + `'  data-action-type='changesalary' data-toggle="modal" class='btn  btn-sm'>
        ` + param.value + `
    </button>
  `;
      }
    },
  ];


  columnDefsmultiplecandidate = [

    {
      headerName: 'Candidate Name', width: 260, field: 'ex_name',
      sortable: true, filter: true,
      filterParams: { newRowsAction: 'keep' },
      cellRenderer(param) {
        return `<button type='button' data-action-type='multiplename' data-toggle="modal" class='btn  btn-sm'>
          ` + param.value + `
    </button>
  `;
      }
    },
    {
      headerName: 'Mobile No', width: 220, field: 'ex_phone', sortable: true, filter: true,
      filterParams: { newRowsAction: 'keep' },
      cellRenderer(param) {
        return `<button type='button' help='` + param.value + `' data-action-type='multiplephone' data-toggle="modal" class='btn  btn-sm'>
      ` + param.value + `
  </span>
`;
      }
    },
    {
      headerName: 'Email', width: 260, field: 'ex_email', sortable: true, filter: true,
      filterParams: { newRowsAction: 'keep' },
      cellRenderer(param) {
        return `<button type='button' help='` + param.value + `' data-action-type='multipleemail' data-toggle="modal" class='btn  btn-sm'>
    ` + param.value + `
</span>
`;
      }
    },
    {
      headerName: 'Key Skills', width: 290, field: 'ex_skills',
      sortable: true, filter: true,
      filterParams: { newRowsAction: 'keep' },
      cellRenderer(param) {
        return `<button type='button' help='` + param.value + `'  data-action-type='multipleskill' data-toggle="modal" class='btn  btn-sm'>
        ` + param.value + `
    </button>
  `;
      }
    },


    {
      headerName: 'View Resume', width: 220, field: 'resume_name',

      sortable: true, filter: true,
      template:
        `<button type="button" data-action-type="Openresume" class="btn btn-success btn-sm">
       view Resume
     </button>`
    }
  ];
  rowDataCandidate = [];
  rowDatalinkedin = [];
  rowData = [
  ];
  isinterview: any;
  historystatus: {
    'candidate_id': any;
    'not_scheduled': any; 'date': string; 'isinterview': any;
    'address': any; 'quality': any;
  };
  historystatuswithoutdate: {
    'candidate_id': any;
    'not_scheduled': any;
  };
  filedata: string | Blob;
  parsedata: any;
  pageSizee: any;
  countries: any;
  AddressSave: any;
  formGroup: any;
  event: any;
  filess: any;
  multiplecandidate: any;
  checkpage: string;
  trackerlist: any;
  constructor(public db: DbService, public USR: UserService, private router: Router, private renderer: Renderer2, private dialog: MatDialog) {

    this.defaultColDef = {
      editable: true,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: true,
      resizable: true,
      filter: true,
      flex: 1,
      minWidth: 100,
    };
    this.rowSelection = 'multiple';
    this.rowGroupPanelShow = 'always';
    this.pivotPanelShow = 'always';
    this.paginationPageSize = 20;
    this.paginationNumberFormatter = function (params) {
      return '[' + params.value.toLocaleString() + ']';
    };
  }
  viewresumee: [];
  ngOnInit() {

    this.startdate.setDate(this.enddate.getDate() - 3);


    this.db.checkLoginOrNot();

    this.checkpage = 'history';
    if (this.checkpage !== localStorage['page_name']) {
      localStorage.setItem('page', '1');
    }
    this.loadgender();
    // this.ShowgridNormal();
    this.LoadHistory();
    this.settracker();
    // this.filterhistory();
    // this.loadalert();
    // this.reloadpage();


  }

  settracker(): void {
    this.db.list('tracker/tracker/', null, (response) => {
      try {
        this.trackerlist = response;
      } catch (e) {
      }
    });
  }

  DownloadExcelFormate(id): void {
    this.db.post('history/download-excel-format/', { trackerno: id }, (response) => {
      response
      alert(response)
    })
  }
  onPageSizeChanged() {

    const value = this.pageSizee; // document.getElementById('page-size').value;
    this.gridApi.paginationSetPageSize(Number(value));
  }

  // ShowgridExcle(): void {

  //   this.showexcelgrid = true;
  //   this.shownormalgrid = false;
  //   this.showlinkdingrid = false;

  // }
  // ShowgridNormal(): void {

  //   this.showexcelgrid = false;
  //   this.shownormalgrid = true;
  //   this.showlinkdingrid = false;

  // }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  iscomputerMenu() {
    if ($(window).width() < 991) {
      return false;
    }
    return true;
  }

  addcandidate() {
    $('#addcandidate').appendTo('body').modal('show');
  }

  Uploadresume() {
    $('#resumeupload').modal('show');

  }

  Uploadmultipleresumee() {
    $('#Uploadmultipleresumee').modal('show');

  }
  opennaukarimodel() {
    $('#opennaukarimodel').appendTo('body').modal('.show');

  }
  uploadresume(files: FileList) {

    const fileToUpload: any[] = [];
    fileToUpload.push({ filekey: 'file', file: files.item(0) });
    this.db.storeupload('uploadresumee/', { file: files }, (response) => {
      this.viewresumee = response.Filename;


      // // console.log(this.viewresumee);
      $('#uploadresume').modal('show');
      //
      // $scope.cvslists = response.data;
      this.db.showNotification('Resume Uploaded', this.viewresumee);
      // $('#uploadresume').modal('hide');
    }, (response) => {
      this.viewresumee = response.Filename;
      this.db.showNotification('uploaded'); $('#uploadresume').modal('show');
    }, null, fileToUpload);
  }
  //   fileEvent(e){
  //     this.filedata = e.target.files[0];
  // }

  //   onSubmit(f: NgForm) {
  //
  //     var myFormData = new FormData();
  //     const headers = new HttpHeaders();
  //   headers.append('Content-Type', 'multipart/form-data');
  //   headers.append('Accept', 'application/json');
  //   myFormData.append('image', this.filedata);
  // this.db.list('uploadresumee', myFormData,).subscribe(data => {
  //   // console.log(data);
  // });

  // }

  onBtFirst() {
    this.gridApi.paginationGoToFirstPage();
  }

  onBtLast() {
    // // console.log("here");
    this.gridApi.paginationGoToLastPage();
  }
  onBtNext() {
    this.gridApi.paginationGoToNextPage();
  }

  onBtPrevious() {
    this.gridApi.paginationGoToPreviousPage();
  }

  hidedownloadexcel() {
    $('#downloadexcel').modal('hide');
  }

  uploadnaukriexcel(files: FileList) {

    const fileToUpload: any[] = [];
    fileToUpload.push({ filekey: 'file', file: files.item(0) });
    this.db.storeupload('uploadnaukriexcelbestseller/', { file: files }, (re) => {

      // // console.log('type', files.type);

      $('#uploadexcel').modal('hide');
      $('#showcvs').modal('show');
      this.cvslists = re;

      // $scope.cvslists = response.data;
      this.db.showNotification('Excel Uploaded');
      // $('#uploadresume').modal('hide');
    }, (re) => {
      this.db.showNotification('uploaded'); $('#uploadexcel').modal('hide');
    }, null, fileToUpload);
  }
  opennaukrimodel() {

    $('#uploadnaukriexcel').appendTo('body').modal('show');
  }
  openhistorymodel() {
    $('#uploadhistoryexcel').appendTo('body').modal('show');
  }
  openhistorydbmodel() {
    $('#uploaddbexcel').appendTo('body').modal('show');
  }


  uploadhistoryexcel(files: FileList) {

    const fileToUpload: any[] = [];
    fileToUpload.push({ filekey: 'file', file: files.item(0) });
    this.db.storeupload('uploadhistoryexcel/', { file: files }, (re) => {
      this.LoadHistory();
      $('#uploadhistoryexcel').modal('hide');
      $('#showcvs').modal('show');
      this.cvslists = re;

      // $scope.cvslists = response.data;
      this.db.showNotification('Excel Uploaded', this.cvslists);
      // $('#uploadresume').modal('hide');
    }, (re) => {
      this.db.showNotification('uploaded'); $('#uploadexcel').modal('hide');
    }, null, fileToUpload);
  }

  uploadSelfexcel(files: FileList) {

    const fileToUpload: any[] = [];
    fileToUpload.push({ filekey: 'file', file: files.item(0) });
    this.db.storeupload('candidate/Excel-candidate/', { file: files, trackerno: this.trackerid, source_id: '2' }, (re) => {

      this.LoadHistory();
      $('#uploadSelfexcel').modal('hide');
      $('#showcvs').modal('show');
      this.cvslists = re;

      // $scope.cvslists = response.data;
      this.db.showNotification(re.msg, this.cvslists);
      // $('#uploadresume').modal('hide');
    }, (re) => {

      this.db.showNotification(re.msg);
      $('#uploadexcel').modal('hide');
    }, null, fileToUpload);
  }
  uploaddbexcel(files: FileList) {

    const fileToUpload: any[] = [];
    fileToUpload.push({ filekey: 'file', file: files.item(0) });
    this.db.storeupload('uploadhistoryexcelfromdb/', { file: files }, (re) => {

      $('#uploaddbexcel').modal('hide');
      $('#showcvs').modal('show');
      this.cvslists = re;

      // $scope.cvslists = response.data;
      this.db.showNotification('Excel Uploaded');
      // $('#uploadresume').modal('hide');
    }, (re) => {
      this.db.showNotification('uploaded'); $('#uploadexcel').modal('hide');
    }, null, fileToUpload);
  }

  // loadclientaddress(): void {
  //
  //   this.db.list('loadlocation/', null, ((response): void => {
  //     this.addresses = response;
  //   }));
  // }


  // AddressSave(): void {
  //
  //   this.currentpage = this.gridApi.paginationGetCurrentPage();

  //   const historystatus = {
  //     'candidate_id': this.candidate_id,
  //     'address': this.address,
  //     //'client': this.client
  //   };
  //   this.db.store('updatehistorystatus/', historystatus, ((response): void => {
  //     $('#address').modal('hide')
  //     this.LoadHistory();

  //     this.db.addmessageandremove('Added Successfully');

  //     //this.message = {};
  //     //this.CandidateNote = { candidate_id: 0 };
  //     //this.GetNotes();

  //   }));

  // };
  loadgender(): void {
    this.db.list('master/gender/', {
      // gi: 'rolecreating'
    }, ((response): void => {
      this.genders = response;
    }));
  }
  //  reloadpage(): void {
  //
  //    this.currentpage = this.gridApi.paginationGetCurrentPage();
  //   if (this.gridApi) {
  //     //this.gridApi = params.api;
  //     this.gridApi.paginationGoToPage(this.currentpage);
  //   }
  // }
  reloadpage(currentpage): void {
    //

    setTimeout(() => {
      // this.LoadHistory();
      if (this.gridApi) {
        // this.gridApi = params.api;
        this.gridApi.paginationGoToPage(currentpage);

      }
    }, 100);
  }

  clientprocess(clientid): void {

    this.clientids = { id: clientid };
    this.db.list('getprocess/', this.clientids, ((response): void => {

      this.showprocess = response;

      for (const j in this.showprocess) {

        this.showprocesses = this.showprocess[j];
      }
      if (this.showprocesses.process != null) {
        const showprocessstr = this.showprocesses.process.toString().split(',');

        const process = [];
        //
        for (const i in showprocessstr) {
          if (showprocessstr[i]) {
            process.push(showprocessstr[i]);
          }
        }

        this.processes = process;
      }
      else {
        this.processes = null;
      }
      this.CandidateClientSave(clientid);
    }));
  }
  purposechange(): void {
    $('#business').show();
    $('#cvsharedid').hide();


  }
  cvshared(): void {
    $('#cvsharedid').show();
    $('#business').hide();

  }

  loadalert(): void {

    const allrow = this.db.ids;
    if (allrow.length === 0) {
      this.db.showMessage('Please select candidates');
      return;
    }
  }

  resethistorysearch(): void {
    this.startdate = undefined;
    this.enddate = undefined;
    this.searchcandidatetext = '';
    this.limitstartIndex = 20;
    this.limitendIndex = this.limitendIndex;

    this.LoadHistory();
  }


  LoadHistorywithlimit() {
    this.limitstartIndex = 0;
    this.limitendIndex = this.limitendIndex;

    this.LoadHistory();
  }
  LoadHistory(): void {

    if (this.enablesearch === false) {

      this.rowData = [];

      this.data = {};
      this.data = {
        recruiter: this.recruiter,
        start_date: this.db.toYYMMDDTT(this.startdate),
        end_date: this.db.toYYMMDDTT(this.enddate),
        key: this.searchcandidatetext,
        startindex: this.limitstartIndex,
        endindex: this.limitendIndex
      };



      // alert(JSON.stringify(this.data))

      this.db.list('history/', this.data, ((response): void => {
        $('#searchpopup').appendTo('body').modal('hide');
        this.rowData = response;
        this.candidatedetails = response;

        this.datas = response;


        this.historydata = response;
        this.gridOptions = response;



        this.reloadpage(this.currentpage);



      }));
    } else {
      this.rowData = this.rowData;
    }

    this.USR.loadmyteam();
    this.db.list('department/list-client/', null, (response): void => {
      this.clientdetails = response;
      // // console.log(response);

    });
    // this.db.list('loadlocation/', null, ((response): void => {
    //   this.addresses = response;
    // }));
  }

  filterhistory() {

    if (this.searchcandidatetext.length !== 0 || this.searchcandidatetext.length !== undefined) {
      const main = [];

      for (const i in this.candidatedetails) {
        for (const j in this.candidatedetails[i]) {
          if (this.candidatedetails[i][j] != null && (this.candidatedetails[i][j].toString()).
            indexOf((this.searchcandidatetext)) === 0) {
            main.push(this.candidatedetails[i]);
            break;
          }

        }
      }
      if (this.searchcandidatetext === '') {
        this.rowData = main;
        this.enablesearch = false;
      } else {
        this.rowData = main;
        this.enablesearch = true;
      }
    } else {
      this.rowData = this.candidatedetails;
    }
  }


  onRowClicked(e) {

    if (e.event.target !== undefined) {
      const data = e.data;
      const actionType = e.event.target.getAttribute('data-action-type');


      switch (actionType) {

        case 'notes':
          return this.onNotesClick(data);
        case 'candidateshow':
          return this.oncandidateshowClick(data);
        case 'status':
          return this.onStatusClick(data);
        case 'client':
          return this.onclientClick(data);
        case 'Graduation':
          return this.onGraduationClick(data);
        case 'Experience':
          return this.onExperienceClick(data);
        case 'Comment':
          return this.onCommentClick(data);
        case 'ClientProcess':
          return this.onClientProcess(data);
        case 'address':
          return this.onClickAddress(data);
        case 'changesalary':
          return this.onChangeSalary(data);
        case 'Openresume':
          return this.onOpenresumeClick(data);
        // case 'multipleemail':
        //   return this.onmultipleemailClick(data);
        // case 'multiplephone':
        //   return this.onmultiplephoneClick(data);
        // case 'multipleskill':
        //   return this.onmultipleskillClick(data);
      }
    }
  }

  public onOpenresumeClick(data: any) {

    $('#Openresume').modal('show');
    this.candidate_id = data.id;
    this.candidateresume = data.resume_name;

    $('#resumeview').attr('src',
      'file:///home/passivereferral/passivereferral_projects/laravalprapi/python/recommandation/a/6_53_5b7df76acba3f6e922efc3b37cdbcc59.pdf');
    // }

  }
  // public onmultipleemailClick(data: any) {
  //   $('#multipleemail').modal('show')
  //   this.candidate_id = data.id;
  // }
  // public onmultiplephoneClick(data: any) {
  //   $('#multiplephone').modal('show')
  //   this.candidate_id = data.id;
  // }
  // public onmultipleskillClick(data: any) {
  //   $('#multipleskill').modal('show')
  //   this.candidate_id = data.id;
  // }
  public onNotesClick(data: any) {
    $('#notesdetail1').modal('show');
    this.candidate_id = data.id;
  }
  public onChangeSalary(data: any) {
    $('#changesalary').modal('show');
    this.candidate_id = data.id;
  }
  public onStatusClick(data: any) {
    $('#notesdetail2').modal('show');
    this.candidate_id = data.id;
  }

  public onClickAddress(data: any) {
    $('#address').modal('show');
    this.candidate_id = data.id;
  }

  public onclientClick(data: any) {
    $('#client1').modal('show');
    this.candidate_id = data.id;
  }
  public onGraduationClick(data: any) {
    $('#Graduation').modal('show');
    this.candidate_id = data.id;
  }

  public onExperienceClick(data: any) {
    $('#Experience').modal('show');
    this.candidate_id = data.id;
  }
  public onCommentClick(data: any) {
    $('#Comment').modal('show');
    this.candidate_id = data.id;
    this.getcomment(this.candidate_id);
  }
  public onClientProcess(data: any) {
    $('#clientprocess').modal('show');
    this.candidate_id = data.id;
  }
  getcomment(candidate_id): void {

    const candidateids = {
      candidateid: candidate_id,
    };
    this.db.list('getcomment', candidateids, ((response): void => {

      this.showcomment = response;
    })
    );
  }

  CandidateNotesave(): void {

    this.currentpage = this.gridApi.paginationGetCurrentPage();
    const historystatus = {
      candidate_id: this.candidate_id,
      contactibility: this.contactibility
    };
    this.db.store('updatehistorystatus/', historystatus, ((response): void => {

      $('#notesdetail1').modal('hide');
      this.gridApi.paginationGoToPage(this.currentpage);
      this.LoadHistory();
      this.db.addmessageandremove('Added Successfully');



    }));

  }


  CandidateHistoryStatus(): void {

    this.currentpage = this.gridApi.paginationGetCurrentPage();
    if (this.date != undefined && this.date != null && this.not_scheduled === 'Scheduled - Interview Aligned') {
      this.isinterview = 1;
      this.historystatus = {
        candidate_id: this.candidate_id,
        not_scheduled: this.not_scheduled,
        date: this.db.toYYMMDDTT(this.date),
        address: this.address,
        isinterview: this.isinterview,
        quality: this.quality
      };
      this.db.store('updatehistorystatus/', this.historystatus, ((response): void => {
        $('#notesdetail2').modal('hide');
        $('#business').hide();

        this.LoadHistory();

        this.db.addmessageandremove('Added Successfully');



      }));
    } else if (this.cvshareddate != undefined && this.not_scheduled === 'CV Shared') {

      this.historystatuses = {
        candidate_id: this.candidate_id,
        cvshareddate: this.db.toYYMMDDTT(this.cvshareddate),
        not_scheduled: this.not_scheduled,

      };
      this.db.store('updatehistorystatus/', this.historystatuses, ((response): void => {
        $('#notesdetail2').modal('hide');
        $('#cvsharedid').hide();

        this.LoadHistory();

        this.db.addmessageandremove('Added Successfully');
      }));
    } else {
      this.isinterview = 0;
      this.historystatuswithoutdate = {
        candidate_id: this.candidate_id,
        not_scheduled: this.not_scheduled,

      };

      this.db.store('updatehistorystatus/', this.historystatuswithoutdate, ((response): void => {
        $('#notesdetail2').modal('hide');
        $('#business').hide();
        this.LoadHistory();

        this.db.addmessageandremove('Added Successfully');



      }));
    }



  }


  candidatesave = function () {

    // this.currentpage = this.gridApi.paginationGetCurrentPage();
    this.db.store('candidate/add-candidate/', this.store, ((response): void => {
      $('#addcandidate').modal('hide');
      this.LoadHistory();
      this.db.addmessageandremove('Candidate added successfully.');

    }));
  };
  rotate() {
    this.state = (this.state === 'default' ? 'rotated' : 'default');
  }
  CandidateClientSave(clientid): void {

    this.currentpage = this.gridApi.paginationGetCurrentPage();

    const historystatus = {
      candidate_id: this.candidate_id,
      clientid,
      client: this.client
    };
    this.db.store('updatehistorystatus/', historystatus, ((response): void => {
      $('#client1').modal('hide');
      this.LoadHistory();

      this.db.addmessageandremove('Added Successfully');
    }));

  }

  CandidateClientProcessSave(): void {

    this.currentpage = this.gridApi.paginationGetCurrentPage();
    const historystatus = {
      candidate_id: this.candidate_id,
      clientprocess: this.saveclientprocess
    };
    this.db.store('updatehistorystatus/', historystatus, ((response): void => {
      $('#clientprocess').modal('hide');
      this.LoadHistory();

      this.db.addmessageandremove('Added Successfully');



    }));

  }
  CandidateGraduationSave(): void {

    this.currentpage = this.gridApi.paginationGetCurrentPage();
    const historystatus = {
      candidate_id: this.candidate_id,
      graduation: this.graduation
    };
    this.db.store('updatehistorystatus/', historystatus, ((response): void => {
      $('#Graduation').modal('hide');
      this.LoadHistory();

      this.db.addmessageandremove('Added Successfully');

    }));

  }


  CandidateExperienceSave(): void {
    this.currentpage = this.gridApi.paginationGetCurrentPage();
    const historystatus = {
      candidate_id: this.candidate_id,
      experience: this.experience
    };
    this.db.store('updatehistorystatus/', historystatus, ((response): void => {
      $('#Experience').modal('hide');
      this.LoadHistory();

      this.db.addmessageandremove('Added Successfully');



    }));

  }


  CandidateCommentSave(): void {


    this.currentpage = this.gridApi.paginationGetCurrentPage();
    const historystatus = {
      candidate_id: this.candidate_id,
      comment: this.comment
    };
    this.db.store('updatehistorystatus/', historystatus, ((response): void => {
      $('#Comment').modal('hide');
      this.LoadHistory();

      this.db.addmessageandremove('Added Successfully');

      // this.message = {};
      // this.CandidateNote = { candidate_id: 0 };
      // this.GetNotes();

    }));

  }



  onFileChange(event) {

    for (let i = 0; i < (event.target.files.length); i++) {
      // this.file = event.target.files[i];
      this.myFiles.push(event.target.files[i]);
      // // console.log(this.myFiles);
      // this.uploadForm.get('profile').setValue(this.myFiles);
    }
  }

  resumeuploademultiple() {


    const fileToUpload: any[] = [];
    // fileToUpload.push({ 'filekey': 'file', 'file': this.myFiles });
    this.myResume = this.myFiles;
    FileList = null;
    this.db.storeupload('resumeuploademultiple/', { file: this.myResume }, (response) => {

      this.myResume = '';
      this.candidateresume = response;
      $('#Uploadmultipleresumee').modal('hide');
      $('#parseloader').appendTo('body').modal('show');


      setTimeout(() => {
        this.getcandidatemultiple();
      }, 120000);
    }, (response) => {

      this.db.showNotification('Not uploaded');
    }, null, fileToUpload);
  }

  getcandidatemultiple(): void {

    // $('#resumeupload').modal('show');
    this.db.list('getmultiplecandidate/', { resume: [this.candidateresume] }, (response): void => {

      $('#parseloader').modal('hide');

      $('#multiplecandidatedetail').modal('show');

      this.multiplecandidate = response;
      this.rowDataCandidate = response;
    });
  }


  candidatesavemultiple(): void {

    this.multiplecandidate;
    this.multiplecandidate;
    const data = this.multiplecandidate;
    const candidate_name = [], candidateemail = [], candidatephone = [], candidateskill = [], candidatemultipleid = [], candidateresume = [];
    for (let i = 0; i < data.length; i++) {

      candidate_name.push(data[i].ex_name, '&');
      candidateemail.push(data[i].ex_email, '&');
      candidatephone.push(data[i].ex_phone, '&');
      candidateskill.push(data[i].ex_skills, '&');
      candidatemultipleid.push(data[i].id, '&');
      candidateresume.push(data[i].resume_name, '&');
    }

    const candidate_names = candidate_name.toString();
    const candidateemails = candidateemail.toString();
    const candidatephones = candidatephone.toString();
    const candidateskills = candidateskill.toString();
    const candidatemultipleids = candidatemultipleid.toString();
    const candidateresumes = candidateresume.toString();
    this.db.list('candidatesavemultiple/', { candidate_names, candidateemails, candidatephones, candidateskills, candidatemultipleids, candidateresumes }, (response): void => {
      $('#multiplecandidatedetail').modal('hide');
      this.db.showNotification('Candidate Added Successfully');
      this.LoadHistory();

    });
  }

  resumeeupload(files: FileList) {

    const fileToUpload: any[] = [];
    fileToUpload.push({ filekey: 'file', file: files.item(0) });
    FileList = null;
    this.db.storeupload('resumeuploade/', { file: files }, (response) => {

      this.candidateshowdata = response[1];
      this.candidate_name = response[1].Name;
      this.candidateemail = response[1].Email;
      this.candidatePhone = response[1].Phone;
      this.candidateskills = response[1].Skills;
      this.candidatefilenname = response[1].Filename;
      this.candidateid = response[0];
      this.resumeDetails = true;
      this.fullname = response[0] + '_' + this.candidatefilenname;
      // this.fileUploader.nativeElement.value = null;

      if (this.candidateshowdata.Filename.indexOf('docx') === - 1) {
        $('#resumeview').attr('src',
          'https://docs.google.com/gview?url=http://api.passivereferral.com/new_parser_resume/' +
          this.fullname + '&pid=explorer&efh=false&a=v&chrome=false&embedded=true');
      } else {
        $('#resumeview').attr('src',
          'https://view.officeapps.live.com/op/embed.aspx?src=http://api.passivereferral.com/new_parser_resume/' +
          this.fullname);
      }

      //
      // $scope.cvslists = response.data;
      this.db.showNotification('Resume Uploaded');
      // $('#uploadresume').modal('hide');
    }, (response) => {
      //  this.viewresumee = response.Filename;
      this.db.showNotification('Not uploaded'); $('#resumeupload').modal('show');
    }, null, fileToUpload);
  }
  getcandidatechange(): void {



    if (this.countries === undefined) {
      this.db.list('master/country', {
        gi: 'rolecreating'
      }, (response): void => {
        this.countries = response;
      });
    }

    this.candidateshowdata = {
      gender: this.candidateshowdata.gender,
      parseid: this.candidateid,
      candidate_name: this.candidateshowdata.Name,
      email: this.candidateshowdata.Email,
      mobile_no: this.candidateshowdata.Phone,
      filename: this.candidatefilenname,
      dob: this.candidateshowdata.dob,
      currentSalary: this.candidateshowdata.currentSalary,
      currentOrganization: this.candidateshowdata.currentOrganization,
      noticePeriod: this.candidateshowdata.noticePeriod,
      expectedSalary: this.candidateshowdata.expectedSalary,
      currentDesignation: this.candidateshowdata.currentDesignation,
      state: this.candidateshowdata.state,
      city: this.candidateshowdata.city,
      location: this.candidateshowdata.location,
      preferredLocation: this.candidateshowdata.preferredLocation,
      qualification: this.candidateshowdata.Education,
      phoneNo: this.candidateshowdata.phoneNo,
      panNo: this.candidateshowdata.panNo,
      nationality: this.candidateshowdata.nationality,
      visaType: this.candidateshowdata.visaType,
      remark: this.candidateshowdata.remark,
      ovarallExperiance: this.candidateshowdata.ovarallExperiance,
      relevantExperiance: this.candidateshowdata.relevantExperiance,
      address: this.candidateshowdata.address,
      industryType: this.candidateshowdata.industryType,
      functionalArea: this.candidateshowdata.functionalArea,
      skillSet: this.candidateshowdata.Skills,
      source: this.candidateshowdata.source,
    };
    this.db.list('addnewcandidateresume/', this.candidateshowdata, (response) => {
      this.db.addmessageandremove('Candidate added successfully.');
      this.LoadHistory();
      this.resumeDetails = false;
      const fileToUpload: any[] = [];

      // $('#resumeupload').modal('hide');
      // $('#uploadresume').modal('show');

    });

  }
  public oncandidateshowClick(data: any) {


    data.tempdate = new Date().getMilliseconds();
    this.currentData = {};
    this.currentData = data;
  }
  // onPaginationChanged() {
  //   // console.log("onPaginationPageLoaded");
  //   if (this.gridApi) {
  //     setText("#lbLastPageFound", this.gridApi.paginationIsLastPageFound());
  //   }
  // }
  
  onGridReady(params) {
    //

    this.gridApi = params.api;
    // this.currentpage = this.gridApi.paginationGetCurrentPage();
    // this.gridApi.paginationGoToPreviousPage();
    //
    // this.gridApi.paginationGoToPage(1);
    this.gridColumnApi = params.columnApi;
    this.loadgender();

  }
  exportdat() {
    this.gridApi.exportDataAsCsv();

  }
  onSelectionChanged(event) {

    this.allids = this.db.ids;
    // this.allids = this.db.extractIDsData(event.api.getSelectedNodes());

  }
  gotocurrentpage(event) {
    //

    this.currentpage = event.api;

  }
  openmodal(modalname) {

    $(modalname).appendTo('body').modal('show');

  }

  datfromprgridTable(evt) {

    this.limitstartIndex = evt.startIndex;
    this.limitendIndex = evt.pageSize;

  }
  datfromprgrid(evt) {
    // alert(evt.pageSize)
    // alert("startIndex " + evt.startIndex + ". endIndex." + evt.endIndex + "Call")
    //

    // // console.log(evt);

    this.limitstartIndex = evt.startIndex;
    this.limitendIndex = evt.pageSize;

    // this.limitendIndex = evt.endIndex + 1;

    // if (evt.pageSize > evt.endIndex) {
    //   var adddata = evt.pageSize - this.limitendIndex;
    //   var newdata = adddata + this.limitendIndex;
    //   this.limitendIndex = newdata;
    // }


    this.LoadHistory();
  }



  OnRowclicked(evt) {

    switch (evt.headername) {
      case 'candidateProfile':
        const url = '/candidate/' + evt.fulldata.id;
        window.open(url, '_blank');
        break;
    }
  }
  // mainprocess?, childprocess?, jobitem?,
  filterdrbytab(resume) {


    // this.router.navigate([ '/parserResume' ], { queryParams: { parser:resume } })
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['parserResume', { parser: resume }])
    );

    window.open(url, '_blank');
  }
  Gridchange() {

    this.Showgrid = !this.Showgrid;

    this.Showtable = !this.Showtable;
    this.LoadHistory();



  }
  dataclick(evt) {

    if (evt.header == 'yes') {

      const url = '/candidate/' + evt.value.id;
      window.open(url, '_blank');

    }
    if (evt.header == undefined || evt.header == null) {

    }
  }
  datafromprgridbuttondetails(data) {

    alert('button');

    switch (data.button) {
      case 'Edit':
        // this.candidatedata(data.id);
        // this.onload(data.id)
        // $('.box5').fadeToggle("slow");
        $('.box5').show('slow');
        $('.hide').hide();

        // $(".buttonclick").prop("disabled",false);

        $('.buttonclick').prop('disabled', true);

        break;
      case 'delete':
        break;

      default:
        alert('Default case');
    }

  }

  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }


  openTestDialog(){
    console.warn('tuhin')
  }


  openCallDialog(){
    this.dialog.open(CallComponent, {
      width: '450px',
    }
    )
  }

}

