import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackerFieldsRoutingModule } from './tracker-fields-routing.module';
import { TrackerFieldsComponent } from './tracker-fields.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    TrackerFieldsComponent
  ],
  imports: [
    CommonModule,
    TrackerFieldsRoutingModule,
    CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule,
    MatRippleModule, MatTooltipModule, MatCheckboxModule, MatProgressBarModule, MatCardModule, MatRadioModule,
    MatButtonToggleModule, MatTabsModule, MatDatepickerModule, DragDropModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class TrackerFieldsModule { }
