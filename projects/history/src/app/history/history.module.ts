import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './history.component';
// import { NgSelectModule } from '@ng-select/ng-select';
// import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MailerComponent } from './mailer/mailer.component';
import { AddToJobComponent } from 'projects/component/src/app/components/add-to-job/add-to-job.component';
import { CallComponent } from 'projects/component/src/app/components/call/call.component';
import { MasterService } from 'src/app/services/master.service';
import { ComponentsModule } from 'projects/component/src/app/components/components.module';
import { TuhinNewLibTestModule } from 'tuhin-new-lib-test';
// import { PrgridComponent } from 'projects/component/src/app/components/prgrid/prgrid.component';
// import { GridinternaldataComponent } from 'projects/component/src/app/components/gridinternaldata/gridinternaldata.component';
//import { ComponentsModule } from '../../shared/components.module';
// import { CallComponent } from '../../../../component/src/app/components/call/call.component';
// import { AddToJobComponent } from '../../../../component/src/app/components/add-to-job/add-to-job.component';
// import { BotGridModule } from 'bot-grid';
// import { GridInternalDataModule } from 'grid-internal-data';


@NgModule({
  declarations: [
    HistoryComponent,
    // MailerComponent,
    // CallComponent,
    // MailerComponent,
    // AddToJobComponent
    // AddToJobComponent,
    // CallComponent,
    MailerComponent,
    // AddToJobComponent,
    // // PrgridComponent,
    // GridinternaldataComponent

    
  ],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    RouterModule,
    MatMenuModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    // ComponentsModule
    // MyJobModule,
    // BotGridModule,
    // GridInternalDataModule,
    MatFormFieldModule,
    ComponentsModule,
    TuhinNewLibTestModule
    

  ],
  providers:[MasterService],
  
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HistoryModule { }
