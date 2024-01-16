import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateCallViewComponent } from './candidate-call-view.component';

const routes: Routes = [
  {
    path:'', component:CandidateCallViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateCallViewRoutingModule { }
