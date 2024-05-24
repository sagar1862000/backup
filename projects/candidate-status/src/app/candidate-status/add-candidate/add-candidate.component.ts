import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../../../../../../src/app/services/db.service'

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.scss']
})
export class AddCandidateComponent {

  constructor(private db: DbService, private router: Router,) {
  }

  ngOnInit() {
  }

  //Post the form Data
  postUsersFormData(UsersFormData: any) {
    if (UsersFormData.display_name == '') {
      alert('Please Enter Display Name')
      return
    }
    if (UsersFormData.root_name == '') {
      alert('Please Enter Root Name')
      return
    }
    if (UsersFormData.is_interview == '') {
      alert('Please Select Interview Status')
      return
    }
    if (UsersFormData.channel_id == '') {
      alert('Please Select Channel ID')
      return
    }

    //Post Api Call to Post the form Data
    this.db.store('candidate-status/candidate-status/', UsersFormData, ((response): void => {
      console.log('API Response:', response);
      return response;
      // Handle the API response here
    })
    );
    alert('Sucess')
    location.reload();
  }

}

