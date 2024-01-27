import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CallDetailReportRoutingModule } from './call-detail-report-routing.module';
import { CallDetailReportComponent } from './call-detail-report.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { GridModule } from '../../../../../projects/grid/src/app/grid/grid.module'


@NgModule({
  declarations: [
    CallDetailReportComponent
  ],
  imports: [
    CommonModule,
    CallDetailReportRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    FormsModule,
    GridModule
  ]
})
export class CallDetailReportModule { }
