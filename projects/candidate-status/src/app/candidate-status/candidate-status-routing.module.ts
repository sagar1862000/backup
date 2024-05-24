import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateStatusComponent } from './candidate-status.component';
import { AddCandidateComponent } from './add-candidate/add-candidate.component';
import { BuildStatusRelationComponent } from './build-status-relation/build-status-relation.component';

const routes: Routes = [
  {
    path: '',
    component: CandidateStatusComponent,
    children: [
      { path: 'add-candidate', component: AddCandidateComponent },
      {path:'build-status-relation', component:BuildStatusRelationComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateStatusRoutingModule { }
