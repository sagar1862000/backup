import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlRoutingModule } from './control-routing.module';
import { AddCandidatesComponent } from './add-candidates/add-candidates.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AddCandidatesComponent
  ],
  imports: [
    CommonModule,
    ControlRoutingModule,
    RouterModule, CommonModule, FormsModule //ComponentsModule,
  , ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule,
    MatCheckboxModule, MatIconModule,
    MatButtonToggleModule, MatDatepickerModule,MatDialogModule
  ],
  exports:[AddCandidatesComponent]
})
export class ControlModule { }
