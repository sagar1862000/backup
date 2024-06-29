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
import { Subscription } from 'rxjs';
import { error } from 'jquery';
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
    private shared: SharedService
  ) {}
  Id: number;
  private idSubscription: Subscription;
  private refreshInitiatedManually = false;
  ngOnInit() {
    this.idSubscription = this.shared.currentId.subscribe((id) => {
      console.log('hi1');
      this.Id = id;
      this.CandidateDetails();
      this.getAllDocuments();
      this._MyReference = 'Referesh';
    });
    // this.getAllDocuments();
    this.getExperience();
  }
  _MyReference = '';

  // ngOnDestroy() {
  //   if (this.idSubscription) {
  //     this.idSubscription.unsubscribe();
  //   }
  // }

  // ngOnInit() {
  //   this.Id = this.shared.getId();
  //   this.CandidateDetails();
  //   this.Experience();
  // }
  // ngDoCheck(){
  //   this.Id = this.shared.getId();
  //   console.log('IdMain : ' , this.Id);
  //   this.CandidateDetails();
  // }
  _candidateId = '';
  @Input()
  set CandidateId(data: any) {
    if (data) {
      this._candidateId = data;
      console.log('_candidateId : ', this._candidateId);
      this.getAllDocuments();
    }
  }
  candidateIds: any;
  @Input()
  set AllCandidateIds(data: any) {
    if (data) {
      this.candidateIds = data;
    }
  }
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
  selectedOption: string;
  allDocuments: any;

  selectOption(option: string) {
    this.selectedOption = option;
  }

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
  monthMapping: { [key: string]: number } = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };
  getMonthName(month: any) {
    const monthNumber = this.monthMapping[month];
    if (monthNumber !== undefined) {
      console.log('month : ', monthNumber);
      return monthNumber;
    } else {
      console.error('Invalid month name:', month);
      return -1; // Return -1 or any other error value you choose
    }
  }
  startDate: any;
  endDate: any;
  getExperience() {
    debugger;
    this.CPService.list(
      `candidate/Experience/${this.Id}/`,
      null,
      (response): void => {
        // this.experienceDetails = response;
        this.experienceDetails = response;
        console.log('Experience : ', this.experienceDetails);
        this.startDate = `${this.experienceDetails[0].start_month} ${this.experienceDetails[0].start_year}`;
        this.endDate = `${this.experienceDetails[0].end_month} ${this.experienceDetails[0].end_year}`;
      }
    );
  }

  CandidateDetails() {
    this.CPService.list(
      `candidate/candidate/${this.Id}/`,
      null,
      (response): void => {
        this.candidateDetails = response;
        console.log('details : ', this.candidateDetails);
      }
    );
  }

  @ViewChild('resumeFrame') resumeFrame!: ElementRef<HTMLIFrameElement>;
  @Input()
  set reference(data: any) {
    console.log('me : ', this._MyReference);
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
        `candidate/Resume/${this.Id}/`,
        formDataObject,
        (response): void => {
          this.displayResume(response.data.static_link);
        }
      );
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
  }

  onFileSelected(event: any): void {
    console.log('event : ', event);
    const selectedFiles = event.target.files[0];
    console.log('Selected File', selectedFiles);
    const documentData = {
      user: 9,
      application_id: 1,
      documents_name: this.selectedOption,
      documents: selectedFiles,
      candidate_id: this._candidateId,
    };

    this.CPService.store(
      'candidate/Documents/',
      documentData,
      (response): void => {
        console.log('document response : ', response);
        if (response) {
          this.getAllDocuments();
        } else {
          console.log('error from frontend : ', error);
        }
      }
    );
  }

  getAllDocuments() {
    this.allDocuments = [];
    // debugger;
    this.CPService.list(
      `candidate/Documents/${this.Id}/`,
      null,
      (response): void => {
        this.allDocuments = response;
        this.allDocuments.forEach((doc) => {
          doc.icon = this.getFileIcon(doc.documents);
        });
        console.log('all documents : ', this.allDocuments);
      }
    );
  }

  getFileIcon(fileName: string): string {
    const extension = fileName.split('.').pop().toLowerCase();
    // console.log('extension : ' , extension);
    switch (extension) {
      case 'json':
        return 'fas fa-file-code';
      case 'md':
        return 'fas fa-file-alt';
      case 'ts':
        return 'fas fa-file-code';
      case 'js':
        return 'fas fa-file-code';
      case 'html':
        return 'fas fa-file-code';
      case 'css':
        return 'fas fa-file-code';
      case 'folder':
        return 'fas fa-folder';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'bmp':
        return 'fas fa-file-image';
      case 'pptx':
        return 'fas fa-file-powerpoint';
      case 'xlsx':
        return 'fas fa-file-excel';
      default:
        return 'fas fa-file';
    }
  }

  removeFile(fileId: any): void {
    console.log('fileId : ', fileId);
    if (confirm('Do you want to delete this document permanently')) {
      this.CPService.destroy(
        `candidate/delete/`,
        fileId,
        this.candidateDetails.candidate_id,
        (response: any): void => {
          console.log('removed');
          this.getAllDocuments();
        },
        (error:any):void=>{
          console.log('error while fetching : ' , error);
        }
      );
      // this.getAllDocuments();
    }
  }

  
  // this.journeyDb.list(
  //   'campaign_list/1',
  //   null,
  //   (response): void => {
  //     this.botData = response;
  //     console.log('my data : ', this.botData);
  //   },
  //   (error): void => {
  //     this.router.navigate(['journey/startingPage'])
  //   }
  // );

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
  }

  openDailog(templateRef: TemplateRef<any>): void {
    const dialogConfig = new MatDialogConfig();

    // Set position
    dialogConfig.position = {};
    const dialogRef = this.dailog.open(templateRef, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed:', result);
    });
  }
  initialDetails: any = {
    candidateName: '',
    headline: '',
    mobile_no: '',
    email: ''
  }; 
  showCheckmark=false;
  // showCheckmark = { candidateName: false, headline: false, mobile_no: false, email: false,qualification: false,currentDesignation:false, currentSalery:false,location:false };
  onInputChange(fieldName: string) {
    console.log('field : ',fieldName , 'bookmark : ',this.showCheckmark[fieldName]);
    // this.showCheckmark[fieldName] = this.candidateDetails[fieldName] !== this.initialDetails[fieldName];
    this.showCheckmark=true;
  }
  resetInput() {
    console.log('MyId: ',this._candidateId);
    this.CPService.update(
      `candidate/candidate/`,this.Id,
      this.candidateDetails,
      (response:any): void => {
        debugger;
        console.log('myresponse : ' , response);
      }
    );
    this.showCheckmark = false;
  }
}