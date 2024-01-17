import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNewHiringRoutingModule } from './create-new-hiring-routing.module';
import { CreateNewHiringComponent } from './create-new-hiring.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MasterService } from 'src/app/services/master.service';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    CreateNewHiringComponent
  ],
  imports: [
    CommonModule,
    CreateNewHiringRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatCardModule,
    MatInputModule,
    // MatTimepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatDatepickerModule,
    // NgxMaterialTimepickerModule,
    MatButtonModule,
    
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers:[MasterService]
})
export class CreateNewHiringModule { }
