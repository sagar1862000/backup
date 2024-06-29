import { Component } from '@angular/core';
import { DbService } from '../../../../../../src/app/services/db.service'


@Component({
  selector: 'app-create-areas',
  templateUrl: './create-areas.component.html',
  styleUrls: ['./create-areas.component.scss']
})
export class CreateAreasComponent {

  constructor(private db: DbService,) {
    
  }


  ngOnInit(){

  }

  area: any;

  // onSubmit() {
  //   console.log(this.area,'gvyz');
  //   const postData = {
  //     'area_name': this.area,
  //   };
  //   // this.toast.success({detail:"Sucess", summary:"message", duration:5000})

  //   console.log(postData, 'postData')
  //   this.userData.postData3(postData).subscribe(response => {
  //     console.log('API Response:', response);
  //     location.reload();
  //     this.toast.success({detail:"Sucess", summary:response.message, duration:5000})
  //     alert('Sucess')
  //     // Handle the API response here
  //   });
  // }

  
  onSubmit() {
    const postData = {
      'area_name': this.area,
    };
    console.log(postData, 'postData');

    this.db.store('permissions/create-areas/', postData, ((response): void => {
      console.log('API Response:', response);
      location.reload();
      alert('Success');
      // Handle the API response here
    }
    )
    );
  }


}
