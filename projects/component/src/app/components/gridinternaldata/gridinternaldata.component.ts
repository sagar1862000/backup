import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { isArray } from 'jquery';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs/internal/Subscription';
import { ExcelService } from '../../../../../../src/app/services/excel.service';
import { DbService } from '../../../../../../src/app/services/db.service'


declare var $: any;

@Component({
  selector: 'app-gridinternaldata',
  templateUrl: './gridinternaldata.component.html',
  styleUrls: ['./gridinternaldata.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridinternaldataComponent implements OnInit {

  @Input()
  set CustomBtnText(data: string) {
    // //age
    if (data) {

      this._customBtnText = data;
    } else {
      this._customBtnText = 'Custom';
    }
  }

  @Input() set customdataNumber(customdataNumber: any) {

    if (customdataNumber) {

      this._customdataNumber1 = customdataNumber;

      this.pager1 = this.db.getPager12(this._customdataNumber1.length);
    }
  }

  @Input()
  set isCustomBtn(data: boolean) {
    // //
    if (data) {
      this._isCustomBtn = data;
    }
  }

  @Input()
  set hidecol(data: any) {
    //

    if (data) {

      this._hidecol = data;

    }
  }

  @Input()
  set showcol(show: any) {
    if (isArray(show)) {

      if (show && show.constructor === [].constructor) {
        this._showcol = show;
        //
      }
    }
  }
  @Input()
  set canEdit(data: boolean) {
    this._canEdit = data;

  }

  @Input()
  set canDelete(data: boolean) {

    this._canDelete = data;


  }
  @Input()
  set page_names(page: any) {
    this.pagename = page;

    if (isArray(page)) {

      if (page && page.constructor === [].constructor) {

        this.pagename = page;
      }
    }
  }
  @Input()
  set data(data: any) {

    if (isArray(data)) {
      this._data = data;
      
      this.transformBody(this._data);
      this.pager = this.db.getPager(this._data.length);
      this.setPage(1, this.pagesize, false);

    }
  }
  @Input()
  set header(header: any) {
    if (isArray(header)) {

      this._header = header;

    }
  }


  @Input()
  set sendData(sendData: any) {

    this.GetsendedData = sendData;
  }

  constructor(public db: DbService, private router: Router, private sanitizer: DomSanitizer, private cd: ChangeDetectorRef, private excelService: ExcelService,) {

  }
  theCheckbox = false;
  marked = false;
  hidden = true;
  users$: Object;
  subscription: Subscription;
  datakey: any = '';
  details = [];
  changeheadercallid: any = [];
  callids = [];
  candidatestatus: any;
  certificateAlt = 'iPhone';
  Experiences = 'assets/img/iconsPrInternalgrid/experience.svg';
  Mail = 'assets/img/iconsPrInternalgrid/Email.svg';
  Location1 = 'assets/img/iconsPrInternalgrid/Location.svg';
  CurrentOrganisation = 'assets/img/iconsPrInternalgrid/organization.svg';
  PhoneCall = 'assets/img/iconsPrInternalgrid/number.svg';
  Designation = 'assets/img/iconsPrInternalgrid/designation.svg';
  Salary = 'assets/img/iconsPrInternalgrid/Salary.svg';
  Education = 'assets/img/iconsPrInternalgrid/education.svg';
  Skillset = 'assets/img/iconsPrInternalgrid/skill set.svg';
  whatsapp = 'assets/img/iconsPrInternalgrid/akar-icons_whatsapp-fill.svg';
  Callid = 'assets/img/iconsPrInternalgrid/call id.svg';
  dateandtime = 'assets/img/iconsPrInternalgrid/date-and-time 1.svg';
  resume = 'assets/img/iconsPrInternalgrid/Resume.svg';

  candidate_filtered_cols = [];
  candidate_filtered = [];
  filtertitle = '';
  jobslistbyclients: any;
  start_date = new Date();
  end_date = new Date();
  // loaddata = false;
  clientreport: any;
  clientdetails: any;
  clientreportpie: any;
  managers = [];
  isShown1 = false;
  Current_Designation = false;
  currentOrganization = false;
  Location = false;
  Contact_number = false;
  ovarall_Experiance = false;
  Qualification = false;
  Current_Salary = false;
  Storedata: any;
  trackerno: number;
  normal_order = false;
  desc_order = true;
  GridFilterPipe: any;
  matching = true;
  asc_order = false;
  itemPerPage = 5;
  _canEdit = false;
  _canDelete = false;
  _isCustomBtn = false;
  _CheckBtn = false;
  istrue: false;
  isValid = true;
  _customBtnText = 'Custom';
  _data: any;
  _customdataNumber1: any;
  _hidecol = [];
  _showcol = [];
  _ids = [];
  entry: any = [];
  showMore = false;
  showMore1 = false;
  show = false;
  _addbutton: any;
  pager1: any = { pages: '', length: '' };

  selectedids: any = [];
  datastar = false;
  Average_Rating = true;
  btnDisabled = false;
  checkid: -1;
  afterpush = false;
  pagewiseselected = true;
  allselected = true;
  selectedpage = false;
  check_selected = false;
  pagechanged = false;
  pagesize: any = 20;
  totalItems = 0;
  totalpage = [];
  pageSizes = [10, 20, 50, 100, 500, 1000, 5000, 10000, 50000];
  totalcandidates: any;
  pagename: any;
  obj: any;
  rowdata = new EventEmitter<any>();
  row = { entity: null };
  pageno: any;
  exportdata: any;
  finalexportdata: any;
  exportsingledata = [];
  count = 0;
  count1: any;
  count2: any;
  storecount2: any;
  gridcount: any;
  checkHeaderinChangeHeader: any;
  test: any;
  isShown = false;

  changeHeader: any;
  changeHeader1: any;
  changeCustomData: any;
  objChange: any;
  ChekboxPush: any;
  pager: any = { pages: '', length: '' };
  filterString = '';
  filtered: [];
  // emptyarray:any={ id: '', selected: '' };
  emptyarray: any = [];
  keys: any;
  keysBd: any;
  masterSelected: boolean;
  parentselector: boolean;
  currentData: {};
  checkedList: any;
  checkedstore: any;
  _headerList: any;
  //  show=true;

  // elementRef: any;
  taskList: any;
  addTaskInput: any;
  addTaskButton: any;
  user: any;
  dataforgrid: any;
  p1: any;
  keysC: any;
  store: any;
  works: boolean;
  myVar1 = false;

  ischecked = false;
  checkAllTrades = false;
  gfg = 5;
  isIt = false;
  selected2 = false;
  currentPage = 1;
  getcustomdataobject: any;
  page = 1;
  selected = true;
  // stars: number[] = [1, 2, 3, 4, 5];
  starWidth = 0;
  currentRate = 0;
  selectedValue = 0;
  startdate: any;
  enddate: any;
  // show = false;
  fullScreen = true;
  template = ``;
  pagedItems: any;
  selectedItem = 'Item 1';
  current: any;
  // message:string;
  stars: number[] = [1, 2, 3, 4, 5];
  _data1: any;
  _hidecol1: any;
  activities: any;
  searchText = '';
  rowData = [];
  isPager = false;
  showinqueue = true;
  pageSize = 1000;
  isLeftDragging = false;
  isRightDragging = false;
  _button: any;
  _header: any;
  Buttons: any;
  Appendbutton: any = [];
  abbreviations: any = [];
  isRead = false;
  uid;
  id1: any = [];
  id2: any = [];
  buttonselected = false;
  _ButtonsId: any;
  dataforrecurt: any;
  isSelected = true;

  notes: string;
  CandidateNote: any = {
    notes: ''
  };
  selecteddropdown = '';
  dropdownclick: any;
  public element: string;
  public checkbox101: string;
  GetsendedData: any;

  keydata1: any = [];

  resultdata1: any = [];


  @Output() GridHeaderClicked = new EventEmitter<any>();
  @Output() GridRowClicked = new EventEmitter<any>();
  @Output() emitWhatupbuttondata = new EventEmitter<any>();
  @Output() emitbuttondataToReport = new EventEmitter<any>();
  @Output() emitbuttondetailsdata = new EventEmitter<any>();


  @Output() buttonData = new EventEmitter<any>();
  @Output() buttonDetailsData = new EventEmitter<any>();



  getdata(_header) {

    this.changeHeader = this._header.reduce(
      (obj, item) => Object.assign(obj, { [item.headerName]: item.field }),
      {}
    );

    return this.changeHeader;
  }
  checkUncheckAll() {
    this.id1 = [];

    this.finalexportdata = [];

    for (let i = 0; i < this.candidatestatus.length; i++) {

      this.setfinalallexportdata(this.candidatestatus);

      for (let j = 0; j < this.candidatestatus[i].length; j++) {

        if (this.candidatestatus[i][j].headername == 'Checkbox') {
          // this.finalexportdata.push(this.candidatestatus[i][j]);
          this.candidatestatus[i][j].isSelected = this.masterSelected;
          this.id1.push({ id: this.candidatestatus[i][j].value, selected: this.candidatestatus[i][j].isSelected });

        }
      }
    }
    this.db.allselectedids(this.id1);
    this.count = this.db.idscheckbox.length;

  }

  getSelection(item) {

    return this.dataforgrid.findIndex(s => s.id === item.id) !== -1;

  }

  isSingleSelected(obj, data) {

    this.id1 = [];

    this.finalexportdata = [];
    const datakey: any = [];

    // this.setfinalexportdata(this.StoreisSingleSelected);
    for (let i = 0; i < this.candidatestatus.length; i++) {

      for (let j = 0; j < this.candidatestatus[i].length; j++) {
        if (this.candidatestatus[i][j].headername == 'Checkbox') {

          this.id1.push({ id: this.candidatestatus[i][j].value, selected: this.candidatestatus[i][j].isSelected });

          const a = this.candidatestatus[i][j].isSelected == true;

          if (a == true) {

            // alert(JSON.stringify(this.candidatestatus[i][j]));

            this.finalexportdata.push(this.candidatestatus[i]);

            this.setfinalexportdata(this.finalexportdata);

          }



        }


      }

    }


    // // console.log('start');


    this.db.allselectedids(this.id1);


    if (this.candidatestatus.length === this.db.idscheckbox.length) {
      this.masterSelected = true;
    } else {
      this.masterSelected = false;
    }
    this.exportdataxl(obj);
    this.count = this.db.idscheckbox.length;


    this.getCheckedItemList();
  }
  getCheckedItemList() {
    this.checkedList = [];
    for (let i = 0; i < this.candidatestatus.length; i++) {
      for (let j = 0; j < this.candidatestatus[i].length; j++) {

        if (this.candidatestatus[i][j].isSelected) {

          this.checkedList.push(this.candidatestatus[i][j]);
        }

      }
    }
  }
  UncheckAll() {
    this.id1 = [];

    for (let i = 0; i < this.candidatestatus.length; i++) {
      for (let j = 0; j < this.candidatestatus[i].length; j++) {
        if (this.candidatestatus[i][j].headername == 'Checkbox') {
          this.candidatestatus[i][j].isSelected = this.masterSelected;
          this.id1.push({ id: this.candidatestatus[i][j].value, selected: false });
        }
      }
    }
    this.db.allselectedids(this.id1);
    this.count = this.db.idscheckbox.length;

  }


  toggleVisibility(e) {
    this.marked = e.target.checked;
    // // console.log('check');

  }

  add(data) {

    this.dropdownclick = data;
  }
  public ngOnInit(): void {

    this.getdata(this._header);
    $('.readmore-link').click(function (e) {
      const isExpanded = $(e.target).hasClass('expand');
      $('.readmore.expand').removeClass('expand');
      $('.readmore-link.expand').removeClass('expand');
      if (!isExpanded) {
        $(e.target).parent('.readmore').addClass('expand');
        $(e.target).addClass('expand');
      }
    });

  }

  // ngAfterViewInit() {

  //   // Loading12.show();
  //   // this.subscription = this.dataforgrid.getUsers().subscribe(data => {
  //   //   this.users$ = data;

  //   //   Loading12.hide()
  //   // });
  // }

  reattach() {
    this.cd.reattach();
  }
  public oncandidateshowClick(data: any) {
    this.emitWhatupbuttondata.emit({ buttondetails1: 'oncandidateshowClick' });
  }

  // funtion for tbody for priting the data for table
  transformBody(values): any {

    this.masterSelected = false;

    this.candidatestatus = [];
    for (let i = 0; i < values.length; i++) {


      this.Appendbutton = [];
      const value = values[i];
      const keys: any = [];

      for (const key1 in this._header) {

        for (const key in value) {
          if (this._header[key1].field == key) {

            if (this._header[key1].type == 'checkbox') {
              this.element = ``;
              keys.push({ headername: this._header[key1].headerName, value: value[key], iconname: this._header[key1].iconname, element: this.element, type: this._header[key1].type, showxl: this._header[key1].showxl });
            } else if (this._header[key1].type == 'text') {
              this.element = `<${this._header[key1].tag} class="${this._header[key1].class}" style="${this._header[key1].style}"  value=` + value[key] + `>` + value[key] + `</${this._header[key1].tag}> `;
              keys.push({ headername: this._header[key1].headerName, value: value[key], iconname: this._header[key1].iconname, element: this.element, type: this._header[key1].type, print: this._header[key1].print, fulldata: value, size: this._header[key1].size, showxl: this._header[key1].showxl });
            }
            else if (this._header[key1].type == 'texticon') {
              this.element = ` <img src="assets/img/iconsPrInternalgrid/${this._header[key1].iconname}" class="tool1 mb-2" id="tool2" style="margin-top:5px;" />: <${this._header[key1].tag} class="${this._header[key1].class}" style="${this._header[key1].style}"  value=` + value[key] + `>` + value[key] + `</${this._header[key1].tag}>`;
              keys.push({ headername: this._header[key1].headerName, value: value[key], iconname: this._header[key1].iconname, element: this.element, type: this._header[key1].type, print: this._header[key1].print, fulldata: value, size: this._header[key1].size, showxl: this._header[key1].showxl });

            }
            else if (this._header[key1].type == 'Plaintext') {


              this.element = ` <${this._header[key1].tag} style="${this._header[key1].headerstyle}">${this._header[key1].headname}</${this._header[key1].tag}>: <${this._header[key1].tag} class="${this._header[key1].class}" style="${this._header[key1].style}"  value=` + value[key] + `>` + value[key] + `</${this._header[key1].tag}>`;
              keys.push({ headername: this._header[key1].headerName, value: value[key], headname: this._header[key1].iconname, element: this.element, type: this._header[key1].type, print: this._header[key1].print, fulldata: value, size: this._header[key1].size, showxl: this._header[key1].showxl });


            }
            else if (this._header[key1].type == 'icon') {

              // for (var vkey in value) {
              //   if (value.hasOwnProperty(key)) {
              //     this._header[key1].ngIf = this._header[key1].ngIf.replace("{{" + vkey + "}}", value[vkey], this._header[key1].ngIf);
              //   }
              // }

              this.element = `<${this._header[key1].tag} class="${this._header[key1].class}" style="${this._header[key1].style} ">${this._header[key1].value}</${this._header[key1].tag}> `;
              keys.push({ headername: this._header[key1].headerName, value: value[key], iconname: this._header[key1].iconname, element: this.element, type: this._header[key1].type, print: this._header[key1].print, fulldata: value, size: this._header[key1].size, showxl: this._header[key1].showxl });

            }
            else if (this._header[key1].type == 'iconimagesmall') {
              this.element = `<img src="assets/img/iconsPrInternalgrid/${this._header[key1].iconname}" class="tool1 mb-2" id="tool2" style="margin-top:5px;" /> `;
              keys.push({ headername: this._header[key1].headerName, value: value[key], iconname: this._header[key1].iconname, element: this.element, type: this._header[key1].type, print: this._header[key1].print, fulldata: value, size: this._header[key1].size, showxl: this._header[key1].showxl });

            }

            else if (this._header[key1].type == 'iconimagelarge') {
              this.element = `<img src="assets/img/iconsPrInternalgrid/${this._header[key1].iconname}" class="tool1 mb-2" id="tool2" style="margin-top:5px;" /> `;
              keys.push({ headername: this._header[key1].headerName, value: value[key], iconname: this._header[key1].iconname, element: this.element, type: this._header[key1].type, print: this._header[key1].print, fulldata: value, size: this._header[key1].size, showxl: this._header[key1].showxl });

            }
            else if (this._header[key1].type == 'showheader') {
              this.element = `<${this._header[key1].tag} class="${this._header[key1].class}" style="${this._header[key1].style}">` + this._header[key1].headerName + `</${this._header[key1].tag}> `;

              keys.push({ headername: this._header[key1].headerName, value: value[key], iconname: this._header[key1].iconname, element: this.element, type: this._header[key1].type, print: this._header[key1].print, fulldata: value, size: this._header[key1].size, showxl: this._header[key1].showxl });

            }
            else if (this._header[key1].type == 'button') {
              this.element = `<${this._header[key1].tag} class="${this._header[key1].class}" style="${this._header[key1].style}"  value=` + value[key] + `>` + value[key] + `</${this._header[key1].tag}> `;
              keys.push({ headername: this._header[key1].headerName, value: value[key], iconname: this._header[key1].iconname, element: this.element, type: this._header[key1].type, print: this._header[key1].print, fulldata: value, size: this._header[key1].size, showxl: this._header[key1].showxl });


            } else if (this._header[key1].type == 'rating') {

              let star = '';

              for (let r = 0; r < this._header[key1].outoffrating; r++) {
                if (value[key] != null) {

                  if (r > value[key] - 1) {
                    star += `<td class="list-inline column3 rating-list " data-column="column3 " style="white-space: nowrap;  color: rgb(228, 224, 224); overflow:hidden; display: inline-block;"><li style="white-space: nowrap; display: inline-block; overflow:hidden;   font-size: 20px; color: #adadad;"class="starrating1 pt-3" class="tooltip-test"  title ="${this._header[key1].headerName}" id ="item.id"> ★</li></td>`;
                  } else {
                    star += `<td class="list-inline column3 rating-list " data-column="column3 " style="white-space: nowrap;  color: rgb(228, 224, 224); overflow:hidden; display: inline-block;"><li style="white-space: nowrap; display: inline-block; overflow:hidden;   font-size: 20px; color: #a64eed;"class="starrating1 pt-3" class="tooltip-test"  > ★</li></td>`;

                  }
                }
              }

              this.element = star + `&nbsp; &nbsp; &nbsp;`;

              keys.push({ headername: this._header[key1].headerName, value: value[key], iconname: this._header[key1].iconname, element: this.element, type: this._header[key1].type, print: this._header[key1].print, fulldata: value, size: this._header[key1].size, showxl: this._header[key1].showxl });

            } else if (this._header[key1].type == 'heardertext') {

              this.element = `<${this._header[key1].headertag} class="${this._header[key1].headerclass}" style="${this._header[key1].headerstyle}">${this._header[key1].headerName}</${this._header[key1].headertag}><${this._header[key1].tag} class="${this._header[key1].class}" style="${this._header[key1].style}"  value=` + value[key] + `>` + value[key] + `</${this._header[key1].tag}> `;


              keys.push({ headername: this._header[key1].headerName, value: value[key], iconname: this._header[key1].iconname, element: this.element, type: this._header[key1].type, print: this._header[key1].print, fulldata: value, size: this._header[key1].size, showxl: this._header[key1].showxl });

            }


          }

        }
      }

      this.candidatestatus.push(keys);

    }
    this.UncheckAll();

    return this.candidatestatus;

  }
  exportdataxl(data) {
    this.candidatestatus;

  }
  onclickdata(obj) {
    // // console.log('activate checkbox');


    this.masterSelected = obj.every(function (item: any) {
      // this.cdf.detectChanges();
      // // console.log(item);
      // // console.log('activate end checkbox');

      // // console.log('activate end checkbox');

      // // console.log(item.isSelected);
      return item.isSelected == true;
    });


  }
  transformcheckifcheckbox(value) {

    const a = 'aads';
    return;

  }
  valuetransform(index, item) {

    return item;
  }
  hide(value) {
    const keys = [];
    this.header = this._header;
    for (const key in value) {


      for (const key1 in this._header) {


        if (key == this._header[key1].field) {


          if (this._header[key1].ignore == 'yes') {

          }

          else {
            this.showMore = !this.showMore;

            keys.push({ key: this._header[key1].headerName, hide: this._header[key1].hide, value: value[key], okey: key });
          }
        }
      }

    }


    return keys;
  }
  Getcandidatedetail(candidateid): void {
    const id = btoa(candidateid);
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['Candidatedetails', { candidateid: id }, 'resume'])

    );

    window.open(url, '_blank');
  }

  SendmsgWhatsapp(calldata): void {

    // this.emitWhatupbuttondata.emit({buttondetails1:"SendmsgWhatsapp"});


    const appid = this.db.profile.appid;
    const statusurl = '\n  https://passivereferral.com/call_status_candidate/' + calldata.call_id + '/' + calldata.recruiter_id + '/' + calldata.id + '/' + calldata.jobid + '/ChangeStatus';
    this.db.list('candidatenote/', { candidate_id: calldata.id }, (response): void => {


      if (response.length > 0) {
        this.notes = response[0].notes;
      } else {
        this.notes = '';
      }

      const urlboolean = 'https://wa.me/?text=' + this.notes + '\n' + statusurl;
      window.open(urlboolean.toString(), '_blank');
    });
  }

  hidecandidate_name(value) {

    const keys = [];
    this.header = this._header;
    for (const key in value) {


      for (const key1 in this._header) {

        if (key == this._header[key1].field) {

          if (this._header[key1].headerName == 'candidate Name') {

            keys.push({ key: this._header[key1].headerName, hide: this._header[key1].hide, value: value[key], showMore: this.showMore, okey: key });
          }

          else {


          }
        }
      }

    }

    return keys;
  }
  hideStar(value) {

    const keys = [];
    this.header = this._header;
    for (const key in value) {


      for (const key1 in this._header) {

        if (key == this._header[key1].field) {

          if (this._header[key1].headerName == 'StarIcon') {

            keys.push({ key: this._header[key1].headerName, hide: this._header[key1].hide, value: value[key], showMore: this.showMore, okey: key });
          }

          else {


          }
        }
      }

    }

    return keys;
  }





















  First() {

    for (let i = 0; i < this._data[0].totalcandidate; i++) {

      // this.emitclickdata.emit(this.pager);
      break;
      // alert("hii")

    }
  }
  Previous() {

    for (let i = this._data[0].totalcandidate; i--;) {
      this.pager = this.db.getPager(this._data[0].totalcandidate, this.page, this.pagesize);
      break;
    }

  }
  Next() {

    for (let i = 0; i < this._data[0].totalcandidate; i++) {

      this.pager = this.db.getPager(this._data[0].totalcandidate, this.page, this.pagesize);
      break;
    }
  }
  Last() {

    for (let i = this._data[0].totalcandidate; i--;) {

      this.pager = this.db.getPager(this._data[0].totalcandidate, this.page, this.pagesize);

      break;
    }
  }

  sortData(page: number, active, direction, pagesize) {
    const sort = ({ active, direction });

    if (pagesize === undefined || pagesize == 'undefined') {

      pagesize = this.pagesize;

    }
    this.pagesize = pagesize;
    // if (this.pagechanged === true) {
    //   this.pagechanged = false;
    // }
    // this.transformBody1(this.dataforgrid);

    if (this.check_selected === true) {
      this.SelectPageWise(this.dataforgrid, 'id');
      // this.checkUncheckAll(this.dataforgrid, 'id')
      this.pagechanged = false;
      this.check_selected = false;
    } else {
      this.pagechanged = false;
    }
    localStorage.setItem('excel_page_name', this.pagename);

    if (localStorage['page'] == null && page === 1) {
      localStorage.setItem('excel_page_name', '1');

    } else if (localStorage['page'] != null && page !== 1 && page !== 0) {
      this.pageno = page;
      localStorage.setItem('page', this.pageno);

    } else if (page === 0) {
      localStorage.setItem('page', '1');

    }
    if (direction == '') {
      this.normal_order = false;
      this.desc_order = true;
      this.asc_order = false;
    }
    if (direction == 'desc') {
      this.desc_order = false;
      this.normal_order = false;
      this.asc_order = true;

    }
    if (direction == 'asc') {
      this.asc_order = false;
      this.desc_order = false;
      this.normal_order = true;
    }

    // this.dataforgrid = [];
    // get pager object from service
    // this.pager = this.db.getPager(this._data.length, page, pagesize);

    this.pager = this.db.getPager(this._data.length, page, pagesize);

    // this.gridcount = this._data.length;
    // get current page of items


    this.dataforgrid = this._data.slice(this.pager.startIndex, this.pager.endIndex + 1);
    // const dataforlater = JSON.stringify(datalater);



    const datalater = this._data.slice(this.pager.startIndex, this.pager.endIndex + 1);
    const dataforlater = JSON.stringify(datalater);

    const datagrid = dataforlater;
    const data2 = JSON.parse(datagrid);

    const data = this.dataforgrid.slice();
    if (!active || direction === '') {
      this.dataforgrid = data;
      return;
    }

    this.dataforgrid = data.sort((a, b) => {
      const isAsc = direction === 'asc';
      switch (active) {
        case 'Candidate Name':
          return compare(a.candidate_name, b.candidate_name, isAsc);
        case 'Email':
          return compare(a.email, b.email, isAsc);
        case 'Mobile No':
          return compare(a.mobileNo, b.mobileNo, isAsc);
        default:
          return 0;
      }
    });
    // const data2 = this._data.slice(this.pager.startIndex, this.pager.endIndex + 1);

    this.exportdata = data2;
    for (const data in this.exportdata) {

      if (this.exportdata[data]) {

        for (const item in this._hidecol) {
          if (this._hidecol[item]) {
            delete this.exportdata[data][this._hidecol[item]];
          }

        }

      }
    }
    // //
    // const datagrid = dataforlater;
    // this.dataforgrid = JSON.parse(datagrid);

  }

  detach() {
    this.cd.detach();
  }



  // pagination funtion
  setPage(page: number, pagesize, value) {
    //


    // this.cd.detectChanges();
    // // console.log('set page start');

    if (page < 0 || page > this.pager.totalPages) {
      return;
    }
    if (pagesize === undefined || pagesize == 'undefined') {
      pagesize = this.pagesize;

    }

    // this.deselectall(this.dataforgrid, 'id');

    this.pagesize = pagesize;
    this.pageno = page;
    localStorage.setItem('page_name', 'myjob_view');
    if (localStorage['page'] == null && page === 1) {
      localStorage.setItem('page', '1');

    } else if (localStorage['page'] != null && page !== 1 && page !== 0) {
      this.pageno = page;
      localStorage.setItem('page', this.pageno);

    } else if (page === 0) {
      localStorage.setItem('page', '1');

    }

    if (this.check_selected === true) {
      // this.SelectPageWise(this.dataforgrid, 'id');
      this.pagechanged = false;
      this.check_selected = false;
    } else {
      this.pagechanged = false;

    }

    this.dataforgrid = [];
    this.pager = this.db.getPager(this._data[0].totalcandidate, page, pagesize);

    if (value == true) {
      this.GridHeaderClicked.emit(this.pager);
      this.GetsendedData = false;
    } else {
      this.GetsendedData = true;

    }
    this.gridcount = this._data[0].totalcandidate;
    this.selectedpage = false;
    this.dataforgrid = this._data;
    this.totalcandidates = this.dataforgrid.length;
    // // console.log('set page end');
  }


  onRowClicked(evt) {

    this.GridRowClicked.emit(evt);
  }

  onHeaderClicked(evt) {
    this.GridHeaderClicked.emit(evt);
  }

  // pagination setting the page
  SelectPageWise(obj, id: 'id') {

    this.selectedpage = true;
    if (this.check_selected === false) {
      this.count = 0;
      this.selectedids = [];
      for (const i in obj) {
        if (obj[i]) {
          this.count++;
          if (this._data[i].selected1 === undefined || this._data[i].selected1 === true
            || this._data[i].selected1 === false) {

            this._data[i].selected1 = true;

            this.selectedids.push({ id: obj[i].id, selected1: true });
          }
        }
      }
      this.check_selected = true;
      // this.pagechanged = true;
      this.setfinalallexportdata(this._data);

    } else if (this.check_selected === true) {

      this.selectedids = [];
      for (const i in obj) {
        if (obj[i]) {
          if (this._data[i].selected1 === undefined || this._data[i].selected1 === true
            || this._data[i].selected1 === false) {
            this._data[i].selected1 = false;

            this.selectedids.push({ id: obj[i].id, selected1: true });

            if (this.count > 0) {
              this.count--;
            }
          }

        }
      }

      this.finalexportdata = [];
      this.check_selected = false;
    }

    this.db.allselectedids(this.selectedids);

  }



  callfunction(data) {
    this._data = data;
    return this._data;
  }

  exportAsXLSX() {

    const keyvalue: any = [];

    const store: any = [];

    const res = {};
    // this.excelService.exportAsExcelFile(this._header, 'excel_data');

    this.exportdata = [];



    const result = this.finalexportdata.map((v) => {

      for (const keymap in v) {


        if (keymap <= v.length && v[keymap].showxl == 'yes') {

          this.keydata1.push({ key: v[keymap].headername, value: v[keymap].value });

        }

      }

      keyvalue.push(this.keydata1);

      this.keydata1 = [];

    });

    for (const keyfor in keyvalue) {
      keyvalue[keyfor].forEach((element, index) => {

        this.resultdata1[element.key] = element.value;

      });
      store.push(this.resultdata1);

      this.resultdata1 = [];
    }


    this.excelService.exportAsExcelFile(store, 'excel_data');
  }

  // export the data selected
  setfinalallexportdata(objdata) {
    this.finalexportdata = [];

    for (const datakey in objdata) {
      if (datakey) {

        this.finalexportdata.push(objdata[datakey]);


      }
    }
  }


  setfinalexportdata(objdata, selected = 'selected') {
    this.finalexportdata = [];

    for (const datakey in objdata) {

      if (objdata[datakey][0].isSelected == true) {

        this.finalexportdata.push(objdata[datakey]);
        // alert(JSON.stringify(objdata[datakey]));

      }
    }


  }












}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

function evt(evt: any, data: any) {
  throw new Error('Function not implemented.');
}

