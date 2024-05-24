import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import { ActivatedRoute } from '@angular/router';
import { HiringManagerComponent } from '../hiring-manager.component';
import { UntypedFormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-new-hiring',
  templateUrl: './create-new-hiring.component.html',
  styleUrls: ['./create-new-hiring.component.scss']
})


export class CreateNewHiringComponent implements OnInit {
  constructor(public db: DbService, public route: ActivatedRoute, public hm: HiringManagerComponent, private router: Router) { }
  // message: any;
  hiringmanager = {
    id: '',
    name: '',
    email: '',
    mobile: '',
    department: '',
    available_start_time: '',
    available_end_time: '',
    off_days: [],
    msg_snd: '',
    calendar: '',
    platform: '',
    department_id: ''
  };


  isEditTemplate: boolean = false
  Template_Category: any;
  selectedValueStatus: any;
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    // debugger;
    if (id !== null) {
      this.isEditTemplate = true;
      this.LoadTemplates(id);
    }
    this.applicationdepartment()
  }

  LoadTemplates(id): void {
    this.db.show('hiring-manager/', id, (response): void => {
      response={
        id: response.id,
       name: response.name,
       email: response.email,
       mobile: response.mobile,
       department: response.department,
       available_start_time: response.available_start_time.substring(0, 5),
       available_end_time: response.available_end_time.substring(0, 5),
      //  off_days: response.off_days.slice(1,-1),
      off_days: response.off_days.slice(1, -1).split(',').map(Number),
       msg_snd: response.msg_snd,
       calendar: response.calendar,
       platform: response.platform,
       department_id: response.department_id,
     }
      this.hiringmanager = response;
    });
  }


  onSaveMessageTemplate(): void {
    debugger;
    this.db.store('hiring-manager/', this.hiringmanager, ((response): void => {
      this.hm.LoadTemplates();
    }));
  }

  onUpdateMessageTemplate(): void {
    // debugger;
    this.hiringmanager;
      this.db.update('hiring-manager/', this.hiringmanager.id, this.hiringmanager, ((response): void => {
      // this.hm.LoadTemplates();
      this.hm.LoadData();
      this.router.navigate(['/hiring-manager'])

    }));
  }

  // checkWhatsInput(): void {
  //   this.message.name;
  //   const words = this.message.name.split(' ')
  //   // for txt in words
  //   let test = []
  //   for (let i = 0; i < words.length; i++) {
  //     const keywordRegex = /\{\s+/;
  //     // const data = keywordRegex.test(words[i])
  //     // test.push(data);

  //     if (words[i].includes('{') && !words[i].includes('}')) {
  //       console.log('Data :' + words[i]);
  //     } else {
  //       console.log("simple:" + words[i])
  //     }
  //   }
  //   // debugger;


  //   if (this.hiringmanager.name.includes('{') && this.hiringmanager.name.includes('}')) {
  //     // The inputString contains curly braces, do nothing
  //     console.log('Data contains curly braces.');
  //   } else {
  //     // The inputString does not contain curly braces, call your function
  //     // this.yourFunction();
  //     console.log(this.hiringmanager.name)
  //   }

  //   // const regex = /\{([^}]+)\}/g;
  //   // const matches = this.message.template_name.match(regex);
  //   // let extractedKeywords = []
  //   // if (matches) {
  //   //   // Extracted keywords will be available in matches array
  //   //   extractedKeywords = matches.map(match => match.slice(1, -1));
  //   // } else {
  //   //   extractedKeywords = [];
  //   // }
  //   // debugger;
  //   // extractedKeywords;
  // }




  // department/list-department/   


  // offDaysForm: FormControl = new FormControl(this.hiringmanager.off_days);


  addHiringmanager(): void {
    debugger
    this.hiringmanager = {
      id: this.hiringmanager.id,
      name: this.hiringmanager.name,
      email: this.hiringmanager.email,
      mobile: this.hiringmanager.mobile,
      department: this.hiringmanager.department,
      available_start_time: `${this.hiringmanager.available_start_time}:00`,
      available_end_time: `${this.hiringmanager.available_end_time}:00`,
      off_days: this.hiringmanager.off_days,
      msg_snd: this.hiringmanager.msg_snd,
      calendar: this.hiringmanager.calendar,
      platform: this.hiringmanager.platform,
      department_id: this.hiringmanager.department_id,
    }

    console.log(this.hiringmanager);
    this.db.store('hiring-manager/', this.hiringmanager, ((response): void => {
      this.db.showMessage('Added Successfully');
      // this.LoadData();
      this.hiringmanager = {
        id: '',
        name: '',
        email: '',
        mobile: '',
        department: '',
        available_start_time: '',
        available_end_time: '',
        off_days: [],
        msg_snd: '',
        calendar: '',
        platform: '',
        department_id: ''

      };
    }));
  }


  alldepartments = [];
  applicationdepartment(): void {
    this.db.list('department/list-department/', {}, (response): void => {

      this.alldepartments = response;

    });
  }


  allWeekDays = [
    { id: 0, days: 'Sunday' },
    { id: 1, days: 'Monday' },
    { id: 2, days: 'Tuesday' },
    { id: 3, days: 'Wednesday' },
    { id: 4, days: 'Thursday' },
    { id: 5, days: 'Friday' },
    { id: 6, days: 'Saturday' },
  ]

  allPlatform = [
    { id: 0, source: 'Zoom' },
  ]

  allCalender = [
    { id: 0, calenderSource: 'Google' },

  ]

  emailFormControl = new UntypedFormControl('', [
    Validators.required,
    Validators.email,
  ]);

  onCloseChild() {
    this.router.navigate(['hiring-manager']);
  }


}

