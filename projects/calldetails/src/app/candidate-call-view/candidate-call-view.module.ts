import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateCallViewRoutingModule } from './candidate-call-view-routing.module';
import { CandidateCallViewComponent } from './candidate-call-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';
import { ComponentsModule } from 'projects/component/src/app/components/components.module';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MasterService } from 'src/app/services/master.service';


@NgModule({
  declarations: [
    CandidateCallViewComponent
  ],
  imports: [
    CommonModule,
    CandidateCallViewRoutingModule,
     FormsModule,ComponentsModule ,
     ReactiveFormsModule, 
     MatFormFieldModule, 
     MatSelectModule, 
     MatInputModule, 
     MatButtonModule,
    MatCheckboxModule, 
    MatButtonToggleModule, 
    MatDatepickerModule, 
    NgxPaginationModule, 
    MatSliderModule,
    MatSlideToggleModule, 
    MatIconModule, 
    MatTableModule,
    MatSidenavModule,
    MatMenuModule,
    MatBadgeModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers:[MasterService]
})
export class CandidateCallViewModule { }
