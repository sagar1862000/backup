import { Component } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { JourneyService } from '../journey-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-starting-page',
  templateUrl: './starting-page.component.html',
  styleUrls: ['./starting-page.component.scss'],
})
export class StartingPageComponent {
  public Editor = ClassicEditor;
  Description: any;
  Journeytpe: any;
  JourneyName: any;
  res:any;
  allowRestart: any= false;
  isPublished: any = false;
  constructor(private JourneyDb:JourneyService, private router: Router,private shared: SharedService) {
    console.log('starting page loaded');
  }
  demoId : any;

  toggleAllowRestart(value: boolean): void {
    if(value===true)
    this.allowRestart = 1;
    else
    this.allowRestart = 0;
  }

  togglePublished(value: boolean): void {
    if(value===true)
    this.isPublished = 1;
    else
    this.isPublished = 0;
  }
  PostData() {
    const data = {
      journey_name: this.JourneyName,
      journey_category: this.Journeytpe,
      application_id: 1,
      user_id: 1,
      journey_description:this.Description,
      allow_contacts_to_restart_the_interview_cycle : this.allowRestart,
      is_published:this.isPublished,
      journey_segment:'demo' 
    };
    // console.log('message in start : ',data.journey_type)
    this.shared.setMessage(data.journey_category);

    const formData = new FormData();

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        formData.append(key, String((data as any)[key]));
      }
    }
    axios
      .post('http://192.168.4.14:8000/create_new_recruitment_process', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        this.res=response;
        this.demoId = response.data.journey_id
        // console.log('Data sent successfully:', response.data.journey_id);
        // console.log('type:', typeof(response.data.journey_id));
        // console.log('demoID : ' , this.demoId);
        // console.log('typedemo : ' , typeof(this.demoId))
        this.router.navigate(['/journey/journeyCycle',btoa(this.demoId)]);
        // this.router.navigate(['/journey/allRoundData']);

      })
      .catch((error) => {
        console.error('Error sending data:', error);
      });
    // this.router.navigate(['/home'+btoa(this.res.id)]); main
    // console.log('demoID : ' , this.demoId);
    // console.log('typedemo : ' , typeof(this.demoId))
    // this.router.navigate(['/home',btoa(this.demoId)]);
    //this.router.navigate(['campaign/flow/' + btoa(response.id), {}]);
  }
}