import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidateStatusRoutingModule } from './candidate-status-routing.module';
import { CandidateStatusComponent } from './candidate-status.component';
import { AddCandidateComponent } from './add-candidate/add-candidate.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { BuildStatusRelationComponent } from './build-status-relation/build-status-relation.component';


@NgModule({
  declarations: [
    CandidateStatusComponent,
    AddCandidateComponent,
    BuildStatusRelationComponent
    
  ],
  imports: [
    CommonModule,
    CandidateStatusRoutingModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    

  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CandidateStatusModule { }
