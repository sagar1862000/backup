import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallDetailReportComponent } from './call-detail-report.component';

const routes: Routes = [{
  path:'', component:CallDetailReportComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CallDetailReportRoutingModule { }
