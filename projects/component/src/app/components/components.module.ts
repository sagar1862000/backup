import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
// import { NgSelectModule } from '@ng-select/ng-select';
import { ExcelService } from 'src/app/services/excel.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { AddCandidateComponent } from './add-candidate/add-candidate.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { AddToJobComponent } from './add-to-job/add-to-job.component';
import { CallComponent } from './call/call.component';
import { ActivityComponent } from './activity/activity.component';
import { UpdateStatusComponent } from './update-status/update-status.component';



@NgModule({


  imports: [FormsModule,
    MatSelectModule, MatFormFieldModule, ReactiveFormsModule,
    MatCheckboxModule,
    MatInputModule, RouterModule, MatRadioModule,
    MatTabsModule,
    CommonModule, MatMenuModule,
    MatToolbarModule,


  ],
  declarations: [
    AddNoteComponent,
    CallComponent,
    AddCandidateComponent,
     AddToJobComponent, CallComponent, ActivityComponent, UpdateStatusComponent,
  ],
  exports: [
     AddNoteComponent,RouterModule, 
    AddCandidateComponent,AddToJobComponent, CallComponent,
    ActivityComponent
  ],
  providers: [ExcelService],

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],

})
export class ComponentsModule { }