import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobCandidateRoutingModule } from './job-candidate-routing.module';
import { JobCandidateComponent } from './job-candidate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';
// import { ComponentsModule } from 'projects/component/src/app/components/components.module';


@NgModule({
  declarations: [
    JobCandidateComponent,

    
  ],
  imports: [
    CommonModule,
    JobCandidateRoutingModule,
    FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule,
    MatRippleModule, MatTooltipModule, MatCheckboxModule, MatProgressBarModule, MatCardModule, MatRadioModule, MatMenuModule,
    MatButtonToggleModule, MatTabsModule, MatProgressSpinnerModule,
    MatIconModule, NgxPaginationModule,
    MatBadgeModule, MatDatepickerModule,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class JobCandidateModule { }
