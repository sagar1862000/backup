import {
  Component,
  ElementRef,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { DbService } from '../services/db.service';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
import {
  MatDialog,
  MatDialogModule,
  MatDialogConfig,
} from '@angular/material/dialog';
import { CandidateProfileService } from '../candidateprofile-service.service';
// import { MatDialog } from '@angular/material/dialog';
// import { DialogConfig } from '@angular/cdk/dialog';
import { SharedService } from '../shared/shared.service';
@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
})
export class MainContentComponent {
  // @ViewChild('resumeInput') resumeInput!: ElementRef<HTMLInputElement>;
  url = 'http://192.168.4.14:8000/';
  constructor(
    public db: DbService,
    private http: HttpClient,
    public dailog: MatDialog,
    private CPService: CandidateProfileService,
    private shared:SharedService
  ) {}
  ngOnInit() {
    this.CandidateDetails();
    this.Experience();
  }
  _candidateId = '';
  @Input()
  set CandidateId(data: any) {
    if (data) {
      this._candidateId = data;
    }
  }
  candidateIds: any;
  @Input()
  set AllCandidateIds(data:any) {
    if(data){
      this.candidateIds=data;
    }
  }
  // ngDoCheck() {
  //   this._candidateId=this.shared.getMessage();
  //   this.candidateDetails();
  // }




  // candidateDetails='';
  candidateDetails: any;
  experienceDetails: any;
  Mailto: any;
  MailSubject: any;
  MailBody: any;
  MailCC: any;
  MailBCC: any;
  showCC: boolean = false;
  showBCC: boolean = false;
  messages: { text: string; date: Date }[] = [];
  newMessage: string = '';

  postMessage(): void {
    if (this.newMessage.trim() !== '') {
      this.messages.push({ text: this.newMessage, date: new Date() });
      this.newMessage = '';
    }
  }

  toggleCC(): void {
    this.showCC = !this.showCC;
  }

  toggleBCC(): void {
    this.showBCC = !this.showBCC;
  }

  getMonthName(month: any) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return months[parseInt(month, 10) - 1]; // Convert month string to zero-based index
  }
  startDate: any;
  endDate: any;
  Experience() {
    this.CPService.list(
      `candidate/get_experience/${this._candidateId}/`,
      
      (response:any): void => {
        debugger;
        this.experienceDetails = response.data.experience;
        console.log('Experience : ', this.experienceDetails);
        this.startDate = `${this.getMonthName(
          this.experienceDetails.start_month
        )} ${this.experienceDetails.start_year}`;
        this.endDate = `${this.getMonthName(
          this.experienceDetails.end_month
        )} ${this.experienceDetails.end_year}`;
      }
    );

    // axios
    //   .get(`${this.url}get_experience/${this._candidateId}/`)
    //   .then((response) => {
    //     this.experienceDetails = response.data.experience;
    //     console.log('Experience : ', this.experienceDetails);
    //     this.startDate = `${this.getMonthName(
    //       this.experienceDetails.start_month
    //     )} ${this.experienceDetails.start_year}`;
    //     this.endDate = `${this.getMonthName(
    //       this.experienceDetails.end_month
    //     )} ${this.experienceDetails.end_year}`;
    //     console.log(
    //       'Start Date : ',
    //       this.startDate,
    //       'End Date : ',
    //       this.endDate
    //     );
    //   })
    //   .catch((error) => {
    //     console.error('Upload failed', error);
    //   });
  }

  CandidateDetails() {
    this.CPService.list(
      `candidate/candidate/${this._candidateId}/`,
      null,
      (response): void => {
        this.candidateDetails = response;
        console.log("details : " , this.candidateDetails);
      }
    );

    // axios
    //   .get(`${this.url}candidate_details/${this._candidateId}/`)
    //   .then((response) => {
    //     this.candidateDetails = response.data;
    //     console.log(this.candidateDetails);
    //   })
    //   .catch((error) => {
    //     console.error('Upload failed', error);
    //   });
  }

  @ViewChild('resumeFrame') resumeFrame!: ElementRef<HTMLIFrameElement>;
  _MyReference = '';
  @Input()
  set reference(data: any) {
    if (data) {
      console.log('MyData : ', data);
      this._MyReference = data;
    }
  }

  resumeFile: File | null = null;
  selected: any;

  displayResume(resumeLink: string): void {
    if (this.resumeFrame.nativeElement) {
      this.resumeFrame.nativeElement.src = resumeLink;
      // console.log('Resume Link : ' , resumeLink);
      console.log('Resume Link : ', this.resumeFrame.nativeElement.src);
    }
  }
  UploadResume(files: FileList | null): void {
    if (files && files.length > 0) {
      const formData = new FormData();

      const file = files[0]; // Handle the file separately

      const formDataObject = {
        application_id: '1',
        mobile_no: '123456774',
        email: 'example24@gmail.com',
        resume: {
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
        },
      };

      this.CPService.store(
        `candidate/Resume/${this._candidateId}/`,
        formDataObject,
        (response): void => {
          this.displayResume(response.data.static_link);
        }
      );

      // formData.append('resume', files[0], files[0].name);
      // formData.append('application_id', '1');
      // formData.append('mobile_no', '123456774');
      // formData.append('email', 'example24@gmail.com');

      // axios
      //   .post(`${this.url}Resume/`, formData, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      //   })
      //   .then((response) => {
      //     this.displayResume(response.data.static_link);
      //   })
      //   .catch((error) => {
      //     console.error('Upload failed', error);
      //   });
    }
  }

  UploadDocument(Document: any) {
    const formData = new FormData();
    const documentFile = Document; 

    const formDataObject = {
      application_id: '1',
      mobile_no: '123456774',
      email: 'example26@gmail.com',
      documents: {
        fileName: documentFile.name,
        fileSize: documentFile.size,
        fileType: documentFile.type,
      },
    };
    this.CPService.store(
      `candidate/Resume/${this._candidateId}/`,
      formDataObject,
      (response): void => {
        this.displayResume(response.data.static_link);
      }
    );
    // formData.append('documents', Document);
    // formData.append('application_id', '1');
    // formData.append('mobile_no', '123456774');
    // formData.append('email', 'example26@gmail.com');
    // axios
    //   .post(`${this.url}documents/`, formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     // console.log('Upload successful', response.data.static_link);
    //   })
    //   .catch((error) => {
    //     console.error('Upload failed', error);
    //   });
  }

  files: File[] = [];

  onFileSelected(event: any): void {
    const selectedFiles = event.target.files;
    for (let i = 0; i < selectedFiles.length; i++) {
      this.files.push(selectedFiles[i]);
      this.UploadDocument(selectedFiles[i]);
    }
  }

  removeFile(file: File): void {
    this.files = this.files.filter((f) => f !== file);
  }

  rating: string = '';
  candidateThoughts = '';
  RatingInNum: number = 0;
  submitRating() {
    console.log('Selected Rating:', this.rating);
    console.log('Candidate Thought : ', this.candidateThoughts);
    switch (this.rating) {
      case 'very-poor':
        this.RatingInNum = 1;
        break;
      case 'poor':
        this.RatingInNum = 2;
        break;
      case 'good':
        this.RatingInNum = 3;
        break;
      case 'very-Good':
        this.RatingInNum = 4;
        break;
    }
  }

  saveScorecard() {
    const formData = new FormData();

    const formDataObject = {
      application_id: '1',
      mobile_no: '123455774',
      email: 'example13@gmail.com',
      overall_rating: this.RatingInNum.toString(),
      comments: this.candidateThoughts,
    };
    this.CPService.store(
      `candidate/scorecard/${this._candidateId}/`,
      formDataObject,
      (response): void => {
        this.displayResume(response.data.static_link);
      }
    );
    // axios
    //   .post(`${this.url}scorecard/1/`, formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   })
    //   .then((response) => {
    //     console.log('Upload successful', response);
    //     // this.displayResume(response.data.static_link);
    //   })
    //   .catch((error) => {
    //     console.error('Upload failed', error);
    //   });
  }

  SubmitMail() {
    const formData = new FormData();

    const formDataObject = {
      application_id: '1',
      to: this.Mailto,
      subject: this.MailSubject,
      message: this.MailBody,
    };

    this.CPService.list(`send-email`, null, (response): void => {
      debugger;
      this.displayResume(response.data.static_link);
    });

    // formData.append('application_id', '1');
    // formData.append('to', this.Mailto);
    // formData.append('subject',this.MailSubject);
    // formData.append('message',this.MailBody);
    // axios
    // .get(`${this.url}send-email/`)
    // .then((response) => {
    //   console.log('Upload successful', response);
    //   // this.displayResume(response.data.static_link);
    // })
    // .catch((error) => {
    //   console.error('Upload failed', error);
    // });
  }

  openDailog(templateRef: TemplateRef<any>): void {
    const dialogConfig = new MatDialogConfig();

    // Set position
    dialogConfig.position = {};
    // Other configuration settings
    // dialogConfig.width = '500px';
    // dialogConfig.height = '300px';
    // dialogConfig.panelClass = 'custom-dialog-container';
    const dialogRef = this.dailog.open(templateRef, dialogConfig);

    // Subscribe to the afterClosed event if you need to handle the dialog close event
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed:', result);
    });
  }

  // onFileSelectedForMail(event:any): void {
  //   if (event.target.files && event.target.files[0]) {
  //     this.email.attachment = event.target.files[0];
  //   }
  // }
}
