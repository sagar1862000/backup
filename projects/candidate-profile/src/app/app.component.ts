// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent {
//   title = 'candidate-profile';
// }
import { Component, TemplateRef } from '@angular/core';
import { Route } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  decoded:any;
  Id:any;
  constructor(public dailog: MatDialog , public route:ActivatedRoute ) {
    debugger;
    let candidateId:any;
    this.route.paramMap.subscribe(params => {
      candidateId = params.get('id');
      this.decoded = window.atob(candidateId);
      this.Id = Number(this.decoded);
    });
    console.log('before decoding : ' , candidateId);
    console.log('Candidate Id : ' , this.Id);    
  }
  title = 'candidate-profile';
  MyReference = 'table';
  MyFunc(eventData: string) {
    this.MyReference = eventData;
  }
  openDailog(templateRef: TemplateRef<any>): void {
    const dialogConfig = new MatDialogConfig();

    // Set position
    dialogConfig.position = { top: '-150px', left: '100px' };
    // Other configuration settings
    dialogConfig.width = '1300px';
    dialogConfig.height = '560px';
    const dialogRef = this.dailog.open(templateRef,dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed:', result);
    });
  }
}