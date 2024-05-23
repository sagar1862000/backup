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
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public dailog: MatDialog) {}
  title = 'candidate-profile';
  MyReference = 'table';
  MyFunc(eventData: string) {
    // console.log('happen : ',eventData);
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