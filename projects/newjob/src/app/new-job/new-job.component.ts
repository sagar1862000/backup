import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DbService } from '../../../../../src/app/services/db.service';
import { ActivatedRoute, Router } from '@angular/router';
// import { Response } from 'selenium-webdriver/http';
import { arrRoles } from './arrRoles';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { MatChipInputEvent } from '@angular/material/input';
// import { Response } from '@angular/http';
// import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
// import {COMMA, ENTER} from '@angular/cdk/keycodes';
// import {Component, ElementRef, ViewChild} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
// import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { NewJobModule } from 'app/new-job/new-job.module';
// import { NewJobModule } from './new-job.module';
import {
  FormsModule
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
// import { TagInputModule } from 'ngx-chips';

// declare var $: any;
declare var $: any;
@Component({
  selector: 'app-new-job',
  templateUrl: './new-job.component.html',
  styleUrls: ['./new-job.component.scss']
})
export class NewJobComponent implements OnInit {
  
  // myControl = new FormControl();
  // options: string[] = ['One', 'Two', 'Three'];
  // filteredOptions: Observable<string[]>;

  start_date_temp: any = new Date();
  public Editor = ClassicEditor;
  clientsdepartment = '';
  end_date_temp: any = new Date();
  clients: any = [];
  Event: any;
  storekey: any;
  checkexistjob: any;
  addtojob: any = {};
  myjoblist: [];
  sendemailmodel: any = {};
  copycandidate: any = {};
  sms: any = {};
  addnewjob: any = {};
  skillskills: any;
  departments = [];
  hidesavebutton = false;
  isClientdata = false;
  isDepartmentdata = false;
  status = '  ';
  texttospeech: any;
  speechaudio: any;
  trackerlist = [];
  profile: any = {};
  searchTerm = '';
  selectedmanagerlist = [];
  jobroles = [];
  functionalArea = '';
  locations = [];
  store: any = {};
  emailselected: any = {};
  smsselected: any = {};
  managers = [];
  profiletoken: string;
  min = 10;
  jobadd = false;
  max = 5000;
  mp: any = {};
  keyskills: any;
  jobupdate: any;
  // keyskillsset: any;
  minimumSalarythousand: any = 0;
  maximumSalarylac: any = 0;
  maximumSalarythousand: any = 0;
  location: any;
  textTospeech = [];
  arrRoles = [];
  isjobediting = false;
  current_job_id = 0;
  suggestionlist = [];
  locationtype = '';
  visibledate = false;
  LocationInternationalLocal: string;
  // jobtype= '';
  visibleHM = false;
  referral = false;
  t = null;
  clientdetails = [];

  errormsgtag = '';

  // functionalareas = [];
  job_description_api_url = 'http://122.176.49.199:5000/jd_suggestions';
  // this.key_suggestion_api_url = 'http://122.176.49.199:5000/keyword_suggestions';
  key_suggestion_api_url = 'suggest_key_skills';
  maxexperience: any;
  filter: any;
  maxSalaryOption = [];
  searchcandidate = '';
  page = 1;
  search: any;
  suggestedkeyskills = [];
  myjob: any = { minimum_experience: 0, internshipdurationunit: 'Month', start_date: new Date(), end_date: new Date() };
  round: any = [];
  interviewhiring_manager_id = [];
  interviewevent_name = [];
  interviewevent_limit = [];
  minimumSalaryOption = [];
  minimumSalarylac = 0;
  minimumSalaryOptionink = [];
  maximumSalaryOptionink = [];
  minexperience = [];
  industries = [];
  functionalareas = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  // $event:any;
  skillCtrl = new UntypedFormControl();
  filteredskills: Observable<string[]>;
  keyskillsset: string[] = [];
  EventTarget: any;
  @ViewChild('skillInput') skillInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  showeditjob = false;
  $index: any;
  a = true;
  keyskillscheck: any;
  myjobdatas: any;
  isexistjob = false;
  viewkeyskill: any;
  searchquery: string;
  myjdkeyskill: any;
  skills: any[];
  jdkey: any[];
  jdskills: any;
  keyskillssets: any;
  jobtitlesuggestions: any;
  callportname: any;
  callportnameobj: any;
  jobtitles: string[]; // = ['One', 'Two', 'Three'];
  jobControl = new UntypedFormControl();
  filteredjobs: Observable<string[]>;
  createupdate: any;



  speechjobtitle = false;
  primaryskill: string[];
  primaryControl = new UntypedFormControl();
  filteredprimary: Observable<string[]>;

  speechPrimary = false;
  speechSecondary = false;
  speechOthers = false;
  hiringmanagers: any;
  InterviewsRounds: any = [];
  Referraldepartments: any;
  constructor(public db: DbService, public USR: UserService, public route: ActivatedRoute, private router: Router) {

    this.filteredskills = this.skillCtrl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => skill ? this._filter(skill) : this.keyskillsset.slice()));


    ClassicEditor.defaultConfig = {
      toolbar: {
        items: [
          'heading',
          '|',
          'bold',
          'italic',
          'link',
          'bulletedList',
          'numberedList',
          'blockQuote',
          'undo',
          'redo',
        ],
      },
      language: 'en',
      licenseKey: '',
      security: {
        tokenUrl: 'https://example.com/csrf-token',
        data: 'csrf-token'
      },
    };
  }


  add(event: MatChipInputEvent): void {

    if (this.skills == undefined) {
      this.skills = [];
    }
    const input = event.input;
    let value = event.value;
    //  if(value == )

    for (const k in this.skills) {

      if (this.skills[k] == value) {

        value = undefined;
        this.db.addmessageandremove('Duplicate entry not allowed');

      }
    }
    // Add our skill
    // if ((value || '').trim()) {
    //   this.skills.push(value.trim());
    // }


    if ((value || '').trim()) {
      if (!this.skills.includes(value.trim())) {
        this.skills.push(value.trim());
      }
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.skillCtrl.setValue(null);
  }


  texttospeechfun() {

    const tts = this.texttospeech;
    this.db.getdata('texttospeech/', { tts }, (response): void => {

      this.speechaudio = response;
    });

  }

  remove(skill: any): void {

    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  _filter(name: string) {

    for (const k in this.skills) {
      if (this.skills[k] == name) {
        name = undefined;
      }
    }
    return this.keyskillsset.filter(skill =>
      skill.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  selected(event: MatAutocompleteSelectedEvent): void {

    let addskills = event.option.viewValue;
    for (const k in this.skills) {
      if (this.skills[k] == addskills) {
        addskills = null;

      }
    }
    if (addskills == null) {
      this.db.addmessageandremove('Duplicate entry not allowed');

    } else {
      this.skills.push(addskills);
      this.skillInput.nativeElement.value = '';
      this.skillCtrl.setValue(null);
    }

    // this.keyskillsset = [];
  }
  ngOnInit() {
    // <<<<<<< HEAD
    // =======
    this.getHM();


    this.db.checkLoginOrNot();

    // >>>>>>> 89b684f8ea6691c8d8775379782794268d55c132
    this.joblist();
    this.applicationcallportname();
    // this.showJob('id');
    this.arrRoles = arrRoles;

    $('select').addClass('noselect2 form-control');
    this.minimumSalaryOptionSet();
    this.updatemaxexperience();
    this.loadlocation();
    this.loadManagerclientdetail();
    this.applicationdepartment();
    this.settracker();
    this.updatemaxsalary();

    this.db.list('master/functional-areas/', null, (response): void => {

      this.functionalareas = response;
      if (this.route.snapshot.params['id']) {
        this.showJob(this.route.snapshot.params['id']);
      }
    });


    this.db.list('master/industries/', null, ((response): void => {

      this.industries = response;
    })
    );

    this.applicationdepartment();
    if (this.myjob.jobDescription == undefined) {
      this.myjob.jobDescription = 'Enter JD';
    }


  }
  jobtitlesuggestion(): void {
    if (this.myjob.job_title.length > 0) {
      this.speechjobtitle = true;
    } else {
      this.speechjobtitle = false;
    }
    this.db.getdata('job/jobtitle-suggestion/', { job_title: this.myjob.job_title }, (response) => {

      this.jobtitles = response;
      this.filteredjobs = this.jobControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._jobfilters(value))
        );
    });

  }
  private _jobfilters(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.jobtitles.filter(jobtitles => jobtitles.toLowerCase().includes(filterValue));
  }



  Sendjd() {

    const jd = this.myjob.jobDescription;
    // this.keyskillsset = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

    this.db.list('sendjd/', { jobDescription: this.myjob.jobDescription }, ((response): void => {

      // this.jdskills = response;
      // for (const k in this.skills) {
      //   if (this.skills[k] == this.jdskills) {
      //     this.jdskills = undefined;
      //    }
      //   }

      for (const k in this.skills) {
        for (const j in response) {

          if (this.skills[k] == response[j]) {
            response[j] = undefined;
            const index = response[j].indexOf(undefined);

            if (index >= 0) {
              response[j].splice(index, 1);
            }
          }
        }
      }



      // for (const i in response) {

      // if(response[i] == undefined){
      //   this.skills
      // }
      //        }

      this.skills = this.skills.concat(response);


    })
    );
  }

  // add(event: MatChipInputEvent): void {
  //   const input = event.input;
  //   const value = event.value;

  //   // Add our skill
  //   if ((value || '').trim()) {
  //     this.myjob.keyskills.push({ name: value.trim() });
  //   }

  //   // Reset the input value
  //   if (input) {
  //     input.value = '';
  //   }
  // }
  joblist(): void {
    // this.isLoadingJobs = true;
    this.db.list('job/view-jobs/', {}, ((response): void => {
      this.myjobdatas = response;
    })
    );
  }
  // myjobdata(id): void {
  //   this.db.list('addnewjob/', id, ((response): void => {
  //     this.myjobdata = response;
  //   }))
  // }


  // remove(skill: keyskills): void {
  //   const index = this.myjob.keyskills.indexOf(skill);

  //   if (index >= 0) {
  //     this.myjob.keyskills.splice(index, 1);
  //   }
  // }




  jobtype(): void {

    $('#internshipdiv').hide();
    $('#contract').hide();
    $('#freelence').hide();
    if (this.myjob.jobtype) {
      if (this.myjob.jobtype === 'Internship') {
        $('#internshipdiv').show();
      } else {
        $('#internshipdiv').hide();
      }
      if (this.myjob.jobtype === 'Contract') {
        $('#contract').show();
      } else {
        $('#contract').hide();
        // $("#width").addClass( 'col-md-12');
      }

      if (this.myjob.jobtype === 'Freelence') {
        $('#freelence').show();
      } else {
        $('#freelence').hide();
      }
    }
  }



  changefilter(val): void {

    this.filter = val;
  }
  minimumSalaryOptionSet(): void {
    for (let kk = 0; kk < 91; kk++) {
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
    for (let jj = 0; jj < 31; jj++) {
      this.minexperience.push(jj);
    }
  }



  updatemaxsalary(): void {

    let kk = 0;
    this.maxSalaryOption = [];
    kk = this.myjob.minimumSalarylac;
    for (; kk < 99; kk++) {
      this.maxSalaryOption.push(kk);
    }

  }

  updatemaxsalaryt(): void {

    if (this.myjob.minimumSalarylac == this.myjob.maximumSalarylac) {
      let tt = 0;
      this.maximumSalaryOptionink = [];
      tt = this.myjob.minimumSalarythousand;
      for (; tt < 100; tt++) {
        if (tt % 10 == 0) {
          this.maximumSalaryOptionink.push(tt);
        }

      }
    } else {
      let tt = 0;
      this.maximumSalaryOptionink = [];
      for (; tt < 100; tt++) {
        if (tt % 10 == 0) {
          this.maximumSalaryOptionink.push(tt);
        }
      }
    }
  }


  updatemaxexperience(): void {
    this.maxexperience = [];
    let j = 0;
    j = this.myjob.minimum_experience;
    for (; j < 31; j++) {
      this.maxexperience.push(j);
    }
  }

  checkclientdepartment(): void {
debugger;
    if (this.myjob.is_client === 1) {
      // this.myjob.is_client = 'Client';
      this.isClientdata = true;
      this.isDepartmentdata = false;
      this.loadManagerclientdetail();
    }
    else if (this.myjob.is_client === 0) {
      // this.myjob.is_client = 'Department';
      this.isDepartmentdata = true;
      this.isClientdata = false;
      this.applicationdepartment();

    }
  }


  deleteSkill(index): void {
    this.suggestedkeyskills.splice(index, 1);
    $('#helpcontainer').hide();
  }
  checkhiringanager(): void {
    if (this.myjob.autointegration == 'Yes') {
      this.visibleHM = true;
    } else {
      this.visibleHM = true;

    }
  }

  getHM(): void {
    this.db.list('hiringmanager/', {}, ((response): void => {

      this.hiringmanagers = response;
    }));
  }

  checkvisibleornot(): void {
    if (this.myjob.is_visible_on_app == 1) {
      this.visibledate = true;
      $('#width3').addClass('col-md-2');
      $('#width3').removeClass('col-md-4');
      $('#width4').removeClass('col-md-4');
      $('#width4').addClass('col-md-3');
      $('#width5').addClass('col-md-3');
      $('#width5').removeClass('col-md-4');



    } else {
      this.visibledate = false;
      $('#width3').addClass('col-md-4');
      $('#width5').addClass('col-md-4');
      $('#width4').addClass('col-md-4');

    }
  }

  showJob(id): void {
    // $event.stopPropagation();
    // this.job = job;

    this.jobadd = false;
    this.showeditjob = true;
    this.isjobediting = true;
    if (this.isjobediting) {
      this.isexistjob = true;
    }

    this.db.show('job/show-job/', id, (response): void => {




      this.myjob = response;
      this.checkexistjob = this.myjob.job_title;

      const tags = [
      ];
      // if (this.myjob.is_visible_on_app == 1) {
      //   this.myjob.is_visible_on_app = 'Yes';
      //   this.visibledate = true;
      // } else {
      //   this.myjob.is_visible_on_app = 'No';
      //   this.visibledate= false;
      // }
      const skillsetarr = this.myjob.keyskills.split(',');

      for (const k in skillsetarr) {

        const data = skillsetarr[k].length;

        if (skillsetarr[k] != ' ') {
          tags.push(skillsetarr[k]);
        }
      }
      this.skills = tags;
      this.myjob.keyskills = tags;
      if (this.myjob.is_client === 1) {
        // this.myjob.is_client = 'Client';
        this.isClientdata = true;
        this.isDepartmentdata = false;
      }
      else if (this.myjob.is_client === 0) {
        // this.myjob.is_client = 'Department';
        this.isClientdata = false;
        this.isDepartmentdata = true;
      }


      try {
        let minSalaryLacs = null;
        let minSalaryThousand = null;
        let maxSalaryLacs = null;
        let maxSalaryThousand = null;

        minSalaryLacs = this.myjob.minimumSalary / 100000;
        minSalaryLacs = Math.floor(minSalaryLacs);
        // alert('minSalary in lacs =' + minSalaryLacs + 'lakhs');
        this.myjob.minimumSalarylac = minSalaryLacs.toString();
        // document.write('minimumSalary in lacs');

        minSalaryThousand = (this.myjob.minimumSalary) - (minSalaryLacs * 100000);
        minSalaryThousand = minSalaryThousand / 1000;
        this.myjob.minimumSalarythousand = minSalaryThousand.toString();


        maxSalaryLacs = this.myjob.maximum_salary / 100000;
        maxSalaryLacs = Math.floor(maxSalaryLacs);
        // alert('minSalary in lacs =' + minSalaryLacs + 'lakhs');
        this.myjob.maximumSalarylac = maxSalaryLacs.toString();
        // document.write('minimumSalary in lacs');

        maxSalaryThousand = (this.myjob.maximum_salary) - (maxSalaryLacs * 100000);
        maxSalaryThousand = maxSalaryThousand / 1000;
        this.myjob.maximumSalarythousand = maxSalaryThousand.toString();


        this.updatemaxsalary();
        // alert('minSalary in Thousands =' + minSalaryThousand + 'thousands');



        // this.minimumSalarylac=(this.minimumSalarylac*100000)+(this.minimumSalarythousands*1000);
        //   =resultmin.tostring();
        // this.minimumSalarylac=(this.maximumSalarylac*100000)+(this.maximumSalarythousand*1000);
        //  =resultmax.tostring();


      } catch (e) {

      }
      if (this.myjob.tracker_id != null) {
        this.myjob.tracker_id = this.myjob.tracker_id.toString();
      }

      try {
        this.myjob.client_detail_id = this.myjob.client_detail_id.toString();
        this.myjob.manager_id = this.myjob.manager_id.toString();
        this.location = this.myjob.location.toString().split(',');




      } catch (e) {
        // console.log(e);
      }
      // functionalareas this.functionalArea = this.myjob.functionalArea.toString();

      if (this.myjob.functionalArea != null) {
        for (const i in this.functionalareas) {
          if (this.myjob.functionalArea.toString() === this.functionalareas[i].functionalAreaName) {
            // this.functionalArea = {'id': this.functionalareas[i].id,
            // 'functionalAreaName': this.functionalareas[i].functionalAreaName,
            // 'code': this.functionalareas[i].code, 'ipAddress':
            // this.functionalareas[i].ipAddress};
            this.functionalArea = this.functionalareas[i];
            setTimeout(function () {
              this.getrole();
            }, 100);
            break;
          }


        }
      }

      // this.functionalArea=''
      try {
        this.myjob.Industry = this.myjob.industry.toString();

      } catch (e) {
        // console.log(e);
      }
      this.myjob.jobRole = this.myjob.jobRole.toString();
      //
      this.changerole();
      // this.getrole();
      //
      $('#submitjob').modal('show');
    });

  }

  getrole(): void {

    let code = $('#fun .funs:selected').attr('opt');
    // let code = this.myjob.functionalArea;
    if (code != null) {
      code = code.replace('#', '');
      code = code.split('.')[0];
      const codeint = parseInt(code, 0);
      const arrRoleload = this.arrRoles[codeint];
      this.jobroles = [];
      for (const i in arrRoleload) {
        if (i.indexOf('a') === -1) {
          this.jobroles.push({ val: arrRoleload[i], p: false });
        }
      }
    }
  }
  addNewJobupdate() {



    if (this.db.mp.btn_can_call == true) {
      if (this.myjob.calltype == null || this.myjob.calltype == undefined) {
        this.db.addmessageandremove('The Call Type field is required.');
      }
    }
    if (true) {

      const locations = this.location;
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


      if (this.myjob.is_client === 'Client') {
        this.myjob.is_client = 1;
        this.isClientdata = true;
        this.isDepartmentdata = false;
      }
      else if (this.myjob.is_client === 'Department') {
        this.myjob.is_client = 0;
        this.isClientdata = false;
        this.isDepartmentdata = true;
      }

      if (this.a == true) {
        this.a = false;
        const keyskills = this.myjob.keyskills;
        this.keyskillscheck = this.myjob.keyskills;

        let keyskillstr = '';
        // if (keyskillstr == '') {
        for (const j in keyskills) {
          if (keyskills[j]) {
            keyskillstr += keyskills[j] + ',';
          }

        }
        if (keyskillstr) {
          keyskillstr = keyskillstr.replace(/,\s*$/, '');
        }
        this.myjob.keyskills = keyskillstr;
        // }
      }
      else if (this.a == false) {
        const keysk = this.keyskillscheck;
        let keyskillstr2 = '';

        for (const j in keysk) {
          if (keysk[j]) {
            keyskillstr2 += ',' + keysk[j];
          }

        }
        if (keyskillstr2) {
          keyskillstr2 = keyskillstr2.replace(/,\s*$/, '');
        }
        this.myjob.keyskills = keyskillstr2;
      }
      this.myjob.location = locationstr;
      if (this.myjob.start_date != null){
      if (this.myjob.start_date?.length == undefined) {
        this.myjob.start_date = this.db.toYYMMDD(this.myjob.start_date);
      }
      }
      if (this.myjob.end_date != null){
      if (this.myjob.end_date?.length == undefined) {
        this.myjob.end_date = this.db.toYYMMDD(this.myjob.end_date);
      }
    }
      // this.myjob.functionalArea = this.functionalArea;
      //            let locations = this.location;
      //            let locationstr = '';
      //            for (let j in locations)
      //            {
      //                locationstr += locations[j] + ',';
      //            }
      //            this.myjob.location = locationstr;
      //
      //            this.myjob.functionalArea = this.functionalArea.functionalAreaName;

      this.myjob.minimum_salary = (this.myjob.minimumSalarylac * 100000) + (this.myjob.minimumSalarythousand * 1000);
      //   =resultmin.tostring();
      this.myjob.maximum_salary = (this.myjob.maximumSalarylac * 100000) + (this.myjob.maximumSalarythousand * 1000);
      //  =resultmax.tostring();
      if (this.myjob.minimumSalary > this.myjob.maximum_salary) {
        this.db.addmessageandremove('Maximum salary cannot be less then minimum salary.');
      } else {

        this.db.update('addnewjob/', this.myjob.id, this.myjob, (response): void => {

          this.db.addmessageandremove('Job Updated Successfully');
          this.createupdate = 'Updated';
          $('#NextPageOrNot').appendTo('body').modal('show');
          this.joblist();

        }, (response): void => {
          // this.token=response.statusText;
          this.db.addmessageandremove('Please check if you entered wrong data.');

        });
      }
    }
  }




  bindfunctionalarea(): void {

    if (true) {
      this.current_job_id = 0;
      this.isjobediting = true;

      this.db.list('functionalarea/', null, (response): void => {

        this.functionalareas = response;
        this.showJob(this.current_job_id);

      });

      this.page = this.getParameterByName('p');
    } else {
      this.db.list('functionalarea/', null, (response): void => {

        this.functionalareas = response;


      });
    }
  }

  getParameterByName(p) {
    return p;
  }
  changerole = function () {

    setTimeout(function () {
      if ($('#role').val() === 'Internship') {
        $('#internship').show();
      } else {
        $('#internship').hide();
      }

      if ($('#role').val() === 'Contract') {
        $('#contract').show();
      } else {
        $('#contract').hide();
      }

      if ($('#role').val() === 'Freelence') {
        $('#freelence').show();
      } else {
        $('#freelence').hide();
      }
    }, 1000);
  };







  Primary_skillsuggestion(): void {

    // $("#Primary_Skill").autocomplete({
    //   source: this.db.rooturi + "index.php/api/getprimaryskillsuggestion?token=" + this.db.token + '&keyskill=' + this.myjob.first_skill,
    //   minLength: 1,
    //   select: function (event, ui) {

    //     //log("Selected: " + ui.item.value + " aka " + ui.item.id);
    //   }
    // });
    if (this.myjob.first_skill.length > 0) {
      this.speechPrimary = true;
    } else {
      this.speechPrimary = false;
    }
    // this.db.getdata("getprimaryskillsuggestion/", { keyskill: this.myjob.first_skill }, (response) => {

    //   this.primaryskill = response;
    //   this.filteredprimary = this.primaryControl.valueChanges
    //     .pipe(
    //       startWith(''),
    //       map(value => this._jobfilters(value))
    //     );
    // });

  }

  getsecondaryskillsuggestion(): void {
    if (this.myjob.second_skill.length > 0) {
      this.speechSecondary = true;
    } else {
      this.speechSecondary = false;
    }
    $('#Secondary_Skill').autocomplete({
      source: this.db.rooturi + 'index.php/api/getsecondaryskillsuggestion?token=' + this.db.token + '&keyskill=' + this.myjob.second_skill,
      minLength: 1,
      select(event, ui) {

        // log("Selected: " + ui.item.value + " aka " + ui.item.id);
      }
    });

  }
  getthirdskillsuggestion(): void {
    if (this.myjob.third_skill.length > 0) {
      this.speechOthers = true;
    } else {
      this.speechOthers = false;
    }
    $('#Third_Skill').autocomplete({
      source: this.db.rooturi + 'index.php/api/getthirdskillsuggestion?token=' + this.db.token + '&keyskill=' + this.myjob.third_skill,
      minLength: 1,
      select(event, ui) {

        // log("Selected: " + ui.item.value + " aka " + ui.item.id);
      }
    });

  }

  addSkill(index, skill): void {

    this.suggestedkeyskills.splice(index, 1);
    if (this.myjob.keyskills === '' || this.myjob.keyskills === undefined) {
      this.myjob.keyskills = skill;
    } else {
      this.myjob.keyskills = this.myjob.keyskills + ', ' + skill;
    }
    $('#helpcontainer').hide();
  }
  contains(currentval, suggestedkeyskills): boolean {
    return false;
  }
  error_on_invalid_tag(): void {
    this.errormsgtag = 'Duplicate skills/Length more than 40 chars are not allowed.';
    setTimeout(function () {
      this.errormsgtag = '';
    }, 5000);
  }





  getkeyskillssearch(): void {
    this.myjob.keyskills = this.skills; // this.myjob.keyskills;
    const search = [this.myjob.keyskills];
    this.db.getdata('job/suggest-key-skills/', { tts: search }, (response) => {
      this.keyskillsset = response;
    });
  }


  // }



  getkeyskills(): void {

    const search = JSON.stringify(this.skills); // this.myjob.keyskills;
    const searchquery = search;


    //  const searcharr = search.split(',');
    //        if (searcharr.length == 1) {
    //            searchquery = search;
    //        } else {
    //            searchquery = searcharr[searcharr.length - 1];
    //        }
    if (this.t != null) {
      clearTimeout(this.t);
    }
    this.t = setTimeout(function () {
      this.loadkeyskills(searchquery, true, true);
    }, 2000);
  }


  // asdfghjkl():void{
  //   this.myjob.keyskills;
  // }




  loadkeyskills(newValue, istext, keyskill) {

    if (this.myjob.keyskills === undefined) {
      this.myjob.keyskills = '';
    }
    let jd: any;
    if (istext) {
      jd = newValue;
    } else {
      jd = $(newValue).text();
    }
    jd = jd.replace('\n', ' ');
    let url, data;
    if (keyskill) {
      url = this.key_suggestion_api_url;
      data = { keyskills: jd };

    } else {

      url = this.job_description_api_url;
      data = { jd };
    }
    if (jd.length > 0) {
      this.suggestedkeyskills = [];
      this.db.store(url, data, function (response) {
        if ($.trim(response) !== '') {
          const newval = '';
          const laststringarr = this.myjob.keyskills.split(',');
          const resultarr = response.split(',');
          this.suggestionlist = [];
          for (const k in resultarr) {
            if (resultarr[k]) {
              this.suggestionlist.push({ text: resultarr[k] });
            }
          }
          for (const k in resultarr) {
            if (resultarr[k]) {
              const currentval = $.trim(resultarr[k]);
              if (currentval !== '') {
                let isfound = false;
                for (const pk in laststringarr) {
                  if (laststringarr[pk]) {
                    const currentlastval = $.trim(laststringarr[pk]);
                    if (currentlastval !== '' && currentlastval !== currentval) {
                      isfound = false;

                    } else if (currentlastval !== '' && currentlastval === currentval) {
                      isfound = true;
                      break;

                    }
                  }
                }
                if (isfound === false && currentval !== '') {
                  if (!this.contains(currentval, this.suggestedkeyskills)) {
                    this.suggestedkeyskills.push(currentval);
                  }
                }
              }
            }
          }
          //                    if (newval !== '') {
          //                        this.myjob.keyskills = this.myjob.keyskills + newval;
          //                    }
        }
      });
    }
  }


  // this.$watch(function (scope) {
  //     return scope.myjob.jobDescription;
  //   },
  //     function (newValue, oldValue) {

  //       if (loadkeyskills_timeout != null) {
  //         clearTimeout(loadkeyskills_timeout);
  //       }
  //       loadkeyskills_timeout = setTimeout(function () {
  //         this.loadkeyskills(newValue);
  //       }, 2000);
  //     }
  //   );

  settracker(): void {
    this.db.list('tracker/tracker/', null, (response) => {


      try {
        this.trackerlist = response;
        if (this.trackerlist.length > 0) {
          this.myjob.tracker_id = this.trackerlist[0].id.toString();
        }
      } catch (e) {

      }

    });
  }

  // setkeyskills() {
  //
  //   setTimeout(function () {

  //     this.myjob.keyskills = [];
  //     for (const i in this.keyskillsset) {
  //       if (this.keyskillsset[i]) {
  //         this.myjob.keyskills.push(this.keyskillsset[i].text);
  //       }
  //     }
  //     this.myjob.keyskills = this.myjob.keyskillsdemo.toString();
  //     this.getkeyskills();
  //   }, 500);
  // }

  getkeyskillssuggestion(): any {

    return this.suggestionlist;
  }


  loadlocation(): void {
    this.LocationInternationalLocal = 'Location';
    this.locationtype = 'location';
    this.locations = [];
    this.db.list('job/location/', null, (response): void => {

      const data = response;
      for (const j in data) {
        if (data[j]) {
          this.locations.push(data[j].location);
        }
      }


    });
  }


  loadinternationlocation(): void {
    this.LocationInternationalLocal = 'International Location';
    this.locationtype = 'international';
    this.locations = [];
    this.db.list('job/international-location/', null, (response) => {

      const data = response;
      for (const j in data) {
        if (data[j]) {
          this.locations.push(data[j].location);
        }
      }
    });
  }


  callapi = function (searchquery) {
    // searchquery='http://127.0.0.1:8000/';

    if ($.trim(searchquery).length > 0 && false) {
      searchquery = 'http://122.176.49.199:5000/' + searchquery;
      this.db.get(searchquery, {}, function (response) {

        if ($.trim(response) !== '') {
          let newval = '';
          const laststringarr = this.myjob.keyskills.split(',');
          const resultarr = response.split(',');
          for (const k in resultarr) {
            if (resultarr[k]) {
              const currentval = $.trim(resultarr[k]);
              if (currentval !== '') {
                let isfound = false;
                for (const pk in laststringarr) {
                  if (laststringarr[pk]) {
                    const currentlastval = $.trim(laststringarr[pk]);
                    if (currentlastval !== '' && currentlastval !== currentval) {
                      isfound = false;

                    } else if (currentlastval !== '' && currentlastval === currentval) {
                      isfound = true;
                      break;

                    }
                  }
                }
                if (isfound === false && currentval !== '') {

                  newval = newval + ',' + currentval;
                }
              }

            }

          }
          if (newval !== '') {
            this.myjob.keyskills = this.myjob.keyskills + newval;
          }
        }
      }, function (response) {
        alert(response);
      });
    }
  };



  clearSearchTerm(): void {
    this.searchTerm = '';
  }
  // The md-select directive eats keydown events for some quick select
  // logic. Since we have a search input here, we don't need that logic.
  // $element.find('input').on('keydown', function(ev) {
  //   ev.stopPropagation();
  // });


  //    this.db.list('jobrole/', null, function (response) {
  //
  //        this.jobroles = response;
  //
  //    }, function (response) {
  //        //this.token=response.statusText;
  //    });

  // $('.validate').validate('#addnewjobform');
  // $('.validate').validate('#assignCandidate');
  // $('.validate').validate('#submitjob');


  loadManagerclientdetail(): void {
    this.USR.loadmyteam();
    this.db.list('department/list-client/', null, (response): void => {
      this.clientdetails = response;
    });
  }

  // this.minimumSalary = this.min;
  // this.maximumSalary = this.max;




  selectedmanagerlistset(id): void {
    if (this.selectedmanagerlist.indexOf(id) > -1) {
      if (this.selectedmanagerlist.length > 0) {
        // this.selectedmanagerlist.pop(id);
      }
    } else {
      this.selectedmanagerlist.push(id);
    }

  }


  applicationdepartment(): void {
    debugger;
    this.db.list('department/list-department/', {}, (response): void => {

      this.departments = response;

      setTimeout(function () {
        $('.repeatcheckbox .checkbox-material').each(function () {

          $(this).parent().find('.visible').removeClass('visible');

        });
      }, 1000);

    });
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

  // getlist(): void {

  //   this.db.list('joblist/', {
  //     'candidate': this.searchcandidate
  //   }, ((response): void => {
  //     this.myjoblist = response;
  //     //this.bindJoblist(this.jobslistmain);
  //   }));
  // };


  // $.material.init();
  checkexistingjob(): void {

    if (this.checkexistjob == this.myjob.job_title) {

      this.db.addmessageandremove('this job already added change job title');
    }

    else {

      this.addNewJobSave();
    }
  }
  addNewJobSave(): void {

    //
    this.myjob.keyskills = this.skills;
    this.myjob.job_status = 'Active';

    if (this.checkexistjob == this.myjob.job_title) {
      alert('');

      ('existing job');
    }

    if (this.db.mp.btn_can_call == true) {
      if (this.myjob.calltype == null || this.myjob.calltype == undefined) {
        this.db.addmessageandremove('The Call Type field is required.');
        return;
      }
    }
    //    if ($('.validate').validate('#addnewjobform', true)) {
    if (true) {
      const locations = this.location;
      let locationstr = '';
      for (const j in locations) {
        if (locations[j].$ngOptionLabel) {
          locationstr += locations[j].$ngOptionLabel + ',';
        }

      }
      if (locationstr == '') {
        // locationstr = this.location[0];
        for (const j in locations) {
          if (locations[j]) {
            locationstr += locations[j] + ',';
          }
        }
      }
      if (this.myjob.is_client == 'Client') {
        this.myjob.is_client = 1;
        this.isClientdata = true;
        this.isDepartmentdata = false;
      }
      else if (this.myjob.is_client == 'Department') {
        this.myjob.is_client = 0;
        this.isClientdata = false;
        this.isDepartmentdata = true;
      }
      const keyskills = this.myjob.keyskills;

      let keyskillstr = '';
      for (const j in keyskills) {
        if (keyskills[j]) {
          keyskillstr += keyskills[j] + ',';
        }

      }


      if (this.myjob.start_date?.length == undefined) {
        this.myjob.start_date = this.db.toYYMMDD(this.myjob.start_date);
      }
      if (this.myjob.end_date?.length == undefined) {
        this.myjob.end_date = this.db.toYYMMDD(this.myjob.end_date);
      }
      this.myjob.keyskills = keyskillstr;
      this.myjob.location = locationstr;
      // this.myjob.start_date = this.db.toYYMMDD(this.start_date_temp);
      // this.myjob.end_date = this.db.toYYMMDD(this.end_date_temp);
      this.myjob.minimum_salary = (this.myjob.minimumSalarylac * 100000) + (this.myjob.minimumSalarythousand * 1000);
      //   =resultmin.tostring();
      this.myjob.maximum_salary = (this.myjob.maximumSalarylac * 100000) + (this.myjob.maximumSalarythousand * 1000);

      // this.myjob.functionalArea = this.functionalArea.functionalAreaName;
      const topost = this.myjob;
      if (this.myjob.functionalArea !== undefined) {
        topost.functionalArea = this.myjob.functionalArea;
      } else {
        topost.functionalArea = '';
      }

      topost.departments = this.Referraldepartments;
      // this.user.profilepic=this.user.profilepic[0];
      if (this.myjob.minimum_salary > this.myjob.maximum_salary) {
        this.db.addmessageandremove('Maximum salary cannot be less then minimum salary.');
      } else {
        this.db.store('job/create-job/', topost, (response): void => {
          $('#NextPageOrNot').appendTo('body').modal('show');
          this.createupdate = 'Created';
          this.db.addmessageandremove('Data save Successfully');
          this.joblist();
          this.hidesavebutton = true;
          for (const i in this.myjob) {
            if (this.myjob[i]) {
              this.myjob[i] = '';
            }
          }
          // this.location = '';
          // this.functionalArea = '';

          const messagejobsuccess = 'We are reviewing this job.  It helps you getting higher number of referrals'
            + '.<br/>   Meanwhile Your team can work on this job. '
            + '<br/> Job will be live on website after review ';
          this.db.showMessage(messagejobsuccess, 'Good job done !');

        });
      }
    }
  }


  checkInterviewround(): void {

    this.myjob.interview_round;
    this.InterviewsRounds = [];

    $('#InterviewRounds').appendTo('body').modal('show');
    for (let i = 0; i < this.myjob.interview_round; i++) {
      const ids = i + 1;
      this.InterviewsRounds.push({
        id: ids,
        managersid: '',
        event_name: '',
        event_limit: '',
      });
    }
  }

  saveinterviewround(data): void {

    this.InterviewsRounds.length;

    if (data == 'close') {
      if (confirm('Aer you sure!')) {
        $('#InterviewRounds').appendTo('body').modal('hide');
        this.myjob.interview_round = '';
      }
    } else {
      for (let i = 0; i < this.myjob.interview_round; i++) {
        const interviewround = i + 1;
        if (this.InterviewsRounds[i].managersid == '') {
          $('#Interview_round_error').text('Hiring Manager Interview Round' + interviewround + ' Field Required');
          $('#Interview_round_error').fadeIn(500);
          $('#Interview_round_error').fadeOut(5000);
          return;
        } else if (this.InterviewsRounds[i].event_name == '') {
          alert('en');
          $('#Interview_round_error').text('Event Name Interview Round' + interviewround + ' Field Required');
          $('#Interview_round_error').fadeIn(500);
          $('#Interview_round_error').fadeOut(5000);
          return;
        } else if (this.InterviewsRounds[i].event_limit == '') {
          $('#Interview_round_error').text('Event Limit Interview Round' + interviewround + ' Field Required');
          $('#Interview_round_error').fadeIn(500);
          $('#Interview_round_error').fadeOut(5000);
          return;
        } else {
          this.interviewhiring_manager_id.push({ count: this.InterviewsRounds[i].managersid });
          this.interviewevent_name.push({ count: this.InterviewsRounds[i].event_name });
          this.interviewevent_limit.push({ count: this.InterviewsRounds[i].event_limit });
        }

        if (this.myjob.interview_round == i + 1) {
          this.myjob.hiring_manager_id = JSON.stringify(this.interviewhiring_manager_id);
          this.myjob.event_name = JSON.stringify(this.interviewevent_name);
          this.myjob.event_limit = JSON.stringify(this.interviewevent_limit);

          $('#InterviewRounds').appendTo('body').modal('hide');

        }
      }
    }
  }


  saveJobType(data): void {
    if (data == 'close') {
      if (confirm('Aer you sure!')) {
        $('#InterviewRounds').appendTo('body').modal('hide');
        this.myjob.interview_round = '';
      }
    } else {


    }
  }


  Referraljob(): void {
    if (this.myjob.isReferral == 'Yes') {
      this.referral = true;
    } else {
      this.referral = false;

    }
  }

}