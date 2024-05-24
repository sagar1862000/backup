import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobCandidateComponent } from './job-candidate.component';

const routes: Routes = [
  {
    path:'', component:JobCandidateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobCandidateRoutingModule { }
