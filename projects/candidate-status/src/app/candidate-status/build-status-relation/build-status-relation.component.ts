import { Component } from '@angular/core';
import { DbService } from '../../../../../../src/app/services/db.service'
import { statusService } from '../../candidate-status.service';
@Component({
  selector: 'app-build-status-relation',
  templateUrl: './build-status-relation.component.html',
  styleUrls: ['./build-status-relation.component.scss']
})
export class BuildStatusRelationComponent {

  constructor(private db: DbService , private statusDb:statusService) { }

  ngOnInit() {
    this.getCandidateStatusData()
  }

  candidate_id: [] = []
  candidateStatusData: any;
  getCandidateStatusData() {
    this.statusDb.list('candidate_status/candidate-status/', null, (response) => {
      this.candidateStatusData = response;
      // this.candidate_id = this.candidateStatusData.map((obj: { id: any; }) => obj.id);  //getting candidate id from the candidate Status Data
    });
  }


  candidateValueOne: any;
  candidateValueTwo: any;
  onSubmit() {
    const postData = {
      candidate_status: this.candidateValueOne,
      candidate_status_child: this.candidateValueTwo
    };
    console.log(postData, 'postData')
    this.statusDb.store('candidate_status/relations/', postData, ((response): void => {
      console.log('API Response:', response);
      // location.reload();
      // Handle the API response here
    })
    );
  }

}