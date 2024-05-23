import { Component } from '@angular/core';
import { DbService } from '../../../../../../src/app/services/db.service'

@Component({
  selector: 'app-create-permission',
  templateUrl: './create-permission.component.html',
  styleUrls: ['./create-permission.component.scss']
})
export class CreatePermissionComponent {

  constructor(private db: DbService) {
  }

  ngOnInit() {
    this.getDataFromApi();
  }

  apidata: any;
  dynamicId: any = 'permissions/create-areas/'
  my_id: any;
  getDataFromApi() {
    this.db.list('permissions/create-areas/',null, (response): void => {
      this.apidata = response;
      this.my_id = this.apidata.map((obj: { area_name: any; }) => obj.area_name);
    });

  }

  areas:any;
  permission_names: any;
  onSubmit() {
    debugger
    // console.log(this.selected);
    const postData= {
      "areas": this.areas,
      "permission_name": this.permission_names
    };
    debugger
    console.log(typeof(postData.areas), 'postData')
    this.db.store('permissions/create-permission/', postData, ((response): void => {
      console.log('API Response:', response);
      location.reload();
      // Handle the API response here
    }
    )
    );
  }
}
