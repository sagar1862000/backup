import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewTrackerComponent } from './add-new-tracker.component';

const routes: Routes = [
  {path:'', component:AddNewTrackerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddNewTrackerRoutingModule { }
