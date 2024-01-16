
import { CallDetailRoutingModule } from './call-detail-routing.module';
import { CallDetailComponent } from './call-detail.component';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { OrderModule } from 'ngx-order-pipe';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';
// import { MyFilterPipe } from 'src/app/shared/pipes/my-filter.pipe';
// import { ComponentsModule } from 'src/app/components/components.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ComponentsModule } from 'projects/component/src/app/components/components.module';
import { MasterService } from 'src/app/services/master.service';
import { ControlModule } from 'projects/control/src/app/control/control.module';
// import { CandidateCallViewComponent } from './candidate-call-view/candidate-call-view.component';

@NgModule({
  declarations: [
    CallDetailComponent,
    // CandidateCallViewComponent,
  ],
  imports: [
    CommonModule,
    CallDetailRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatBadgeModule,
    MatSelectModule,
    NgxPaginationModule,
    ComponentsModule,
    ControlModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers:[MasterService]
})
export class CallDetailModule { }
