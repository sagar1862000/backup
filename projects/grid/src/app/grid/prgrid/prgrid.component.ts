import { ChangeDetectorRef, Component, ViewChild, ElementRef, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { isArray } from 'util';
import { DomSanitizer } from '@angular/platform-browser';
import { PipeTransform, Pipe } from '@angular/core';
import * as c3 from 'c3';
// import * as $ from 'jquery';
// import * as $ from 'jquery';
declare var $: any;
import { first } from 'rxjs/operators';
import { DbService } from 'src/app/services/db.service';
import { ExcelService } from 'src/app/services/excel.service';
// import { debug } from 'console';
@Component({
  selector: 'app-prgrid',
  templateUrl: './prgrid.component.html',
  styleUrls: ['./prgrid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})

export class PrgridComponent implements OnInit {
  GetsendedData: any;
  candidatestatus: any;

  keydata1: any = [];

  resultdata1: any = [];

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
  public Current_Page : number;
  public Total_Page : any;
  @Input()
  set data(data: any) {
    // console.log('here : ',data[0]);
    this.Current_Page = 1;
    // this.Total_Page = data[1];
    // this._data = data[0];
    // console.log('Checking : ',isArray(this._data),'Data : ',this._data);


    if (isArray(data)) {
      this._data = data[0];
      this.Total_Page=data[1];
      // console.log('Checking : ',isArray(this._data),'Data : ',this._data);

      // this.emitbuttondataToReport.emit({data:this._data})

      this.pager = this.db.getPager(this._data.length);
      // this.pager = this.data[1]

      // this.setPage(1, 20);
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

  constructor(public db: DbService, private router: Router, private excelService: ExcelService,) {
  }


  candidate_filtered_cols = [];
  candidate_filtered = [];
  filtertitle = '';
  jobslistbyclients: any;
  start_date = new Date();
  end_date = new Date();
  loaddata = false;
  clientreport: any;
  clientdetails: any;
  clientreportpie: any;
  managers = [];
  isShown1 = false;
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
  // pagesize: 20;
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
  finalexportdata: any = [];
  StoredataXlInformation: any = [];
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
  masterSelected: any;
  parentselector: boolean;

  checkedList: any;
  checkedstore: any;
  _headerList: any;


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
  show = false;
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

  @Output() onHeaderClicked = new EventEmitter<any>();
  @Output() emitclickdata = new EventEmitter<any>();
  @Output() emitbuttondata = new EventEmitter<any>();
  @Output() emitbuttondataToReport = new EventEmitter<any>();
  @Output() onRowClicked = new EventEmitter<any>();
  @Output() emitbuttondataclick = new EventEmitter<any>();


  // @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  // @Output() actionfuntion: EventEmitter<any> = new EventEmitter();
  // @Output() notifyParentFirstsendNotification: EventEmitter<any> = new EventEmitter();

  @Output() buttonData = new EventEmitter<any>();
  @Output() buttonDetailsData = new EventEmitter<any>();



  getdata(_header) {

    this.changeHeader = this._header.reduce(
      (obj, item) => Object.assign(obj, { [item.headerName]: item.field }),
      {}
    );

    return this.changeHeader;
  }


  // checkbox funtion
  //  The master checkbox will check/ uncheck all items
  checkUncheckAll() {
    // this.db.allselectedids(this._data);
    for (let i = 0; i < this._data.length; i++) {
      this._data[i].isSelected = this.masterSelected;

    }

    for (const key in this.candidatestatus) {
      // this.StoredataXlInformation.push(this.candidatestatus[key])
      this.finalexportdata.push(this.candidatestatus[key]);

    }
    // alert(JSON.stringify(this.candidatestatus[i][j]));

    // this.setfinalexportdata(this.finalexportdata);

    this.getCheckedItemList();
  }

  // Check All Checkbox Checked
  isAllSelected(obj) {

    this.id1 = [];
    this.id2 = [];
    let keysCK: any = [];
    keysCK = this.transformbodycheck(obj);

    for (const key in this.candidatestatus) {
      this.StoredataXlInformation.push(this.candidatestatus[key]);
      this.finalexportdata.push(this.candidatestatus[key]);

    }

    // this.setfinalallexportdata(this.candidatestatus);


    for (const key in keysCK) {

      this.id1.push({ id: keysCK[key].value, selected: true });

      this.id2.push({ id: keysCK[key].value, call_id: obj.call_id, });

      this.db.SelectedSingleIds(this.id1);
      this.db.extractCallIDData(this.id2, 'call_id');
      // this.db.allselectedids(this._data);
      this.masterSelected = this.dataforgrid.every(function (item: any) {

        return item.isSelected == true;


      });

    }
    this.getCheckedItemList();
  }

  // Get List of Checked Items
  getCheckedItemList() {
    this.checkedList = [];

    for (let i = 0; i < this._data.length; i++) {

      if (this._data[i].isSelected) {

        this.checkedList.push(this._data[i]);
      }
    }


    this.checkedList = JSON.stringify(this.checkedList);

    // alert(this.checkedList);
  }
  // count checkbox
  changed() {

    this.count = 0;

    this.dataforgrid.forEach(item => {

      if (item.isSelected) {

        this.count = this.count + 1;
      }


    });

  }
  changed1() {
    this.count = 0;
    this.dataforgrid.forEach(item => {

      if (!item.isSelected) {

        this.count = this.count + 1;
      }
    });
  }
  // end of checkbox


  public ngOnInit(): void {
    this.getdata(this._header);

    this.changerouterlinkifnull(this._data);

  }
  changerouterlinkifnull(data) {

    if (data?.length == 0) {
      // this.router.navigate(['../bot/new'])
    }
  }
  ngAfterViewInit() {
    // Loading12.show();

    // this.loadCandidate;
    // setTimeout(()=>Loading12.hide(),2000);



    // setTimeout(function () {
    //
    //   for(var i = 0; i< this.dataforgrid.length; i++){
    //
    //     if(this.dataforgrid.length==0)
    //     {
    //       Loading12.hide()
    //     }
    //   }
    // }, );

    // this.settimer()
    // Loading12.hide()
  }

  transformBodyButton(value) {

    // // console.log('activate transforBody1');
    const text = '';
    const keys = [];
    this.Appendbutton = [];
    this.abbreviations = [];
    this.header = this._header;

    for (const key in value) {


      for (const key1 in this._header) {

        if (key == this._header[key1].field) {

          // if(this._header[key1].action=="button"  )
          // {


          if (this._header[key1].action == 'button') {

            const Buttons = `<button class="ab  btn-sm  btn btn-dark  btn-light;"    value=` + this._header[key1].headerName + `>` + this._header[key1].headerName +
              `</button>`;
            const firstWord = this._header[key1].headerName.split(' ')[0];
            const output = firstWord[0][0] + firstWord[1][0];

            // this.Appendbutton.push({button: Buttons,button1: output,buttonname:this._header[key1].headerName});

            this.Appendbutton.push({ button: Buttons, button1: Buttons, buttonornot: this._header[key1].action == 'button', iconname: this._header[key1].iconname, buttonname: this._header[key1].headerName, buttonheader: this._header[key1].headerName, call_h_id: value[key], id: value[key], actionType: this._header[key1].actionType });



          }

        }

      }

    }

    return this.Appendbutton;
  }


  // funtion for tbody for priting the data for table
  transformBody(value): any {

    // this.cd.detectChanges();
    // console.log('activate transforBody');

    this.Appendbutton = [];
    const keys: any = [];
    const keys1: any = [];
    this.candidatestatus = [];
    const obj = {};
    // fast:
    const text = '';


    for (const key in value) {
      for (const key1 in this._header) {

        if (this._header[key1].field == key) {


          if (this._header[key1].show == 'yes') {


            const localkey: any = [];
            const $chk = $('<input type=\'checkbox\' name=\'students[]\'  class=\'' + this._header[key1].field + '\'  />' + '<br/>');
            $('#box').append($chk);
            //  this.element = `<${this._header[key1].tag} class="${this._header[key1].margingbootstrap}" style="${this._header[key1].font_weight +this._header[key1].margin+";"+ this._header[key1].padding}"  value=` + value[key] + `>` + value[key] + `</${this._header[key1].font_weight} ${this._header[key1].tag}> `;
            // this.checkbox101= $('.button-holder').html('<button value=' + this._header[key1].margingbootstrap + '>' + this._header[key1].margingbootstrap +
            //  '</button>');

            keys.push({ headername: this._header[key1].headerName, value: value[key], clicktype: this._header[key1].headerName, showxl: this._header[key1].showxl, actionType: this._header[key1].actionType });


            $('.tool1').tooltip({ show: { effect: 'none', delay: 0 }, });
            //  $('[data-toggle="tooltip"]').tooltip({show: {effect:"none", delay:0},});

            // } [data-toggle="tooltip"]
          }
        }

      }
    }

    this.candidatestatus.push(keys);
    // this.candidatestatus.push(keys);
    // this.UncheckAll();
    // return this.candidatestatus;

    return keys;

  }
























  // transformBodybutton(value) {
  //   // // console.log('activate transforBody1');
  //   const text = '';
  //   const keys = [];
  //   this.Appendbutton = [];
  //   this.abbreviations = [];
  //   this.header = this._header;

  //   for (const key in value) {


  //     for (const key1 in this._header) {

  //       if (key == this._header[key1].field) {

  //         // if(this._header[key1].action=="button"  )
  //         // {
  //         if (this._header[key1].fielddata == 'field') {
  //           if (value[key] === undefined || value[key] === null) {
  //             // do something

  //             const Buttons = `<button class="ab  btn-sm  btn btn-dark  btn-light;"    value=` + value[key] + `>` + value[key] +
  //               `</button>`;




  //             // this.Appendbutton.push({button: Buttons,button1: initials,buttonname: value[key]});

  //             this.Appendbutton.push({ button: Buttons, buttonornot: this._header[key1].action == 'button', button1: 'NULL', iconname: this._header[key1].iconname, buttonname: value[key], final_disposition: value[key] });

  //           }
  //           else {
  //             const initials = value[key].split(' ').map(s => String.fromCodePoint(s.codePointAt(0) || '').toUpperCase()).join('');
  //             (initials);

  //             const Buttons = `<button class="ab  btn-sm  btn btn-dark  btn-light;"    value=` + value[key] + `>` + value[key] +
  //               `</button>`;
  //             // this.Appendbutton.push({button: Buttons,button1: initials,buttonname: value[key]});

  //             this.Appendbutton.push({ button: Buttons, button1: Buttons, buttonornot: this._header[key1].action == 'button', initials, iconname: this._header[key1].iconname, buttonname: value[key], buttonheader: this._header[key1].headerName, final_disposition: value[key], call_h_id: value[key] });

  //           }


  //         }


  //         if (this._header[key1].fielddata == 'headerName') {
  //           const Buttons = `<button class="ab  btn-sm  btn btn-dark  btn-light;"    value=` + this._header[key1].headerName + `>` + this._header[key1].headerName +
  //             `</button>`;
  //           const firstWord = this._header[key1].headerName.split(' ')[0];
  //           const output = firstWord[0][0] + firstWord[1][0];

  //           // this.Appendbutton.push({button: Buttons,button1: output,buttonname:this._header[key1].headerName});

  //           this.Appendbutton.push({ button: Buttons, button1: Buttons, buttonornot: this._header[key1].action == 'button', iconname: this._header[key1].iconname, buttonname: this._header[key1].headerName, buttonheader: this._header[key1].headerName, call_h_id: value[key], });

  //         }

  //       }

  //     }

  //   }

  //   return this.Appendbutton;

  // }



  transformHeader1(value): any {
    // value = ['1', '2', '3'];\


    let Buttons: any = [];
    const keys = [];
    for (const key1 in this._header) {
      for (const key in value) {

        // Object.entries(this.changeHeader).forEach(([key1, value1]) =>

        this.changeHeader;

        if (key == this._header[key1].field) {


          if (this._header[key1].ignore == 'yes') {

          }
          else {




            Buttons = `<button class="ab  btn-sm  btn btn-dark  btn-light;"    value=` + this._header[key1].data_root + `>` + this._header[key1].headerName +
              `</button>`;



            keys.push({ key: this._header[key1].headerName, button: Buttons, value: value[key], data_action_type: this._header[key1].data_action_type, data_root: this._header[key1].data_root, okey: key });

          }
        }
      }

    }


    return keys;
  }






  // emit pagintion click
  // pagination funtion click
  First() {
    for (let i = 0; i < this.dataforgrid.length; i++) {

      this.emitclickdata.emit(this.pager);

      break;
      // alert("hii")

    }
  }
  Previous() {

    for (let i = this.dataforgrid.length; i--;) {
      this.pager = this.db.getPager(this._data.length, this.page, this.pagesize);

      this.emitclickdata.emit(this.pager);

      break;
    }

  }
  Next() {
    for (let i = 0; i < this.dataforgrid.length; i++) {

      this.pager = this.db.getPager(this._data.length, this.page, this.pagesize);
      this.emitclickdata.emit(this.pager);
      break;
    }
  }
  Last() {

    for (let i = this.dataforgrid.length; i--;) {
      this.pager = this.db.getPager(this._data.length, this.page, this.pagesize);

      // alert("hii")
      // this.emitclickdata.emit()

      this.emitclickdata.emit(this.pager);

      break;
    }
  }

  // sorting table data
  sortData(page: number, active, direction, pagesize) {
    const sort = ({ active, direction });

    if (pagesize === undefined || pagesize == 'undefined') {

      pagesize = this.pagesize;

    }
    this.pagesize = pagesize;

    // if (this.pagechanged === true) {
    //   this.pagechanged = false;
    // }
    this.transformBody1(this.dataforgrid);

    if (this.check_selected === true) {
      this.SelectPageWise(this.dataforgrid, 'id');
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

    // this.joy(this.dataforgrid);

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
    // this.emitclickdata.emit(this.pager);

    if (value == true) {
      this.onHeaderClicked.emit(this.pager);
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
  // end of pagination











  // printing the button
  transformBody1(value) {

    const text = '';
    const keys = [];
    this.Appendbutton = [];
    this.abbreviations = [];
    this.header = this._header;

    for (const key in value) {


      for (const key1 in this._header) {
        if (key == this._header[key1].field) {

          // if(this._header[key1].action=="button"  )
          // {

          if (this._header[key1].fielddata == 'field') {



            const initials = value[key].split(' ')
              .map(s => String.fromCodePoint(s.codePointAt(0) || '').toUpperCase())
              .join('');
            const Buttons = `<button class="ab  btn-sm  btn btn-dark  btn-light;"    value=` + value[key] + `>` + value[key] +
              `</button>`;




            this.Appendbutton.push({ button: Buttons, button1: initials, buttonname: value[key] });
          }

          if (this._header[key1].fielddata == 'headerName') {
            const Buttons = `<button class="ab  btn-sm  btn btn-dark  btn-light;"    value=` + this._header[key1].headerName + `>` + this._header[key1].headerName +
              `</button>`;
            const firstWord = this._header[key1].headerName.split(' ')[0];
            const output = firstWord[0][0] + firstWord[1][0];

            this.Appendbutton.push({ button: Buttons, button1: Buttons, buttonname: this._header[key1].headerName });
          }
        }

      }

    }
    return this.Appendbutton;
  }

  onHeaderClick(evt) {
    this.onHeaderClicked.emit(evt);
  }

  // funtion for getting the feild data from _header array  for the button
  buttondetails(evt, value, buttonname): any {
    const keys = [];

    for (const key in value) {



      for (const key1 in this._header) {


        if (key == this._header[key1].field) {

          if (this._header[key1].action == 'button') {

            if (value[key] == buttonname) {
              if (this._header[key1].fielddata == 'field') {

                keys.push({ key: this._header[key1].headerName, value: value[key], action: this._header[key1].action, okey: key });


                this.emitbuttondata.emit({ buttondetails: keys, data: value });
                break;

              }

            }
            if (this._header[key1].fielddata == 'headerName') {
              keys.push({ key: this._header[key1].headerName, value: value[key], action: this._header[key1].action, okey: key });



              this.emitbuttondata.emit({ buttondetails: keys, data: value });
              break;
            }
          }
        }


      }

    }


    return keys;

  }









  // funtion for printing the thead table data
  transformHeader(value,): any {


    const keys = [];
    this.header = this._header;
    for (const key1 in this._header) {
      for (const key in value) {




        if (key == this._header[key1].field) {
          if (this._header[key1].headerName == 'StarIcon') {

            if (this._header[key1].hide == 'true') {
              this.isShown1 = !this.isShown1;
            }
            if (this._header[key1].hide == 'false') {

              this.isShown1 = this.isShown1;
            }
          }
          if (this._header[key1].headerName == 'Checkbox' || this._header[key1].headerName == 'Icon' || this._header[key1].headerName == 'image' || this._header[key1].headerName == 'todo') {

          }
          else {
            keys.push({ key: this._header[key1].headerName, okey: key });
          }
        }
      }

    }

    return keys;
  }

  // onclick(buttonname, id, item) {

  //   // this.emitbuttondataclick.emit({ button: buttonname, id });
  //   this.emitbuttondataToReport.emit({ data: item, header: buttonname, id: id });

  // }

  // onRowClicked(evt, value, headername, val) {


  //   this.emitbuttondataToReport.emit({ data: value, header: headername, id: value.id });

  // }


  onClick(evt:any, entry:any, item:any) {
    // console.log('show flow',item);
    // debugger;
    this.onRowClicked.emit({ data: item, entry: entry, evt: evt });
    // window.location.href = 'campaign/flow/52';
  }




  // deselect the checkbox
  deselectall(obj: any, id = 'id', selected1 = 'selected1', checkfalse = 'checkfalse') {

    this._ids = [];

    for (const key in this._data) {
      if (key) {
        if (this._data[key][selected1] === true) {
          this.count--;
          this._data[key][selected1] = false;
          // this._data[key][checkfalse] = false;
        }
        //  else if (this._data[key][id] === data && this._data[key][selected1] === false) {
        //   this._data[key][selected1] = true;
        //   this.count++;
        // }
      }
    }
  }
  // export the data selected
  setfinalallexportdata(objdata) {
    this.finalexportdata = [];

    this.finalexportdata.push(objdata);

    // for (const datakey in objdata) {

    //     // const trest = objdata[datakey].isSelected;

    //     if(datakey=='isSelected')
    //     {
    //
    //     if (objdata.isSelected == true) {
    //
    //       this.finalexportdata.push(objdata);
    //
    //     }

    //   }
    // }
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
      // this.setfinalallexportdata(this._data);

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





  // funtion dynamically getting the field data for the  checkbox
  transformbodycheck(value) {

    const keysCK = [];
    const keyck1 = [];
    for (const key in value) {
      Object.entries(this.changeHeader).forEach(([key1, value1,]) => {

        if (key == value1) {

          if (key1 == 'Checkbox') {
            keysCK.push({ key: key1, value: value[key], okey: key });
          }
        }
      });

    }

    return keysCK;
  }



  selectionboxpagewise(evt, data1, obj: any, id = 'id', call_h_id = 'call_h_id', selected1 = 'selected1', checkfalse = 'checkfalse') {
    let keysCK: any = [];
    // evt.currentTarget.checked

    data1 = this._header;
    keysCK = this.transformbodycheck(obj);
    //  keysCK.value
    const a = obj;
    for (const key in keysCK) {
      for (const key in data1) {
        if (data1[key].headerName === 'Checkbox') {
          if (keysCK[key].key == 'Checkbox') {

            const data = keysCK[key].value;
            // const data = obj.id;
            if (this.selectedpage === false) {

              const iddata = this._ids.some(function (el) { return el.id === data; });

              // const iddata=false;
              // const iddata = this._ids.find(ob => ob.id == data);
              if (iddata === false) {
                this.count++;

                this.exportsingledata.push(obj);

                for (const keyforinsert in this.dataforgrid) {

                  if (keyforinsert) {

                    if (this.exportsingledata[keyforinsert][id] === data) {
                      this.exportsingledata[keyforinsert][selected1] = true;
                      break;
                    }
                    if (this.exportsingledata[keyforinsert][call_h_id] === data) {
                      this.exportsingledata[keyforinsert][selected1] = true;
                      break;
                    }
                  }
                }

                this._ids.push({ id: data, selected1: true });

                // this.setfinalexportdata(this.exportsingledata);

                this.db.SelectedSingleIds(this._ids);

              } else if (iddata === true) {

                for (const objid in this._ids) {
                  if (objid) {

                    if (this._ids[objid][id] === data && this._ids[objid][selected1] === true) {

                      this.exportsingledata[objid][selected1] = false;
                      this._ids[objid][selected1] = false;

                      this.db.SelectedSingleIds(this._ids);
                      this.count--;

                      // this.resetexportdata(this.count);

                      // this.setfinalexportdata(this.exportsingledata);

                      return;

                    }

                    if (this._ids[objid][id] === data && this._ids[objid][selected1] === false) {
                      this.count++;

                      this.exportsingledata[objid][selected1] = true;

                      this._ids[objid][selected1] = true;
                      this.db.SelectedSingleIds(this._ids);
                      // this.setfinalexportdata(this.exportsingledata);
                      return;
                      // exit
                    }
                  }
                }
              }
            } else {

              // for (const key in this.dataforgrid)
              for (let i = 0; i < this.dataforgrid.length; i++) {

                if (i) {

                  if (this.dataforgrid[i][id] === data && this.dataforgrid[i][selected1] === true) {
                    this.count--;
                    this.dataforgrid[i][selected1] = false;
                    this.dataforgrid[i][checkfalse] = false;

                  }

                  if (this.dataforgrid[i][call_h_id] === data && this.dataforgrid[i][selected1] === true) {
                    this.count--;
                    this.dataforgrid[i][selected1] = false;
                    this.dataforgrid[i][checkfalse] = false;

                  }
                  else if (this.dataforgrid[i][id] === data && this.dataforgrid[i][selected1] === false) {

                    this.dataforgrid[i][selected1] = true;
                    this.count++;

                  }
                  else if (this.dataforgrid[i][call_h_id] === data && this.dataforgrid[i][selected1] === false) {

                    this.dataforgrid[i][selected1] = true;
                    this.count++;

                  }
                }
              }

              // this.setfinalexportdata(this._data);

              this.db.allselectedids(this._data);

              this.callfunction(this._data);
              const changeddata = this._data;
              this._data = changeddata;
            }
          }
        }
      }
    }

  }
















  callfunction(data) {
    this._data = data;
    return this._data;
  }






  setfinalexportdata(objdata) {
    //

    this.finalexportdata = [];

    for (const datakey in objdata) {
      if (datakey) {

        const trest = objdata[datakey].selected1;
        if (objdata[datakey].selected1 == true) {
          this.finalexportdata.push(objdata);

        }
      }
    }
  }







  // isSingleSelected(obj, data) {

  //     this.id1 = [];

  //     this.finalexportdata = [];
  //     const datakey: any = [];

  //     // this.setfinalexportdata(this.StoreisSingleSelected);
  //     for (let i = 0; i < this.candidatestatus.length; i++) {

  //       for (let j = 0; j < this.candidatestatus[i].length; j++) {
  //         if (this.candidatestatus[i][j].headername == 'Checkbox') {

  //           this.id1.push({ id: this.candidatestatus[i][j].value, selected: this.candidatestatus[i][j].isSelected });

  //           const a = this.candidatestatus[i][j].isSelected == true;

  //           if (a == true) {

  //             // alert(JSON.stringify(this.candidatestatus[i][j]));

  //             this.finalexportdata.push(this.candidatestatus[i]);

  //             this.setfinalexportdata(this.finalexportdata);

  //           }



  //         }


  //       }

  //     }


  //     // // console.log('start');


  //     this.db.allselectedids(this.id1);


  //     if (this.candidatestatus.length === this.db.idscheckbox.length) {
  //       this.masterSelected = true;
  //     } else {
  //       this.masterSelected = false;
  //     }
  //     this.exportdataxl(obj);
  //     this.count = this.db.idscheckbox.length;


  //     this.getCheckedItemList();
  //   }


  // exportdataxl(data) {
  //   this.candidatestatus;

  // }


  // getCheckedItemList() {
  //   this.checkedList = [];
  //   for (let i = 0; i < this.candidatestatus.length; i++) {
  //     for (let j = 0; j < this.candidatestatus[i].length; j++) {

  //       if (this.candidatestatus[i][j].isSelected) {

  //         this.checkedList.push(this.candidatestatus[i][j]);
  //       }

  //     }
  //   }
  // }



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
  exportAsXLSX() {

    const keyvalue: any = [];

    const store: any = [];

    const res = {};
    // this.excelService.exportAsExcelFile(this._header, 'excel_data');

    this.exportdata = [];


    this.StoredataXlInformation;

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
    this.finalexportdata = [];
  }
}


function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

function evt(evt: any, data: any) {
  throw new Error('Function not implemented.');
}

