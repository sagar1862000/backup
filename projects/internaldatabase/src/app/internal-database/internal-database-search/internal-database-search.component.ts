import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { isArray } from 'jquery';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { inject } from '@angular/core';
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipsModule,
} from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InternalDatabaseService } from '../../inernal-databaseservice.service';
declare var $: any;
declare var window: any;

export interface ANY {
  name: string;
}

export interface ALL {
  name: string;
}

export interface NOT {
  name: string;
}

export interface Fruit {
  name: string;
}

export interface Skill {
  name: string;
}

export interface qualification {
  name: string;
}

export interface industryType {
  name: string;
}

export interface location {
  name: string;
}

@Component({
  selector: 'app-internal-database-search',
  templateUrl: './internal-database-search.component.html',
  styleUrls: ['./internal-database-search.component.scss'],
})
export class InternalDatabaseSearchComponent implements OnInit {
  showFiller = false;
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
  counts: any;

  mobileQuery: MediaQueryList;

  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from(
    { length: 50 },
    () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
  );

  private _mobileQueryListener: () => void;

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(
    window.location.host
  );

  hidecols = [
    'id',
    'recruiter_id',
    'callto',
    'chat_conv_done',
    'recruitershow',
    'call_id',
    'call_updated_at',
    'child_id',
    'call_port',
    'is_validated',
    'first_skill',
    'second_skill',
    'third_skill',
    'jobid',
    'job_title',
    'updated_at',
    'currentDesignation',
    'selected',
    'usname',
    'noticePeriod',
    'skillSet',
    'campaign_name',
    'final_skill1',
    'conversation_day1',
    'final_skill2',
    'final_skill3',
    'is_amcat_done',
    'recruiter',
    'candidate_status',
    'currentOrganization',
    'qualification',
    'recruitername',
    'final_disposition',
    'final_gram_check_perc',
    'final_gram_check_perc2',
    'final_avg_rating',
    'location',
    'call_status_day1',
    'call_status_day3',
    'Recording1',
    ,
    'career_id',
    'Recording2',
    'fromSubmitTime',
    'apply_again',
    'call_port',
    'call_status_day1',
    'totalcandidate',
  ];

  DataDefinitions = [
    {
      headerName: 'candidate Name',
      field: 'candidate_name',
      type: 'text',
      style: 'font-weight: bold; font-size:15px;',
      class: 'mt-1',
      tag: 'span',
      print: 'headingleft',
      size: 'col-md-3',
      showxl: 'yes',
      show: 'yes',
      click: 'yes',
    },
    {
      headerName: 'Contact number',
      field: 'mobile_no',
      type: 'texticon',
      iconname: 'number.svg',
      tag: 'span',
      print: 'bodyleft',
      size: 'col-md-2',
      showxl: 'yes',
      show: 'yes',
    },
    {
      headerName: 'Email',
      field: 'email',
      type: 'texticon',
      iconname: 'Email.svg',
      tag: 'span',
      show: 'yes',
      print: 'bodyleft',
      size: 'col-md-4',
      showxl: 'yes',
    },
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

  location_len: any;
  constructor(
    public internalDb: InternalDatabaseService,
    public db: DbService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  searchdata: any;
  mylocation: any;
  orsearchArray: ANY[] = [];
  andsearchArray: ALL[] = [];
  notsearchArray: NOT[] = [];
  ngOnInit() {
    this.startIndex = this.route.snapshot.paramMap.get('startIndex');
    this.EndIndex = this.route.snapshot.paramMap.get('endIndex');
    this.setpage = this.route.snapshot.paramMap.get('setpage');
    this.salaryfrom = this.route.snapshot.paramMap.get('salaryfrom');
    this.searchText = this.route.snapshot.paramMap.get('query');
    this.salaryto = this.route.snapshot.paramMap.get('salaryto');
    this.salaryfrom = this.route.snapshot.paramMap.get('salaryfrom');
    this.expfrom = this.route.snapshot.paramMap.get('expfrom');
    this.expto = this.route.snapshot.paramMap.get('expto');
    this.limitstartIndex = this.route.snapshot.paramMap.get('startindex');
    this.limitendIndex = this.route.snapshot.paramMap.get('endindex');
    this.orsearch = this.route.snapshot.paramMap.get('orsearch');
    this.andsearch = this.route.snapshot.paramMap.get('andsearch');
    this.notsearch = this.route.snapshot.paramMap.get('notsearch');
    this.mylocation = this.route.snapshot.paramMap.get('locationcnd');
    this.location_len = this.route.snapshot.paramMap.get('location_len');
    this.searchdata = this.route.snapshot.paramMap.get('SearchType');
    this.location = this.mylocation.split(',');
    if (this.orsearch !== null) {
      let temp: string[] = [];
      temp = this.orsearch.split(',');
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].trim() !== '') {
          this.orsearchArray.push({ name: temp[i] });
        }
      }
    }
    if (this.andsearch !== null) {
      let temp: string[] = [];
      temp = this.andsearch.split(',');
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].trim() !== '') {
          this.andsearchArray.push({ name: temp[i] });
        }
      }
    }
    if (this.notsearch !== null) {
      let temp: string[] = [];
      temp = this.notsearch.split(',');
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].trim() !== '') {
          this.notsearchArray.push({ name: temp[i] });
        }
      }
    }
    this.minimumSalaryOptionSet();
    this.loadlocation();
    this.getData();
  }

  // My Code Start

  SortedData: any;
  query: any;
  isChecked: boolean;
  skills: any[] = [];
  qualifications: any[] = [];
  designations: any[] = [];
  organizations: any[] = [];
  functionalAreas: any[] = [];
  industryTypes: any[] = [];
  newChip = '';

  addAny(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if ((value || '').trim()) {
      this.orsearchArray.push({ name: value.trim() });
    }
    console.log('OrArray : ', this.orsearchArray);
    event.chipInput!.clear();
  }

  removeAny(ANY: ANY): void {
    const index = this.orsearchArray.indexOf(ANY);

    if (index >= 0) {
      this.orsearchArray.splice(index, 1);

      this.announcer.announce(`Removed ${this.orsearchArray}`);
    }
    // console.log('Any after removal : ', this.AnyArray);
  }

  editAny(ANY: ANY, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.removeAny(ANY);
      return;
    }

    const index = this.fruits.indexOf(ANY);
    if (index >= 0) {
      this.orsearchArray[index].name = value;
    }
  }

  addAll(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.andsearchArray.push({ name: value });
    }

    // console.log('All After Add : ', this.AllArray);

    event.chipInput!.clear();
  }

  removeAll(ALL: ALL): void {
    const index = this.andsearchArray.indexOf(ALL);

    if (index >= 0) {
      this.andsearchArray.splice(index, 1);
      this.announcer.announce(`Removed ${this.andsearchArray}`);
    }
    // console.log('All after removal : ', this.AllArray);
  }

  editAll(ALL: ALL, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.removeAll(ALL);
      return;
    }

    const index = this.fruits.indexOf(ALL);
    if (index >= 0) {
      this.andsearchArray[index].name = value;
    }
  }

  addNot(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.notsearchArray.push({ name: value });
    }
    // console.log('Not After Add : ', this.NotArray);
    event.chipInput!.clear();
  }

  removeNot(NOT: NOT): void {
    const index = this.notsearchArray.indexOf(NOT);
    if (index >= 0) {
      this.notsearchArray.splice(index, 1);

      this.announcer.announce(`Removed ${this.notsearchArray}`);
    }
    // console.log('Not after removal : ', this.NotArray);
  }

  editNot(NOT: NOT, event: MatChipEditedEvent) {
    const value = event.value.trim();
    if (!value) {
      this.removeNot(NOT);
      return;
    }
    const index = this.notsearchArray.indexOf(NOT);
    if (index >= 0) {
      this.notsearchArray[index].name = value;
    }
  }

  getArrayBasedOnPlaceholder(placeholder: string) {
    switch (placeholder) {
      case 'skills':
        return this.skills;
      case 'Qualification':
        return this.qualifications;
      case 'Designation':
        return this.designations;
      case 'organizations':
        return this.organizations;
      case 'functionalAreas':
        return this.functionalAreas;
      case 'industryTypes':
        return this.industryTypes;
      default:
        return [];
    }
  }

  inputData: { [key: string]: string[] } = {
    skill_set: [],
    qualification: [],
    current_designation: [],
    current_organization: [],
    functional_area: [],
    industry_type: [],
  };
  newChips: { [key: string]: string } = {};

  navItems = [
    { chips: 1, column_name: 'skill_set', placeholder: 'Skill Set' },
    { chips: 1, column_name: 'qualification', placeholder: 'Qualification' },
    {
      chips: 1,
      column_name: 'current_designation',
      placeholder: 'Current Designation',
    },
    {
      chips: 1,
      column_name: 'current_organization',
      placeholder: 'Current Organization',
    },
    {
      chips: 1,
      column_name: 'functional_area',
      placeholder: 'Functional Area',
    },
    { chips: 1, column_name: 'industry_type', placeholder: 'Industry Type' },
  ];

  addChip(event: MatChipInputEvent, columnName: string): void {
    console.log('column name : ', columnName);
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      this.inputData[columnName].push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    console.log('InputData : ', this.inputData);
    // Clear the input value in the newChips array
    this.newChips[
      this.navItems.findIndex((nav) => nav.column_name === columnName)
    ] = '';
  }

  removeChip(item: string, columnName: string): void {
    const index = this.inputData[columnName].indexOf(item);

    if (index >= 0) {
      this.inputData[columnName].splice(index, 1);
    }
  }

  updateCommaSeparatedArray(columnName: string): void {
    const inputValue =
      this.newChips[
        this.navItems.findIndex((nav) => nav.column_name === columnName)
      ];
    if (typeof inputValue === 'string' && inputValue.trim()) {
      const newItems = inputValue
        .split(',')
        .map((item) => item.trim())
        .filter((item) => item);
      this.inputData[columnName] = this.inputData[columnName].concat(newItems);
      // Clear the input value after adding new chips
      this.newChips[
        this.navItems.findIndex((nav) => nav.column_name === columnName)
      ] = '';
    } else {
      this.inputData[columnName] = [];
    }
    console.log('Entered data:', this.inputData);
  }
  OnheaderSearchClicked(type: any) {
    if (type === false) {
      this.isChecked = false;
      let selected = {
        boolean_query: this.searchText,
        minSalary: this.salaryfrom,
        maxSalary: this.salaryto,
        startDate: this.expfrom,
        endDate: this.expto,
        location:this.mylocation,
        start_index: 0,
        limit: 100,
      };
      console.log('selected : ', selected);
      this.internalDb.getdata(
        'search/boolean_query',
        selected,
        (response): void => {
          debugger;
          this.datas = response.data;
          this.tableName = response.table_name;
          this.PrimaryColumns = response.primary_column_names;
          this.FilterColumns = response.filter_column_names;
          this.PrimaryColumnsLength = response.primary_column_names.length;
          this.FilterColumnsLength = response.filter_column_names.length;
          this.query = response.sql_query;
          debugger;
          this.counts = 1026; //response.count;
        }
      );
    } else {
      const arrayOfAnyNames: string[] = this.orsearchArray.map(
        (obj) => obj.name
      );
      const arrayOfAllNames: string[] = this.andsearchArray.map(
        (obj) => obj.name
      );
      const arrayOfNotNames: string[] = this.notsearchArray.map(
        (obj) => obj.name
      );
      console.log('orsearchArray1 : ', this.orsearchArray);
      console.log('orsearchArray2 : ', arrayOfAnyNames);
      console.log(
        'orsearch : ',
        this.orsearch,
        'andsearch : ',
        this.andsearch,
        'notsearch : ',
        this.notsearch
      );
      this.orsearch = arrayOfAnyNames.length > 0 ? arrayOfAnyNames : '';
      this.andsearch = arrayOfAllNames.length > 0 ? arrayOfAllNames : '';
      this.notsearch = arrayOfNotNames.length > 0 ? arrayOfNotNames : '';
      console.log(
        'orsearch : ',
        this.orsearch,
        'andsearch : ',
        this.andsearch,
        'notsearch : ',
        this.notsearch
      );
      let selected = {
        location: this.mylocation,
        text_query_ANY: this.orsearch,
        text_query_ALL: this.andsearch,
        text_query_NOT: this.notsearch,
        minSalary: this.salaryfrom,
        maxSalary: this.salaryto,
        minOverallExp: this.expfrom,
        maxOverallExp: this.expto,
      };
      this.internalDb.getdata(
        'search/advanced_query',
        selected,
        (response): void => {
          debugger;
          console.log('header search : ', response);
          this.datas = response.data;
          this.tableName = response.table_name;
          this.PrimaryColumns = response.primary_column_names;
          this.FilterColumns = response.filter_column_names;
          this.PrimaryColumnsLength = response.primary_column_names.length;
          this.FilterColumnsLength = response.filter_column_names.length;
          this.query = response.sql_query;
          debugger;
          this.counts = 1026; //response.count;
        }
      );
    }
  }

  onSortChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedSortBy = target.value;
    if (selectedSortBy === 'salary') {
      console.log('Query : ', this.query);
      let selected = {
        sort_var: 'current_salary',
        sql_statement: this.query,
      };
      // const sort_var='current_salary'
      this.internalDb.list('sort', selected, (response): void => {
        this.SortedData = response.results;
        console.log('sorted data : ', this.SortedData);
        this.datas = response.results;
      });
    } else if (selectedSortBy === 'experience') {
      let selected = {
        sort_var: 'overall_experiance',
        sql_statement: this.query,
      };
      this.internalDb.list('sort', selected, (response): void => {
        this.SortedData = response;
        console.log('sorted data : ', this.SortedData);
        this.datas = response.results;
      });
    }
  }

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  Skills: Skill[] = [];
  Qualifications: qualification[] = [];
  industrytypes: industryType[] = [];
  locations: location[] = [];

  addOnBlur = true;
  announcer = inject(LiveAnnouncer);

  fruits: Fruit[] = [];

  itemsToDisplay: any;

  CandiDateName: any;
  CandiDateGender: any;
  CandiDateEmail: any;
  CandiDatePhone: any;
  CandiDateAdredd: any;
  CandiDateQualification: any;
  CandiDateExperience: any;
  CandiDateCurrentSalary: any;
  CandiDateDesignation: any;
  CandiDateOrganisation: any;
  CandiDateFunctionalArea: any;
  CandiDateIndustryType: any;
  CandiDateLocation: any;
  tableName: any;
  PrimaryColumns: string[];
  FilterColumns: string[];
  PrimaryColumnsLength: any;
  FilterColumnsLength: any;
  res: any;

  // chip system for location

  addLoaction(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.locations.push({ name: value });
    }
    // console.log('Fruit After Add : ', this.f);
    event.chipInput!.clear();
  }

  removeLocation(loaction: location): void {
    const index = this.locations.indexOf(loaction);

    if (index >= 0) {
      this.locations.splice(index, 1);
      this.announcer.announce(`Removed ${loaction}`);
    }
    // console.log('fruits after removal : ', this.fruits);
  }

  editLocaction(loaction: location, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.removeLocation(loaction);
      return;
    }

    const index = this.locations.indexOf(loaction);
    if (index >= 0) {
      this.locations[index].name = value;
    }
  }

  // query:any;
  getData() {
    if (this.searchdata == 'boolean') {
      this.isChecked = false;
      let selected = {
        boolean_query: this.searchText,
        // minSalary: this.salaryfrom,
        // maxSalary: this.salaryto,
        // startDate: this.expfrom,
        // endDate: this.expto,
        // location:this.mylocation,
        // start_index: this.limitstartIndex,
        // limit: this.limitendIndex,
      };
      console.log('selected : ', selected);
      this.internalDb.getdata(
        'search/boolean_query',
        selected,
        (response): void => {
          debugger;
          this.datas = response.data;
          this.tableName = response.table_name;
          this.PrimaryColumns = response.primary_column_names;
          this.FilterColumns = response.filter_column_names;
          this.PrimaryColumnsLength = response.primary_column_names.length;
          this.FilterColumnsLength = response.filter_column_names.length;
          this.query = response.sql_query;
          debugger;
          this.counts = 1026; //response.count;
        }
      );
    } else {
      debugger;
      this.isChecked = true;
      let selected = {
        location: this.mylocation,
        text_query_ANY: this.orsearch,
        text_query_ALL: this.andsearch,
        text_query_NOT: this.notsearch,
        minSalary: this.salaryfrom,
        maxSalary: this.salaryto,
        minOverallExp: this.expfrom,
        maxOverallExp: this.expto,
      };
      this.internalDb.getdata(
        'search/advanced_query',
        selected,
        (response): void => {
          debugger;
          this.datas = response.data;
          this.tableName = response.table_name;
          this.PrimaryColumns = response.primary_column_names;
          this.FilterColumns = response.filter_column_names;
          this.PrimaryColumnsLength = response.primary_column_names.length;
          this.FilterColumnsLength = response.filter_column_names.length;
          this.query = response.sql_query;
          debugger;
          this.counts = 1026; //response.count;
        }
      );
    }
  }

  removeEmptyValues(obj: any): void {
    // console.log('h3');
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key].trim() === '') {
        delete obj[key];
      }
    }
  }

  OnSearchClick() {
    console.log('entered data : ', this.inputData);
    // this.removeEmptyValues(this.inputData);

    let SearchData = {
      // table_name: this.tableName,
      start_index: this.startIndex,
      // primary_columns: this.PrimaryColumns,
      // filter_columns: this.FilterColumns,
      pc_len: this.PrimaryColumnsLength,
      fc_len: this.FilterColumnsLength,
      // obj: this.inputData,
      candidate_name: 'atul kumar upadhyay',
    };

    this.internalDb.store(
      'columnar_filters_query',
      SearchData,
      (response): void => {
        debugger;
        this.res = response;
        this.counts = this.res.count;
        this.datas = this.res.results;
      }
    );
  }

  // My code End

  datfromprgrid(evt: any) {
    debugger;
    this.limitstartIndex = evt.startIndex;
    this.limitendIndex = evt.pageSize;

    // this.router.navigate(['internaldatabaseadvance/advancesearch', { orsearch: this.orsearch, andsearch: this.andsearch, locationcnd: this.locationcnd, salaryfroma: this.salaryfrom, salarytoa: this.salaryto, expfroma: this.expfrom, expto: this.expto, startIndex: this.limitstartIndex, endIndex: this.limitendIndex, setpage: evt.pageSize }]);
    this.getData();
    // this.loadInternaladvancesearchData('advancesearch');
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
    if (this.expfrom == "'Fresher'") {
      j = 1;
    }
    for (; j < 31; j++) {
      this.maxexperience.push(j);
    }
  }

  loadlocation(): void {
    this.locationtype = 'location';
    this.location = [];
    this.internalDb.list('location', null, (response): void => {
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
    }

    this.rowData = [];
    if (true) {
      this.internalDb.list(
        'showdata/',
        {
          andsearch: this.andsearch,
          orsearch: this.orsearch,
          notsearch: this.notsearch,
          salaryfrom: this.salaryfrom,
          salaryto: this.salaryto,
          expfrom: this.expfrom,
          expto: this.expto,
          candidatelocation: this.locationcnd,
          startindex: this.limitstartIndex,
          endindex: this.limitendIndex,
        },
        (response): void => {
          this.rowData = response;
          this.datas = response;
        }
      );
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
      this.internalDb.list(
        'showdataboolean/',
        {
          searchText: this.searchText,
          candidatelocation: this.locationcnd,
          salaryfrom: this.salaryfrom,
          salaryto: this.salaryto,
          expfrom: this.expfrom,
          expto: this.expto,
          startindex: this.limitstartIndex,
          endindex: this.limitendIndex,
        },
        (response): void => {
          this.rowData = response;
          this.datas = response;
        }
      );
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
      (this.salaryfrom === '' || this.salaryto === '') &&
      (this.expfrom === '' || this.expto === '')
    ) {
      this.internalDb.addmessageandremove('Please Insert data to search');
      this.internalDb.showMessage('Please Insert data to search');
    } else {
      // this.loadbooleanInternalData();
      this.router.navigate([
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
      setTimeout(function () {
        window.location.reload();
      }, 500);
    }
  }

  OnRowclicked(evt: any) {
    switch (evt.headername) {
      case 'candidateProfile':
        const url = `internalDatabase/candidate/${btoa(
          evt.fulldata.candidate_id
        )}`;
        // localStorage.setItem('additionalData', JSON.stringify(this.candidateIds));
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
      (this.salaryfrom === '' || this.salaryto === '') &&
      (this.expfrom === '' || this.expto === '')
    ) {
      this.internalDb.showMessage('Please Insert data to search');
      this.internalDb.addmessageandremove('Please Insert data to search');
    } else {
      this.router.navigate([
        'internaldatabaseadvance/advancesearch',
        {
          orsearch: this.orsearch,
          andsearch: this.andsearch,
          location: this.location,
          location_len: this.location_len,
          salaryfrom: this.salaryfrom,
          salaryto: this.salaryto,
          expfrom: this.expfrom,
          expto: this.expto,
          startIndex: this.startIndex,
          endIndex: this.EndIndex,
          setpage: this.setpage,
        },
      ]);
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
