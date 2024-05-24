import { Component, inject } from '@angular/core';
import { SharedService } from '../shared.service';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { JourneyService } from '../journey-service.service';
export interface Fruit {
  name: string;
}
@Component({
  selector: 'app-all-round-page',
  templateUrl: './all-round-page.component.html',
  styleUrls: ['./all-round-page.component.scss']
})
export class AllRoundPageComponent {
  constructor( private JourneyDb:JourneyService, public shared:SharedService) {}
  recruitment_process_data:any;
  roundsData:any;
  ngOnInit() {
    this.recruitment_process_data = this.shared.getRecruitmentProcessData();
    console.log('all round data : ' , this.recruitment_process_data);
    this.roundsData=this.recruitment_process_data.interview_rounds_dict;
    console.log('interiew rounds data : ' , this.roundsData);
    console.log('Interview Type : ' , this.roundsData[1].interview_type);
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
}