import { Component, OnInit, TemplateRef, ViewChild  } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { MatDialog } from '@angular/material/dialog';

declare var $: any;
declare var window:any;


@Component({
  selector: 'app-internal-database-search',
  templateUrl: './internal-database-search.component.html',
  styleUrls: ['./internal-database-search.component.scss']
})

export class InternalDatabaseSearchComponent implements OnInit {
  rowData: any[];
  locationcnd: any;
  andsearch: any;
  orsearch: any;
  notsearch: any;
  salaryfrom: any;
  salaryto: any;
  expfrom: any;
  expto: any;
  searchText: any;
  datas: any;

  hidecols = ['id', 'recruiter_id', 'callto', 'chat_conv_done', 'recruitershow', 'call_id',
    'call_updated_at', 'child_id', 'call_port',
    'is_validated', 'first_skill', 'second_skill', 'third_skill', 'jobid', 'job_title', 'updated_at',
    'currentDesignation', 'selected', 'usname', 'noticePeriod', 'skillSet'
    , 'campaign_name', 'final_skill1', 'conversation_day1', 'final_skill2', 'final_skill3', 'is_amcat_done'
    , 'recruiter', 'candidate_status', 'currentOrganization', 'qualification', 'recruitername', 'final_disposition',
    'final_gram_check_perc', 'final_gram_check_perc2', 'final_avg_rating', 'location', 'call_status_day1', 'call_status_day3', 'Recording1',
    , 'career_id', 'Recording2', 'fromSubmitTime', 'apply_again', 'call_port', 'call_status_day1', 'totalcandidate'
  ];


  DataDefinitions = [
    { headerName: 'Checkbox', field: 'id', type: 'checkbox', print: 'heading' },
    { headerName: 'candidate Name', field: 'candidate_name', type: 'text', style: 'font-size:15px;', class: 'mt-1', tag: 'span', print: 'headingleft' },
    { headerName: 'Contact number', field: 'mobileNo', type: 'texticon', iconname: 'number.svg', size: 'col-md-4', tag: 'span', print: 'bodyleft' },
    { headerName: 'Email', field: 'email', type: 'texticon', iconname: 'Email.svg', tag: 'span', size: 'col-md-4', print: 'bodyleft' },
    { headerName: 'Current Salary', field: 'currentSalary', type: 'texticon', iconname: 'Salary.svg', size: 'col-md-4', tag: 'span', print: 'bodyleft' },
    { headerName: 'currentOrganization', field: 'currentOrganization', type: 'texticon', iconname: 'organization.svg', size: 'col-md-4', print: 'bodyleft' },
    { headerName: 'Candidate Details', field: 'final_disposition', type: 'button', tag: 'button', class: 'btn btn-sm', print: 'bodyright', size: 'col-md-12' },
    { headerName: 'Detailed Report', field: 'call_h_id', type: 'showheader', tag: 'button', print: 'bodyright', size: 'col-md-12', class: 'btn btn-sm' },
    { headerName: 'CallID', field: 'call_h_id', type: 'texticon', tag: 'span', size: 'col-md-4', iconname: 'call id.svg', print: 'bodyleft' },
    { headerName: 'call_updated_at', field: 'call_updated_at', size: 'col-md-4', type: 'texticon', tag: 'span', iconname: 'date-and-time 1.svg', print: 'bodyleft' },
    { headerName: 'candidateProfile', field: 'candidate_name', type: 'iconimagesmall', iconname: 'Resume.svg', style: 'font-weight: bold; font-size:15px;', class: 'mt-1', tag: 'span', print: 'headingleft', size: 'col-md-3' },
    { headerName: 'candidateProfile', field: 'candidate_name', type: 'iconimagelarge', iconname: 'akar-icons_whatsapp-fill.svg', style: 'font-weight: bold; font-size:15px;', class: 'pull-right', tag: 'span', print: 'headingright', size: 'pull-right' },
    { headerName: 'Skill Set:', field: 'skillSet', type: 'heardertext', style: 'font-size:15px; margin-left:-4%;', class: 'pull-left col-md-11', tag: 'span', print: 'bodybottom', size: 'row', headertag: 'span', headerclass: 'col-md-1', headerstyle: 'font-weight: bold; color:#a64eed' },
  ];

  
  employeeId: any;
  state$: any;
  limitstartIndex: any = 0;
  limitendIndex: any = 20;
  activatedRoute: any;
  advancesearch = false;
  booleansearch = false;
  show: any = [];
  locationtype: string;
  minimumSalaryOption = [];
  minimumSalaryOptionink = [];
  maximumSalaryOptionink: any[];
  minexperience: any[];
  maxSalaryOption = [];
  maxexperience = [];
  location: any[];
  locationss: any;
  allids: any;
  setpage: any;
  startIndex: any;
  EndIndex: any;
  constructor(public db: DbService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {

    this.startIndex = this.route.snapshot.paramMap.get('startIndex');
    this.EndIndex = this.route.snapshot.paramMap.get('endIndex');
    this.setpage = this.route.snapshot.paramMap.get('setpage');

    this.minimumSalaryOptionSet();
    this.loadlocation();

    const advancesearchdata = this.route.snapshot.paramMap.get('advancesearch');
    if (advancesearchdata != null) {
      this.loadInternaladvancesearchData(advancesearchdata);
    }

    const booleansearchdata = this.route.snapshot.paramMap.get('booleansearch');
    if (booleansearchdata != null) {
      this.loadInternalbooleansearchData(booleansearchdata);
    }
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
    if (this.expfrom == '\'Fresher\'') {
      j = 1;
    }
    for (; j < 31; j++) {
      this.maxexperience.push(j);
    }
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



  loadInternaladvancesearchData(advancesearchdata: string): void {
    
    this.advancesearch = true;
    const advancedata = advancesearchdata.split('&');
    if (advancesearchdata == '&&&&&&&') {
      window.close();
    }
    if (advancesearchdata == 'advancesearch') {
      this.orsearch = this.route.snapshot.paramMap.get('orsearch');
      this.andsearch = this.route.snapshot.paramMap.get('andsearch');
      // this.notsearch = this.route.snapshot.paramMap.get('advancesearch');
      this.salaryfrom = this.route.snapshot.paramMap.get('salaryfrom');
      this.salaryto = this.route.snapshot.paramMap.get('salaryto');
      this.expfrom = this.route.snapshot.paramMap.get('expfrom');
      this.expto = this.route.snapshot.paramMap.get('expto');
      this.locationcnd = this.route.snapshot.paramMap.get('locationcnd');
      this.locationss = this.locationcnd.toString().split(',');
      // this.limitstartIndex = this.route.snapshot.paramMap.get('startIndex');
      // this.limitendIndex = this.route.snapshot.paramMap.get('setpage');
    }




    this.rowData = [];
    if (true) {


      
      this.db.list('showdata/', { andsearch: this.andsearch, orsearch: this.orsearch, notsearch: this.notsearch, salaryfrom: this.salaryfrom, salaryto: this.salaryto, expfrom: this.expfrom, expto: this.expto, candidatelocation: this.locationcnd, startindex: this.limitstartIndex, endindex: this.limitendIndex }, ((response): void => {

        this.rowData = response;
        this.datas = response;

      }));
    }

  }

  loadInternalbooleansearchData(booleansearchdata: string): void {

    this.booleansearch = true;
    const advancedata = booleansearchdata.split('&');
    if (booleansearchdata == '&&&&&') {
      window.close();
    }
    this.searchText = this.route.snapshot.paramMap.get('searchText');
    this.salaryfrom = this.route.snapshot.paramMap.get('salaryfrom');
    this.salaryto = this.route.snapshot.paramMap.get('salaryto');
    this.expfrom = this.route.snapshot.paramMap.get('expfrom');
    this.expto = this.route.snapshot.paramMap.get('expto');
    this.locationcnd = this.route.snapshot.paramMap.get('locationcnd');
    this.locationss = this.locationcnd.toString().split(',');

    if (true) {
      // const locations = this.locationcnd;
      // let candidatelocation = '';
      // for (const j in locations) {
      //   if (locations[j]) {
      //     candidatelocation += locations[j].$ngOptionLabel + ',';

      //   }
      //   this.locationcnd = candidatelocation;
      // }
      this.db.list('showdataboolean/', { searchText: this.searchText, candidatelocation: this.locationcnd, salaryfrom: this.salaryfrom, salaryto: this.salaryto, expfrom: this.expfrom, expto: this.expto, startindex: this.limitstartIndex, endindex: this.limitendIndex }, ((response): void => {

        this.rowData = response;
        this.datas = response;

      }));
    }
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
        }

        else {
          locationstr += ',' + locations[j].$ngOptionLabel;
        }
      }
      else {
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

    if ((this.searchText === '' || this.searchText == 'undefined') && (this.locationcnd === '' || this.locationcnd === undefined) &&
      (this.salaryfrom === '' || this.salaryto === '') && (this.expfrom === '' || this.expto === '')) {
      this.db.addmessageandremove('Please Insert data to search');
      this.db.showMessage('Please Insert data to search');

    }
    else {

      // this.loadbooleanInternalData();
      this.router.navigate(['internaldatabaseboolean/booleansearch', { searchText: this.searchText, salaryfrom: this.salaryfrom, salaryto: this.salaryto, expfrom: this.expfrom, expto: this.expto, locationcnd: this.locationcnd, }]);
      setTimeout(function () {
        window.location.reload();
      }, 500);
    }

  }

  datfromprgrid(evt) {

    this.limitstartIndex = evt.startIndex;
    this.limitendIndex = evt.pageSize;

    // this.router.navigate(['internaldatabaseadvance/advancesearch', { orsearch: this.orsearch, andsearch: this.andsearch, locationcnd: this.locationcnd, salaryfroma: this.salaryfrom, salarytoa: this.salaryto, expfroma: this.expfrom, expto: this.expto, startIndex: this.limitstartIndex, endIndex: this.limitendIndex, setpage: evt.pageSize }]);

    this.loadInternaladvancesearchData('advancesearch');

  }



  OnRowclicked(evt) {

    switch (evt.headername) {
      case 'candidateProfile':
        const url = '/candidate/' + evt.fulldata.id;
        window.open(url, '_blank');
        break;
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
        }

        else {
          locationstr += ',' + locations[j].$ngOptionLabel;
        }
      }
      else {
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

    if ((this.andsearch === '') && (this.orsearch === '') &&
      (this.locationcnd === '' || this.locationcnd === undefined) && (this.salaryfrom === '' || this.salaryto === '')
      && (this.expfrom === '' || this.expto === '')) {
      this.db.showMessage('Please Insert data to search');
      this.db.addmessageandremove('Please Insert data to search');
    }
    else {

      this.router.navigate(['internaldatabaseadvance/advancesearch', { orsearch: this.orsearch, andsearch: this.andsearch, locationcnd: this.locationcnd, salaryfrom: this.salaryfrom, salaryto: this.salaryto, expfrom: this.expfrom, expto: this.expto, startIndex: this.startIndex, endIndex: this.EndIndex, setpage: this.setpage }]);
      // this.reloadpage();
      this.loadInternaladvancesearchData('advance');
      // setTimeout(function () {
      //   window.location.reload();
      // }, 500);
    }
  }

  resetfilter(): void {
    this.orsearch = '';
    this.salaryfrom = '';
    this.salaryto = '';
    this.expto = '';
    this.expfrom = '';
    this.locationss = '';
    this.andsearch = '';
    this.searchText = '';
    // this.router.navigate(['internaldatabase']);
  }
  openmodal(modalname) {
    
    $(modalname).appendTo('body').modal('show');

  }

  hidemodal(modalname) {
    $(modalname).appendTo('body').modal('hide');

  }


  openSearchDialog(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }

}
