import { Component, TemplateRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER, R } from '@angular/cdk/keycodes';
import { SharedService } from '../shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JourneyService } from '../journey-service.service';
// import { FormBuilder, FormGroup } from '@angular/forms';
interface TestTypesMapping {
  [key: string]: string[];
}
interface RecruitmentProcessData {
  application_id: number;
  user_id: number;
  journey_id: any; // You might want to specify a more specific type for journey_id
  interview_rounds_dict: any; // You might want to specify a more specific type for interview_rounds_dict
}
interface InterviewRoundData {
  interview_round_no: string;
  interview_type: string;
  bot_type: string;
  bot_variant: string;
  bot_segment: string;
  campaign_type: string;
  campaign_variant: string;
  campaign_segment: string;
  skills: string;
  qualifying_criteria: string;
  hiring_manager_name: string;
  integration_type: string;
  test_type: string;
  close_link_within: string;
  state: string;
  address1: string;
  address2: string;
  city: string;
  date: string;
  time: string;
  bot_language: string;
  when_to_trigger: string;
  relative_time: string;
  is_online: string;
}
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import axios from 'axios';
export interface Fruit {
  name: string;
}
@Component({
  selector: 'app-newjob',
  templateUrl: './newjob.component.html',
  styleUrls: ['./newjob.component.scss'],
})
export class NewjobComponent {
  roundData: InterviewRoundData[] = [];
  roundForm: FormGroup; 
  showForm = false; 
  editingIndex: number | null = null;
  constructor(
    private JourneyDb: JourneyService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    public shared: SharedService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.roundForm = this.fb.group({
      interview_round_no: ['1'],  // Default to 1 for new rounds
      interview_type: [''],
      bot_type: [''],
      bot_variant: [''],
      bot_segment: [''],
      campaign_type: [''],
      campaign_variant: [''],
      campaign_segment: [''],
      skills: [''],
      qualifying_criteria: [''],
      hiring_manager_name: [''],
      integration_type: [''],
      test_type: [''],
      close_link_within: [''],
      state: [''],
      address1: [''],
      address2: [''],
      city: [''],
      date: [''],
      time: [''],
      bot_language: [''],
      when_to_trigger: ['24'],  // Default value for when_to_trigger
      relative_time: [''],
      is_online: ['']
    });
  }
  url = 'http://192.168.4.14:8000/';
  interviewRounds: any[] = [];
  interviewRoundsDataFromBackend: any[] = [];
  formData: any[] = [];
  interviewType: string = '';
  botType: string = '';
  botVariant: string = '';
  botSegment: any = '';
  campaignType: string = '';
  campaignVarient: string = '';
  campaignSegment: string = '';
  skills = [];
  qualifyingCriteria: string = '';
  hiringManager: string = '';
  integrationType: string = '';
  testType: string = '';
  closeLinkWithin: string = '';
  state: string = '';
  address1: string = '';
  address2: string = '';
  city: string = '';
  date: string = '';
  time: string = '';
  interviewRoundId: any;
  botVariantArray: any;
  journeyType: any;
  flowdataid: any;
  decoded: any;
  id: any;
  language: any;
  ngOnInit() {
    this.journeyType = this.shared.getMessage();
    this.route.paramMap.subscribe((paramMap) => {
      this.flowdataid = paramMap.get('demoId');
      this.decoded = window.atob(this.flowdataid);
      this.id = Number(this.decoded);
    });
  }
  openDialog(templateRef: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(templateRef);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed : ', result);
    });
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  Skills: Fruit[] = [];

  announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.Skills.push({ name: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Fruit): void {
    const index = this.Skills.indexOf(fruit);

    if (index >= 0) {
      this.Skills.splice(index, 1);

      this.announcer.announce(`Removed ${fruit}`);
    }
  }

  edit(fruit: Fruit, event: MatChipEditedEvent) {
    const value = event.value.trim();
    if (!value) {
      this.remove(fruit);
      return;
    }

    // Edit existing fruit
    const index = this.Skills.indexOf(fruit);
    if (index >= 0) {
      this.Skills[index].name = value;
    }
  }

  // Saving All Round data start
  PostData() {
    const recruitment_process_data = {
      journey_name: 'sagar',
      journey_type: 'walk-in',
      application_id: 1,
      job_id: 1,
      user_id: 1,
      department_id: 1,
      no_of_rounds: 1,
      interview_rounds_dict: this.formData,
    };
    this.shared.setRecruitmentProcessData(recruitment_process_data);
    const formData = new FormData();

    for (const key in recruitment_process_data) {
      if (
        key !== 'interview_rounds_dict' &&
        Object.prototype.hasOwnProperty.call(recruitment_process_data, key)
      ) {
        formData.append(key, String((recruitment_process_data as any)[key]));
      }
    }

    recruitment_process_data.interview_rounds_dict.forEach((item, index) => {
      for (const prop in item) {
        if (Object.prototype.hasOwnProperty.call(item, prop)) {
          formData.append(
            `interview_rounds_dict[${index}][${prop}]`,
            item[prop]
          );
        }
      }
    });
    console.log('FormData : ', formData);
    axios
      .post(`${this.url}create_recruitment_process`, formData)
      .then((response) => {
        console.log('All data sent successfully', response);
        this.formData = [];
      })
      .catch((error) => {
        console.error('Error sending all data', error);
      });
    this.router.navigate(['/journey/allRoundData']);
  }
  // Saving All Round data end


  



  markAsOnline = false;

  toggleMarkAsOnline(event: any) {
    this.markAsOnline = event.target.checked;
  }
  selectedIntegrationType = '';
  testTypesMapping: TestTypesMapping = {
    GFG: ['GFG Test 1', 'GFG Test 2', 'GFG Test 3'],
    HackerRank: ['HackerRank Test 1', 'HackerRank Test 2'],
    HackerEarth: ['HackerEarth Test 1', 'HackerEarth Test 2'],
    CodeChef: ['CodeChef Test 1', 'CodeChef Test 2', 'CodeChef Test 3'],
  };

  testTypes: string[] = [];

  onIntegrationTypeChange(type: string, selectedType: string) {
    console.log('type : ', type);
    switch (type) {
      case 'integrationType': {
        this.selectedIntegrationType = selectedType;
        this.testTypes = this.testTypesMapping[selectedType] || [];
        return;
      }
      case 'testType': {
        this.selectedIntegrationType = selectedType;
        this.testTypes = this.testTypesMapping[selectedType] || [];
        return;
      }
    }
  }
  showTab = false;
  tabToggle(index: any) {
    // debugger;
    if (index == 'interval') {
      this.showTab = true;
    } else {
      this.showTab = false;
    }
  }
  shouldShowDiv(i: number, showTab: boolean): boolean {
    return showTab && i !== 0;
  }

// Method to fetch all rounds from the backend
//   fetchRoundData(): void {
//     const data = {
//       interview_round_no: '1',  // Default to 1 for new rounds
//       interview_type: '',
//       bot_type: '',
//       bot_variant: '',
//       bot_segment: '',
//       campaign_type: '',
//       campaign_variant: '',
//       campaign_segment: '',
//       skills: '',
//       qualifying_criteria: '',
//       hiring_manager_name: '',
//       integration_type: '',
//       test_type: '',
//       close_link_within: '',
//       state: '',
//       address1: '',
//       address2: '',
//       city: '',
//       date: '',
//       time: '',
//       bot_language: '',
//       when_to_trigger: '24',  // Default value for when_to_trigger
//       relative_time: '',
//       is_online: ''
//     };
//     const recruitment_process_data: RecruitmentProcessData = {
//       application_id: 1,
//       user_id: 1,
//       journey_id: this.id,
//       interview_rounds_dict: data,
//     };
//     const formData = new FormData();

//     // Append application_id, user_id, and journey_id
//     formData.append(
//       'application_id',
//       recruitment_process_data.application_id.toString()
//     );
//     formData.append('user_id', recruitment_process_data.user_id.toString());
//     formData.append(
//       'journey_id',
//       recruitment_process_data.journey_id.toString()
//     );

//     const interview_rounds_dict =
//       recruitment_process_data.interview_rounds_dict;
//     for (const key in interview_rounds_dict) {
//       if (Object.prototype.hasOwnProperty.call(interview_rounds_dict, key)) {
//         const value = interview_rounds_dict[key];
//         formData.append(
//           `interview_rounds_dict[${key}]`,
//           typeof value === 'number' ? value.toString() : value
//         );
//       }
//     }

//     axios
//     .post(`${this.url}define_recruitment_process`, formData)
//     .then((response) => {
//       console.log('response : ' , response.data.results);
//       if (response.data.results && response.data.results.length > 0) {
//         this.roundData = response.data.results;
//         console.log('rounddataif : ' , this.roundData)
//       }else {
//           this.roundData = [{
//             interview_round_no: '1',
//             interview_type: '',
//             bot_type: '',
//             bot_variant: '',
//             bot_segment: '',
//             campaign_type: '',
//             campaign_variant: '',
//             campaign_segment: '',
//             skills: '',
//             qualifying_criteria: '',
//             hiring_manager_name: '',
//             integration_type: '',
//             test_type: '',
//             close_link_within: '',
//             state: '',
//             address1: '',
//             address2: '',
//             city: '',
//             date: '',
//             time: '',
//             bot_language: '',
//             when_to_trigger: '24',
//             relative_time: '',
//             is_online: ''
//           }];
//         }
//       },
//       (error) => {
//         console.error('Error fetching round data', error);
//       }
//     );
//   }

//   // Method to toggle the form visibility for adding a new round
//   toggleForm(): void {
//     this.showForm = !this.showForm;
//     this.editingIndex = null; 
//     this.roundForm.reset({ interview_round_no: '1', when_to_trigger: '24' }); // Reset form with defaults
//   }

//   // Method to submit the new round
//   submitRound(): void {
//     const id = 'SOME_ID'; // Replace with the actual ID
//     const formData: InterviewRoundData = this.roundForm.value;

//     if (this.editingIndex !== null) {
//       // Handle editing existing round
//       this.roundData[this.editingIndex] = formData;
//       this.editingIndex = null;
//       this.showForm = false;
//     } else {
//       // Handle adding new round
//       this.interviewRoundService.addRound(id, formData).subscribe(
//         (response: InterviewRoundData[]) => {
//           this.roundData = response; // Update roundData with the response
//           this.showForm = false; // Hide the form after submission
//           this.roundForm.reset({ interview_round_no: '1', when_to_trigger: '24' }); // Reset the form for new entries
//         },
//         (error) => {
//           console.error('Error adding round', error);
//         }
//       );
//     }
//   }





}




