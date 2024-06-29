import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgencyRoutingModule } from './agency-routing.module';
import { AgencyComponent } from './agency.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ComponentsModule } from 'projects/component/src/app/components/components.module';


@NgModule({
  declarations: [
    AgencyComponent
  ],
  imports: [
    CommonModule,
    AgencyRoutingModule, 
    ReactiveFormsModule,
     MatFormFieldModule, 
     MatSelectModule,
      MatInputModule, 
      MatButtonModule,
    MatRippleModule, 
    MatTooltipModule, 
    MatCheckboxModule, 
    MatProgressBarModule,
     MatCardModule,
      MatRadioModule,
    MatButtonToggleModule, 
    MatTabsModule,
     MatDatepickerModule, 
     MatAutocompleteModule, 
     ComponentsModule, 
    //  AgGridModule,
    FormsModule
  ]
})
export class AgencyModule { }
