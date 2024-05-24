
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { NgSelectModule } from '@ng-select/ng-select';
import { MyJobRoutingModule } from './my-job-routing.module';
import { MyJobComponent } from './my-job.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatIconModule } from '@angular/material/icon';
// import { OrderModule } from 'ngx-order-pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';


@NgModule({
  declarations: [
    MyJobComponent
  ],
  imports: [
    CommonModule,
    MyJobRoutingModule,
    // NgSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    MatBadgeModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatCardModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatRippleModule,
    MatInputModule,
    MatSelectModule,
    NgxPaginationModule,
    MatIconModule,
    FormsModule, ReactiveFormsModule ,
    RouterModule,
    MatMenuModule,
    MatFormFieldModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class MyJobModule { }

