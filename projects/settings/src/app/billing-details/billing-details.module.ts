import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingDetailsRoutingModule } from './billing-details-routing.module';
import { BillingDetailsComponent } from './billing-details.component';

// import { NgSelectModule } from '@ng-select/ng-select';
// import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
// import { NgxPaginationModule, PaginatePipe } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { OrderModule } from 'ngx-order-pipe';


import { RouterModule } from '@angular/router';
// import { AgGridModule } from 'ag-grid-angular';

// import { ComponentsModule } from '../components/components.module';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
// import { GridComponent } from '../grid/grid.component';
import { MatFormFieldModule } from '@angular/material/form-field';
// import { PaginationControlsComponent } from 'ngx-pagination';
import { MatInputModule } from '@angular/material/input';
// import { PaginationControlsDirective } from 'ngx-pagination';
import { MatSelectModule } from '@angular/material/select';




@NgModule({
  declarations: [
    BillingDetailsComponent
  ],
  imports: [
    CommonModule,
    BillingDetailsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatButtonModule,
    RouterModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingDetailsModule { }
