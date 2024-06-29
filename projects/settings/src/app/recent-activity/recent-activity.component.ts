import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { DbService } from '../../../../../src/app/services/db.service';

@Component({
  selector: 'app-recent-activity',
  templateUrl: './recent-activity.component.html',
  styleUrls: ['./recent-activity.component.scss']
})
export class RecentActivityComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  Activities: any;

  constructor(public db: DbService,) { }

  ngOnInit(): void {
    this.GetRecentActivity();
  }

  GetRecentActivity(): void {
    
    this.db.list('login-activity/', {}, ((response): void => {
      
      this.Activities = response.data;
    }))
  }
}
