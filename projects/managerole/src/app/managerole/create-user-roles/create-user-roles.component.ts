import { Component } from '@angular/core';
import { DbService } from '../../../../../../src/app/services/db.service'

@Component({
  selector: 'app-create-user-roles',
  templateUrl: './create-user-roles.component.html',
  styleUrls: ['./create-user-roles.component.scss']
})
export class CreateUserRolesComponent {

  constructor(private db: DbService) {
  }

  ngOnInit() {

  }

  role_name: any;
  role_category: number;
  can_distribute_power: any;


  url: any = 'permissions/create-user-role/'; // Example dynamic data
  onButtonSubmit() {
    const number_role_category = Number(this.role_category)
    const postData = {
      "rolename": this.role_name,
      "role_category": number_role_category,
      "can_redistribute_power": this.can_distribute_power
    };
    console.log(postData, ':postData')
    this.db.store(this.url, postData, ((response): void => {
      console.log('API Response:', response);
      location.reload();
      // Handle the API response here
    }
    )
    );
  }

}
