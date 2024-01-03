
import { AddCandidateComponent } from './add-candidate/add-candidate.component';
import { ReactiveFormsModule } from '@angular/forms';
// import { GridComponent } from './../grid/grid.component';
// import { ScroolToTopButtomComponent } from '../scrool-to-top-buttom/scrool-to-top-buttom.component';
import { MatMenuModule } from '@angular/material/menu';
// import { PvGetReferenceComponent } from '../control/pv-get-reference/pv-get-reference.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AddToJobComponent } from './add-to-job/add-to-job.component';
import { MatTabsModule } from '@angular/material/tabs';
// import { OwlDateTimeModule } from 'ng-pick-datetime';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CallComponent } from './call/call.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { CommonModule } from '@angular/common';
// import { UpdateStatusComponent } from './update-status/update-status.component';
// import { ActivityComponent } from '../control/activity/activity.component';
// import { ExcelService } from '../excel.service';
// import { LoaderComponent } from '../loader/loader.component';
// import { ActivityModalComponent } from '../control/activity-modal/activity-modal.component';
// import { DraganddropDirective } from '../DirectiveDragAndDrop/draganddrop.directive';
// import { ProgressComponent } from '../progress/progress.component';
// import { SingleprogressComponent } from '../singleprogress/singleprogress.component';
// import { EditComponent } from '../candidate-details/edit/edit.component';
// import { EmailComponent } from '../candidate-details/email/email.component';
// import { ResumenotificationComponent } from '../resumenotification/resumenotification.component';
// import { FullscreenDirective } from '../resumenotification/fullscreen.directive';
// import { FullscreenService } from '../resumenotification/fullscreen.service';
import { MatToolbarModule } from '@angular/material/toolbar';
// import { TreemapserviceService } from '../charts/bubblechart/treemapservice.service';
// import { BubblechartService } from '../charts/bubblechart/bubblechart.service';
// import { BargraphComponent } from '../charts/bargraph/bargraph.component';
// import { CircularProgressComponent } from '../charts/circular-progress/circular-progress.component';
// import { PieChartComponent } from '../pie-chart/pie-chart.component';
// import { BarChartComponent } from '../charts/bar-chart/bar-chart.component';
import { GridinternaldataComponent } from './gridinternaldata/gridinternaldata.component';
import { PrgridComponent } from './prgrid/prgrid.component';
// import { UpdateCandidateComponent } from './update-candidate/update-candidate.component';
import { NoDataFoundComponent } from './no-data-found/no-data-found.component';
// import { Safe } from '../shared/pipes/safe.pipe';
// import { SearchPipe } from '../shared/pipes/search.pipe';
// import { BubblechartComponent } from '../charts/bubblechart/bubblechart.component';



@NgModule({

  imports: [FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatInputModule,
    RouterModule,
    MatRadioModule,
    // OwlDateTimeModule,
    MatTabsModule,
    CommonModule,
    MatMenuModule,
    MatToolbarModule,
    MatTabsModule


  ],
  declarations: [
    // ActivityComponent,
    // ActivityModalComponent,
    // PvGetReferenceComponent,
    AddNoteComponent,
    // UpdateStatusComponent,
    // GridComponent,
    // ScroolToTopButtomComponent,
    // LoaderComponent,
    // DraganddropDirective,
    // ProgressComponent,
    // SingleprogressComponent,
    // EmailComponent,
    // ResumenotificationComponent,
    // FullscreenDirective,
    // ResumenotificationComponent,
    // BargraphComponent,
    // CircularProgressComponent,
    // PieChartComponent,
    // BarChartComponent,
    // SearchPipe,
    // Safe,
    AddCandidateComponent,
    GridinternaldataComponent,
    PrgridComponent,
    NoDataFoundComponent,
    // UpdateCandidateComponent,
    AddToJobComponent,
    CallComponent,
    // BubblechartComponent

  ],
  exports: [
    // ActivityComponent,
    // ActivityModalComponent,
    // GridComponent,
    AddNoteComponent,
    // PvGetReferenceComponent,
    // UpdateStatusComponent,
    // ScroolToTopButtomComponent,
    // LoaderComponent,
    RouterModule,
    // ProgressComponent,
    // SingleprogressComponent,
    // PieChartComponent,
    // EmailComponent,
    // ResumenotificationComponent,
    // FullscreenDirective,
    // ResumenotificationComponent,
    // BargraphComponent,
    // BarChartComponent,
    // CircularProgressComponent,
    // SearchPipe, 
    // Safe,
    AddCandidateComponent,
    GridinternaldataComponent,
    PrgridComponent,
    NoDataFoundComponent,
    // UpdateCandidateComponent,
    AddToJobComponent,
    CallComponent,
    // BubblechartComponent

  ],
  providers: [
    // ExcelService, 
    // FullscreenService, 
    // TreemapserviceService,
    //  BubblechartService
  ],

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],

})
export class ComponentsModule { }
