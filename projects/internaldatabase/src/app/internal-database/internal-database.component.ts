import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../../../../../src/app/services/db.service';

declare var $: any;

@Component({
  selector: 'app-internal-database',
  templateUrl: './internal-database.component.html',
  styleUrls: ['./internal-database.component.scss'],
})
export class InternalDatabaseComponent implements OnInit {
  constructor(public db: DbService, private router: Router) {}

  static columnDefs: any;
  static columnDefsexcel: any;

  paginationNumberFormatter: (params: any) => string;
  paginationPageSize: number;
  pageSizee: any;
  clients: any = [];
  addtojob: any = {};
  sendemailmodel: any = {};
  copycandidate: any = {};
  myjob: any = {};
  currentData = {};
  sms: any = {};
  addnewjob: any = {};
  profile: any = {};
  store: any = {};
  datas: any;
  emailselected: any = {};
  smsselected: any = {};
  showInternaldatagrid = false;
  hideInternaldata = true;
  hidecols = [
    'id',
    'skillSet',
    'country',
    'state',
    'city',
    'phoneNo',
    'mobile2',
    'noticePeriod',
    'nationality',
    'visaType',
    'remark',
    'panNo',
    'address',
    'industryType',
    'source',
    'resume',
    'cvhtml',
    'app_id',
    'ipAddress',
    'cvstatus',
    'naukri_url',
    'data_source',
    'customdata',
    'created_at',
    'iswalkin',
    'interview_timing',
    'iscareersite',
    'already_called',
    'updated_at',
    'is_click_link',
    'linkedin_leads',
    'interview_avialibility',
    'interviewed_in_past',
    'date_time',
    'job_id',
    'isfilegenerated',
    'selected',
  ];

  candidate_filtered: any;

  totalItems = 0;
  rowData = [];

  bgColor = 'grey';
  bgColor1 = 'purple';
  isOrange = false;
  isOrange1 = false;
  allids = [];
  searchText: any;
  andsearch = '';
  orsearch = '';
  notsearch = '';
  checksearch = '';
  isPager = false;
  totalpage = [];
  getsalary: any;
  advancesearch = false;
  hidesearch = true;
  booleansearch: boolean;
  search: any;
  salaryfrom: number = 0;
  salaryto: number = 99;
  expfrom: number = 0;
  expto: number = 99;
  showInternaldatagridboolean = false;
  showexcelgrid = false;
  shownormalgrid = false;
  databoolean: any;
  location: any;
  candidatelocation: any;
  locationcnd: any;
  objArray: any;
  locationtype: string;
  private content: string;
  public query: string;
  gridfromet: any;
  checkpage: string;
  minimumSalaryOption = [];
  minimumSalaryOptionink = [];
  maximumSalaryOptionink: any[];
  minexperience: any[];
  maxSalaryOption = [];
  maxexperience = [];
  locationss: any;
  setpage: any = 20;
  startIndex: any = 0;
  EndIndex1: any = 20;

  currDiv = 'option1';
  currDiv1 = 'option2';
  toggle = true;
  toggle1 = true;
  status = 'Enable';
  status1 = 'Enable';

  ngOnInit() {
    this.minimumSalaryOptionSet();

    this.checkpage = 'internaldatabase';
    if (this.checkpage == localStorage['page_name']) {
      localStorage.setItem('page', '1');
    }
    this.advancesearch = true;
    this.loadlocation();
  }

  minimumSalaryOptionSet(): void {
    for (let kk = 0; kk < 51; kk++) {
      this.minimumSalaryOption.push(kk);
    }

    this.minimumSalaryOptionink = [];

    for (let kk = 0; kk < 10; kk++) {
      const ii = 10;
      const jj = kk * ii;

      this.minimumSalaryOptionink.push(jj);
    }

    this.maximumSalaryOptionink = [];

    for (let kk = 0; kk < 10; kk++) {
      const ii = 10;
      const jj = kk * ii;

      this.maximumSalaryOptionink.push(jj);
    }

    this.minexperience = [];
    for (let jj = 1; jj < 31; jj++) {
      this.minexperience.push(jj);
    }
  }

  updatemaxsalary(): void {
    let kk = 0;
    this.maxSalaryOption = [];
    kk = this.salaryfrom;
    for (; kk < 51; kk++) {
      this.maxSalaryOption.push(kk);
    }
  }
  updatemaxexperience(): void {
    this.maxexperience = [];
    let j = 1;
    j = this.expfrom;
    // if (this.expfrom == '\'Fresher\'') {
    //   j = 1;
    // }
    for (; j < 31; j++) {
      this.maxexperience.push(j);
    }
  }
  ShowgridExcle(): void {
    this.showexcelgrid = true;
    this.shownormalgrid = false;
  }
  ShowgridNormal(): void {
    this.showexcelgrid = false;
    this.shownormalgrid = true;
  }
  callModal() {
    $('#addcandidate').appendTo('body').modal('show');
    // $('#addcandidate').reveal({ // The item which will be opened with reveal
    //      animation: 'fadeAndPop',      // fade, fadeAndPop, none
    //      animationspeed: 5000,         // how fast animtions are
    //      closeonbackgroundclick: true, // if you click background will modal close?
    //      dismissmodalclass: 'close'    // the class of a button or element that will close an open modal
    //      });
  }

  loadlocation(): void {
    this.locationtype = 'location';
    this.location = [];
    this.db.list('location', null, (response): void => {
      const data = response;
      for (const j in data) {
        if (data[j]) {
          this.location.push(data[j].location);
        }
      }
    });
  }
  loadSearchAdvance(divVal: string): void {
    if (divVal == this.currDiv1) {
      this.toggle1 = !this.toggle;
      this.status1 = this.toggle1 ? 'Disable' : 'Enable';
      this.toggle = !this.toggle;
      this.status = this.toggle ? 'Disable' : 'Enable';
    }

    this.advancesearch = true;
    this.booleansearch = false;
    this.hideInternaldata = true;
    this.showInternaldatagrid = false;
    this.showInternaldatagridboolean = false;
  }
  changeBackground(divVal: string): any {
    if (divVal == this.currDiv || divVal == this.currDiv1) {
      // return { 'color': 'white' };
    } else {
      // return { 'color': '#a64eed' };
      // return { 'color': 'black' };
    }
  }
  loadSearchBoolean(divVal: string): void {
    // this.toggle1 = !this.toggle1;

    if (divVal == this.currDiv) {
      this.toggle1 = !this.toggle;
      this.status1 = this.toggle1 ? 'Disable' : 'Enable';
      this.toggle = !this.toggle;
      this.status = this.toggle ? 'Disable' : 'Enable';
    }

    // this.isOrange = !this.isOrange;
    // this.isOrange1 = !this.isOrange1;

    this.advancesearch = false;
    this.booleansearch = true;
    this.hideInternaldata = true;
    this.showInternaldatagrid = false;
    this.showInternaldatagridboolean = false;
  }

  public loadGridboolean(): void {
    const locations = this.locationss;
    let locationstr = '';
    let isfirstlocation = true;
    // const j = 0;

    for (const j in locations) {
      //  if ( locations[j]) {
      if (locations[j].$ngOptionLabel) {
        if (isfirstlocation) {
          locationstr += locations[j].$ngOptionLabel;
          isfirstlocation = false;
        } else {
          locationstr += ',' + locations[j].$ngOptionLabel;
        }
      } else {
        locationstr += locations[j] + ',';
      }
      // }
    }
    if (locationstr) {
      locationstr = locationstr.replace(/,\s*$/, '');
    }
    if (locationstr == 'undefined') {
      locationstr = this.location[0];
    }

    this.locationcnd = locationstr;

    if (
      (this.searchText === '' || this.searchText == 'undefined') &&
      (this.locationcnd === '' || this.locationcnd === undefined) &&
      (this.salaryfrom === null || this.salaryto === null) &&
      (this.expfrom === null || this.expto === null)
    ) {
      this.db.addmessageandremove('Please Insert data to search');
      // this.db.showMessage('Please Insert data to search');
    } else {
      // this.loadbooleanInternalData();

      const urlboolean = this.router.createUrlTree([
        'internaldatabaseboolean/booleansearch',
        {
          searchText: this.searchText,
          salaryfrom: this.salaryfrom,
          salaryto: this.salaryto,
          expfrom: this.expfrom,
          expto: this.expto,
          locationcnd: this.locationcnd,
        },
      ]);
      window.open(urlboolean.toString(), '_blank');
    }
  }

  public loadGrid(): void {
    const locations = this.locationss;
    let locationstr = '';
    let isfirstlocation = true;
    // const j = 0;
    for (const j in locations) {
      //  if ( locations[j]) {
      if (locations[j].$ngOptionLabel) {
        if (isfirstlocation) {
          locationstr += locations[j].$ngOptionLabel;
          isfirstlocation = false;
        } else {
          locationstr += ',' + locations[j].$ngOptionLabel;
        }
      } else {
        locationstr += locations[j] + ',';
      }
      // }
    }
    if (locationstr) {
      locationstr = locationstr.replace(/,\s*$/, '');
    }
    if (locationstr == 'undefined') {
      locationstr = this.location[0];
    }
    this.locationcnd = locationstr;

    if (
      this.andsearch === '' &&
      this.orsearch === '' &&
      (this.locationcnd === '' || this.locationcnd === undefined) &&
      (this.salaryfrom === null || this.salaryto === null) &&
      (this.expfrom === null || this.expto === null)
    ) {
      // this.db.showMessage('Please Insert data to search');
      this.db.addmessageandremove('Please Insert data to search');
    } else {
      const urladvance = this.router.createUrlTree([
        'internaldatabaseadvance/advancesearch',
        {
          orsearch: this.orsearch,
          andsearch: this.andsearch,
          locationcnd: this.locationcnd,
          salaryfrom: this.salaryfrom,
          salaryto: this.salaryto,
          expfrom: this.expfrom,
          expto: this.expto,
          startIndex: this.startIndex,
          EndIndex: this.EndIndex1,
          setpage: this.setpage,
        },
      ]);
      window.open(urladvance.toString(), '_blank');
    }
  }
  openmodal(modalname) {
    $(modalname).appendTo('body').modal('show');
  }
}
