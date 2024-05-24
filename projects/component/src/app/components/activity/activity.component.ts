import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';
// import { CandidateDetailsComponent } from '../candidate-details.component';
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})

export class ActivityComponent implements OnInit {
  activities: any;
  constructor(public route: ActivatedRoute, private router: Router, public db: DbService, 
    // public  cd: CandidateDetailsComponent, 
    ) { }

  ngOnInit(): void {
    // this.router.navigate(['../activity', { candidateid:"asdasd" }], { relativeTo: this.route });
    // this.activity(this.cd.candidateshowdata.id);
  }
  public activity(data: any) {

    this.db.show('/activity/', data, (response): void => {


this.activities = response;

    //  this.rowdata.emit(this.activities);

      //  $('#activity').appendTo('body').modal('show');
      // jQuery.noConflict();
    // $('#activity').appendTo('body').modal('show');


    });


  }
}
