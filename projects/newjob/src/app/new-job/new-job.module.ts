import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewJobRoutingModule } from './new-job-routing.module';
import { NewJobComponent } from './new-job.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatOptionModule } from '@angular/material/core';






@NgModule({
  declarations: [
    NewJobComponent
  ],
  imports: [
    MatTabsModule,
    MatRippleModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatProgressBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatChipsModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
    MatAutocompleteModule,
    MatTooltipModule,
    CommonModule,
    NewJobRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    MatToolbarModule,
    MatInputModule,
    MatOptionModule

    
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [NewJobComponent]
})
export class NewJobModule { }
