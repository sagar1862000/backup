import {
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../../../../../src/app/services/db.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfig } from '@angular/cdk/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
// import { ElementRef } from 'jsplumb';
import { ElementRef } from '@angular/core';
import { MatChipInput } from '@angular/material/chips';
import {
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MatSelectChange } from '@angular/material/select';
import { isArray } from 'jquery';
import {InternalDatabaseService} from '../inernal-databaseservice.service'
declare var $: any;

export interface Fruit {
  name: string;
}

export interface ANY {
  name: string;
}

export interface ALL {
  name: string;
}

export interface NOT {
  name: string;
}


@Component({
  selector: 'app-internal-database',
  templateUrl: './internal-database.component.html',
  styleUrls: ['./internal-database.component.scss'],
})
export class InternalDatabaseComponent implements OnInit {
  constructor(
    public internalDb : InternalDatabaseService,
    public db: DbService,
    private router: Router,
    public dialog: MatDialog,
    public Dailog: DialogConfig,
    private httpClient: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

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
  checksearch = '';
  isPager = false;
  totalpage = [];
  getsalary: any;
  advancesearch = false;
  hidesearch = true;
  booleansearch: boolean;
  search: any;
  showInternaldatagridboolean = false;
  showexcelgrid = false;
  shownormalgrid = false;
  databoolean: any[];
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

  // My Code Start

  @ViewChild('inputElement') inputElement: MatChipInput;
  @ViewChild(MatAutocompleteTrigger) autoTrigger: MatAutocompleteTrigger;

  addOnBlur = true;

  // AnyArray: ANY[] = [];
  AllArray: ALL[] = [];
  NotArray: NOT[] = [];
  AnyArray: ANY[] = [];

  // suggestions: string[] = ['option1', 'option2', 'option3'];
  suggestionsAny: string[] = [];
  suggestionsAll: string[] = [];
  suggestionsNot: string[] = [];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fruits: Fruit[] = [{ name: 'Lemon' }, { name: 'Lime' }, { name: 'Apple' }];

  announcer = inject(LiveAnnouncer);

  optionSelectedFromAutocomplete: boolean = false;

  inputValueAny: string = '';
  inputValueAll: string = '';
  inputValueNot: string = '';
  fetchSuggestions() {
    console.log('suggestion : ', this.inputValueAny);
  }


  // AutoSuggetion for any
  async onInputChangeAny(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    console.log('Input value changed:', inputValue);
    this.inputValueAny = inputValue;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer YourAccessToken',
    });

    const params = new HttpParams().set('skill_var', this.inputValueAny);

    try {
      const globalData1 = await this.httpClient
        .get<any>('http://192.168.4.14:8001//query_suggestions', {
          headers,
          params,
        })
        .toPromise();
      console.log('suggestion1 : ', globalData1.suggestions);
      this.suggestionsAny = globalData1.suggestions;
      console.log('suggestion2 : ', this.suggestionsAny);
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // auto suggestion for All
  async onInputChangeAll(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    console.log('Input value changed:', inputValue);
    this.inputValueAll = inputValue;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer YourAccessToken',
    });

    const params = new HttpParams().set('skill_var', this.inputValueAll);

    try {
      const globalData1 = await this.httpClient
        .get<any>('http://192.168.4.14:8001//query_suggestions', {
          headers,
          params,
        })
        .toPromise();
      console.log('suggestion1 : ', globalData1.suggestions);
      this.suggestionsAll = globalData1.suggestions;
      console.log('suggestion2 : ', this.suggestionsAll);
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // auto suggestion for Not
  async onInputChangeNot(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    console.log('Input value changed:', inputValue);
    this.inputValueNot = inputValue;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer YourAccessToken',
    });

    const params = new HttpParams().set('skill_var', this.inputValueNot);

    try {
      const globalData1 = await this.httpClient
        .get<any>('http://192.168.4.14:8001//query_suggestions', {
          headers,
          params,
        })
        .toPromise();
      console.log('suggestion1 : ', globalData1.suggestions);
      this.suggestionsNot = globalData1.suggestions;
      console.log('suggestion2 : ', this.suggestionsNot);
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  onOptionSelectedAny(event: MatAutocompleteSelectedEvent) {
    const selectedOption = event.option.viewValue;
    this.AnyArray.push({ name: selectedOption });
    // this.AllArray.push({ name: selectedOption });
    // this.NotArray.push({ name: selectedOption });
  }

  onOptionSelectedAll(event: MatAutocompleteSelectedEvent) {
    const selectedOption = event.option.viewValue;
    // this.AnyArray.push({ name: selectedOption });
    this.AllArray.push({ name: selectedOption });
    // this.NotArray.push({ name: selectedOption });
  }

  onOptionSelectedNot(event: MatAutocompleteSelectedEvent) {
    const selectedOption = event.option.viewValue;
    this.NotArray.push({ name: selectedOption });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.fruits.push({ name: value });
    }
    // console.log('Fruit After Add : ', this.fruits);
    event.chipInput!.clear();
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);

      this.announcer.announce(`Removed ${fruit}`);
    }
    // console.log('fruits after removal : ', this.fruits);
  }

  edit(fruit: Fruit, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(fruit);
      return;
    }

    const index = this.fruits.indexOf(fruit);
    if (index >= 0) {
      this.fruits[index].name = value;
    }
  }

  // For Any Input Box
  addAny(event: MatChipInputEvent): void {
     const value = (event.value || '').trim();

      if (value) {
        this.AnyArray.push({ name: value });
      }

      // console.log('ANY After Add : ', this.AnyArray);

      event.chipInput!.clear();
      
  }

  removeAny(ANY: ANY): void {
    const index = this.AnyArray.indexOf(ANY);

    if (index >= 0) {
      this.AnyArray.splice(index, 1);

      this.announcer.announce(`Removed ${this.AnyArray}`);
    }
    // console.log('Any after removal : ', this.AnyArray);
  }

  editAny(ANY: ANY, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(ANY);
      return;
    }

    const index = this.fruits.indexOf(ANY);
    if (index >= 0) {
      this.AnyArray[index].name = value;
    }
  }

  // For All input Box
  addAll(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.AllArray.push({ name: value });
    }

    // console.log('All After Add : ', this.AllArray);

    event.chipInput!.clear();
  }

  removeAll(ALL: ALL): void {
    const index = this.AllArray.indexOf(ALL);

    if (index >= 0) {
      this.AllArray.splice(index, 1);

      this.announcer.announce(`Removed ${this.AllArray}`);
    }
    // console.log('All after removal : ', this.AllArray);
  }

  editAll(ALL: ALL, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(ALL);
      return;
    }

    const index = this.fruits.indexOf(ALL);
    if (index >= 0) {
      this.AllArray[index].name = value;
    }
  }

  // For Not input Box
  addNot(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.NotArray.push({ name: value });
    }
    // console.log('Not After Add : ', this.NotArray);
    event.chipInput!.clear();
  }

  removeNot(NOT: NOT): void {
    const index = this.NotArray.indexOf(NOT);
    if (index >= 0) {
      this.NotArray.splice(index, 1);

      this.announcer.announce(`Removed ${this.NotArray}`);
    }
    // console.log('Not after removal : ', this.NotArray);
  }

  editNot(NOT: NOT, event: MatChipEditedEvent) {
    const value = event.value.trim();
    if (!value) {
      this.remove(NOT);
      return;
    }
    const index = this.NotArray.indexOf(NOT);
    if (index >= 0) {
      this.NotArray[index].name = value;
    }
  }

  andsearch = '';
  orsearch = '';
  notsearch = '';
  selectedLocations: string[] = [];
  // selectedLocations : any;
  salaryfrom: any;
  salaryto: any;
  expfrom: any;
  expto: any;
  searchText: any;
  public ShowbasicSearch = true;
  public ShowAdvanceSearch = false;


  openBasic(): void {
    this.ShowbasicSearch = true;
    this.ShowAdvanceSearch = false;
  }
  openAdvance(): void {
    this.ShowAdvanceSearch = true;
    this.ShowbasicSearch = false;
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
  }

  loadlocation(): void {
    this.locationtype = 'location';
    this.location = [];
    this.internalDb.list('location_dropdown', null, (response): void => {
      this.location = response.preferred_location_list;
      // for (const j in data) {
      //   if (data[j]) {
      //     this.location.push(data[j].location);
      //   }
      // }
      console.log('locations : ', this.location);
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

  mylocation: string ;

  onLocationSelectionChange(event: MatSelectChange) {
    // console.log('value : ',event.value.length );
    const selectedOption = event.value;
    // console.log(selectedOption);
    this.selectedLocations=[];
    for(let i=0;i<event.value.length;i++){
      this.selectedLocations.push(event.value[i]);
    }
    // this.selectedLocations.push(selectedOption);
    console.log('My Locations:' , this.selectedLocations);
  }



  advance = 'advance';
  // Boolean Search
  public loadGridBoolean(): void {
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

    const urladvance = this.router.createUrlTree([
      'internaldatabaseadvance/advancesearch',
      {
        SearchType: 'boolean',
        // orsearch: JSON.stringify(this.AnyArray),
        // andsearch: JSON.stringify(this.AllArray),
        query : this.searchText,
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

  basic = 'basic';
  // Advance Search

  public loadGridAdvance(): void {
    const arrayOfAnyNames: string[] = this.AnyArray.map(obj => obj.name);
    const arrayOfAllNames: string[] = this.AllArray.map(obj => obj.name);
    const arrayOfNotNames: string[] = this.NotArray.map(obj => obj.name);

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

    const urladvance = this.router.createUrlTree([
      'internaldatabaseadvance/advancesearch',
      {
        location_len: this.selectedLocations.length,
        SearchType: 'advance',
        orsearch: arrayOfAnyNames.length > 0 ? arrayOfAnyNames : '',
        andsearch: arrayOfAllNames.length > 0 ? arrayOfAllNames : '',
        notsearch: arrayOfNotNames.length > 0 ? arrayOfNotNames : '',
        locationcnd: this.selectedLocations,
        salaryfrom: this.salaryfrom !== undefined ? this.salaryfrom : '',
        salaryto: this.salaryto !== undefined ? this.salaryto : '',
        expfrom: this.expfrom !== undefined ? this.expfrom : '',
        expto: this.expto !== undefined ? this.expto : '',
        startIndex: this.startIndex !== undefined ? this.startIndex : '',
        EndIndex: this.EndIndex1 !== undefined ? this.EndIndex1 : '',
        setpage: this.setpage !== undefined ? this.setpage : '',
      },
    ]);
    window.open(urladvance.toString(), '_blank');
  }

  public loadGrid(): void {}

  openmodal(modalname: any) {
    $(modalname).appendTo('body').modal('show');
  }
}
